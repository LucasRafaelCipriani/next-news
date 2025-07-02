import NewsList from '@/components/NewsList';
import { API_URL } from '@/constants';
import { getLatestNews } from '@/lib/news';

const NewsListingPage = async () => {
  const res = await fetch(`${API_URL}api/news`);

  if (!res.ok) {
    throw new Error('Failed to fetch news.');
  }

  const allNews = await res.json();

  const news = getLatestNews(allNews, 9);

  return (
    <>
      <h1>News Listing Page</h1>
      <NewsList newsList={news} />
    </>
  );
};

export default NewsListingPage;
