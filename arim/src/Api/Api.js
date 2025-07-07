import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNewsByKeyword = async (keyword) => {
  if (!keyword) {
    return { articles: [] };
  }

  const url = `${BASE_URL}/everything`;
  const date = new Date();

  date.setMonth(date.getMonth() - 1);
  const fromDate = date.toISOString().split('T')[0];

  const response = await axios.get(url, {
    params: {
      q: keyword,
      from: fromDate,
      sortBy: 'popularity',
      apiKey: API_KEY,
    },
  });

  return response.data;
};
