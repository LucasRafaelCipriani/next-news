import NewsList from '@/components/NewsList';
import { getLatestNews } from '@/lib/news';
import React from 'react';

const LatestNewsPage = async () => {
  const res = await fetch('http://localhost:3000/api/news');

  if (!res.ok) {
    throw new Error('Failed to fetch news.');
  }

  const allNews = await res.json();
  const news = getLatestNews(allNews);

  return (
    <>
      <h2>Latest News</h2>
      <NewsList newsList={news} />
    </>
  );
};

export default LatestNewsPage;
