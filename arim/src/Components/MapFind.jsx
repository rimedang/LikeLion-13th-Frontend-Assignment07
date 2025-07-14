import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useQuery, useMutation, useIsFetching } from '@tanstack/react-query';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1rem;

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 5px;
  }

  button {
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Note = styled.p`
  font-size: 14px;
  color: #666;

  a {
    margin-left: 8px;
    font-size: 12px;
    color: #007bff;
    text-decoration: underline;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;
`;

const Spinner = styled.div`
  margin: 20px auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RouteDetails = styled.div`
  margin-top: 1rem;
  padding: 10px;
  background: #f6f6f6;
  border-radius: 5px;

  h4 {
    margin-bottom: 10px;
    color: #222;
  }

  ul {
    padding-left: 20px;
  }
`;

const MapFind = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [routeData, setRouteData] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [126.978, 37.566],
      zoom: 11,
    });

    return () => map.current?.remove();
  }, []);

  const getCoordinates = async (place) => {
    const match = place
      .trim()
      .match(/^([-+]?\d{1,3}\.\d+)\s*,\s*([-+]?\d{1,3}\.\d+)$/);
    if (match) return { lng: parseFloat(match[2]), lat: parseFloat(match[1]) };

    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        place
      )}.json`,
      {
        params: {
          access_token: mapboxgl.accessToken,
          limit: 1,
          language: 'ko',
        },
      }
    );

    const feature = res.data.features[0];
    if (!feature) throw new Error(`"${place}"에 대한 위치를 찾을 수 없습니다.`);
    const [lng, lat] = feature.center;
    return { lng, lat };
  };

  const {
    data: startCoord,
    isLoading: isStartLoading,
    isError: isStartError,
  } = useQuery({
    queryKey: ['start-coord', start],
    queryFn: () => getCoordinates(start),
    enabled: !!start,
  });

  const {
    data: endCoord,
    isLoading: isEndLoading,
    isError: isEndError,
  } = useQuery({
    queryKey: ['end-coord', end],
    queryFn: () => getCoordinates(end),
    enabled: !!end,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!startCoord || !endCoord) {
        throw new Error('좌표 정보를 불러오지 못했습니다.');
      }

      const coords = `${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}`;
      const res = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            steps: true,
            geometries: 'geojson',
          },
        }
      );

      const route = res.data.routes[0];
      setRouteData(route);

      // route를 먼저 선언한 뒤 geojson을 생성합니다.
      const geojson = {
        type: 'Feature',
        geometry: route.geometry,
      };

      if (map.current.getSource('route')) {
        map.current.getSource('route').setData(geojson);
      } else {
        map.current.addSource('route', {
          type: 'geojson',
          data: geojson,
        });

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#007bff', 'line-width': 5 },
        });
      }
    },
    onError: (error) => {
      console.error('경로 오류:', error);
      alert(error.message || '경로를 찾는 중 오류 발생');
    },
  });

  const isFetching = useIsFetching();

  const handleFindRoute = () => {
    if (!start || !end) {
      alert('출발지와 도착지를 모두 입력하세요.');
      return;
    }
    if (!startCoord || !endCoord) {
      alert('좌표 정보를 불러오는 중입니다. 기다려 주세요.');
      return;
    }
    mutate();
  };

  return (
    <Wrapper>
      <Title>좌표로 길찾기</Title>
      <InputGroup>
        <input
          type="text"
          placeholder="출발지 (예: 37.533782, 126.734592)"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="도착지 (예: 37.537625, 126.742895)"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={handleFindRoute}>길찾기</button>
      </InputGroup>

      <Note>
        * 구글지도에서 원하는 위치 우클릭 후 "이 위치 공유"를 클릭하면 좌표 확인
        가능
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
        >
          [구글지도 열기]
        </a>
      </Note>

      {(isPending || isStartLoading || isEndLoading || isFetching > 0) && (
        <Spinner />
      )}

      <MapContainer ref={mapContainer} />

      {routeData && (
        <RouteDetails>
          <h4>예상 시간: {(routeData.duration / 60).toFixed(1)}분</h4>
          <ul>
            {routeData.legs[0].steps.map((step, idx) => (
              <li key={idx}>{step.maneuver.instruction}</li>
            ))}
          </ul>
        </RouteDetails>
      )}
    </Wrapper>
  );
};

export default MapFind;
