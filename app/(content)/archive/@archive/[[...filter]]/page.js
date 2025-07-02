import Link from 'next/link';
import { Suspense } from 'react';

import NewsList from '@/components/NewsList';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import { API_URL } from '@/constants';

const FilterHeader = async ({ allNews, year, month }) => {
  let links = getAvailableNewsYears(allNews);

  if (year && !month) {
    links = getAvailableNewsMonths(allNews, year);
  }

  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href =
              year && !month
                ? `/archive/${year}/${link.index}`
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
  );
};

const FilteredNews = ({ allNews, year, month }) => {
  let news;

  if (year && !month) {
    news = getNewsForYear(allNews, year);
  } else if (year && month) {
    news = getNewsForYearAndMonth(allNews, year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList newsList={news} />;
  }

  return newsContent;
};

const FilteredNewsPage = async ({ params }) => {
  const filter = await params.filter;
  const res = await fetch(`${API_URL}api/news`);

  if (!res.ok) {
    throw new Error('Failed to fetch news.');
  }

  const allNews = await res.json();
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

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
      <Suspense
        fallback={
          <div id="loading">
            <p>Loading filter...</p>
          </div>
        }
      >
        <FilterHeader
          year={selectedYear}
          month={selectedMonth}
          allNews={allNews}
        />
      </Suspense>
      <Suspense
        fallback={
          <div id="loading">
            <p>Loading news...</p>
          </div>
        }
      >
        <FilteredNews
          year={selectedYear}
          month={selectedMonth}
          allNews={allNews}
        />
      </Suspense>
    </>
  );
};

export default FilteredNewsPage;
