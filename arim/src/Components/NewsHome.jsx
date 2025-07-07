// src/pages/NewsHome.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsByKeyword } from '../Api/Api.js';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  Container,
  Title,
  SearchWrapper,
  Input,
  Button,
  ErrorMessage,
  ArticleList,
  ArticleItem,
  ArticleMeta,
  ArticleTitle,
  ArticleDesc,
  ArticleLink,
} from '../style/NewsStyles'; // 스타일 파일 import

const NewsHome = () => {
  const [keyword, setKeyword] = useState('');

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ['news', keyword],
    queryFn: () => fetchNewsByKeyword(keyword),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
  });

  const handleInputChange = (e) => setKeyword(e.target.value);
  const handleSearch = () => refetch();

  return (
    <Container>
      <Title>인기 뉴스 검색</Title>
      <SearchWrapper>
        <Input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <Button onClick={handleSearch}>검색</Button>
        {(isLoading || isFetching) && (
          <span>
            <ClipLoader
              color="#007bff"
              loading={true}
              size={20}
              speedMultiplier={1.2}
              cssOverride={{ marginLeft: '10px' }}
            />
          </span>
        )}
      </SearchWrapper>

      {isError && (
        <ErrorMessage>
          {error.response?.status === 429
            ? '토큰 제한 수가 넘어갔습니다.'
            : `에러 발생: ${error.message}`}
        </ErrorMessage>
      )}

      {data && data.articles && data.articles.length > 0 ? (
        <ArticleList>
          {data.articles.map((article, idx) => (
            <ArticleItem key={idx}>
              <ArticleMeta>
                {article.source.name} | {article.author || '작성자 없음'}
              </ArticleMeta>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleDesc>{article.description}</ArticleDesc>
              <ArticleLink
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                기사 전체 보기
              </ArticleLink>
            </ArticleItem>
          ))}
        </ArticleList>
      ) : (
        !isLoading &&
        !isError && <div style={{ color: '#555' }}>검색 결과가 없습니다.</div>
      )}
    </Container>
  );
};

export default NewsHome;
