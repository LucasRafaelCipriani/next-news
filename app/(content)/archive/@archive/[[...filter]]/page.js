import Link from 'next/link';

import NewsList from '@/components/NewsList';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import { API_URL } from '@/constants';

const FilteredNewsPage = async ({ params }) => {
  const filter = await params.filter;
  // const res = await fetch(`${API_URL}api/news`);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch news.');
  // }

  // const allNews = await res.json();
  const allNews = [];

  let links = getAvailableNewsYears(allNews);
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(allNews, selectedYear);
    links = getAvailableNewsMonths(allNews, selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(allNews, selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList newsList={news} />;
  }

  if (
    (selectedYear &&
      !getAvailableNewsYears(allNews).find(
        (year) => year.index === +selectedYear
      )) ||
    (selectedMonth &&
      !getAvailableNewsMonths(allNews, selectedYear).find(
        (month) => month.index === +selectedMonth
      ))
  ) {
    throw new Error('Invalid filter. Please try using a valid one.');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href =
                selectedYear && !selectedMonth
                  ? `/archive/${selectedYear}/${link.index}`
                  : `/archive/${link.index}`;

              return (
                <li key={link.index}>
                  <Link href={href}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
};

export default FilteredNewsPage;
