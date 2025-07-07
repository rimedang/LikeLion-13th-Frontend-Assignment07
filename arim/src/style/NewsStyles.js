// src/styles/NewsStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 8px;
  width: 200px;
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

export const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ArticleItem = styled.li`
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafbfc;
`;

export const ArticleMeta = styled.div`
  font-size: 14px;
  color: #888;
`;

export const ArticleTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin: 8px 0;
`;

export const ArticleDesc = styled.div`
  margin-bottom: 8px;
`;

export const ArticleLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
