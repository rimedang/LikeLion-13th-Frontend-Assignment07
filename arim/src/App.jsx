import NewsHome from './Components/NewsHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1> 뉴스 검색 웹 페이지</h1>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <NewsHome />
      </main>
    </div>
  );
}

export default App;
