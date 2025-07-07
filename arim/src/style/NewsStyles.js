// src/styles/NewsStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #222;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 20px auto;
  text-align: center;
`;

export const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ArticleItem = styled.li`
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const ArticleMeta = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const ArticleTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
  color: #222;
`;

export const ArticleDesc = styled.div`
  font-size: 15px;
  color: #444;
  margin-bottom: 10px;
`;

export const ArticleLink = styled.a`
  font-size: 14px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
