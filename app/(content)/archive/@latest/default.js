import NewsList from '@/components/NewsList';
import { getLatestNews } from '@/lib/news';
import React from 'react';

const LatestNewsPage = async () => {
  const res = await fetch('https://next-news-gray-iota.vercel.app/api/news');

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
