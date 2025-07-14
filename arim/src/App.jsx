import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteFinder from './Components/MapFind'; // 길찾기 페이지
import MapFind from './Components/MapFind';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header style={{ textAlign: 'center', padding: '20px' }}>
          <h1>산책 경로</h1>
        </header>

        <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<MapFind />} />
            <Route path="/route" element={<MapFind />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
