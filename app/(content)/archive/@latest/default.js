import NewsList from '@/components/NewsList';
import { API_URL } from '@/constants';
import { getLatestNews } from '@/lib/news';

const LatestNewsPage = async () => {
  const res = await fetch(`${API_URL}api/news`);

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
