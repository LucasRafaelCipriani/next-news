export function getLatestNews(allNews, number = 3) {
  return allNews.slice(0, number);
}

export function getAvailableNewsYears(allNews) {
  return allNews
    .reduce((years, news) => {
      const year = new Date(news.date).getFullYear();
      if (!years.find((yr) => yr.index === year)) {
        years.push({
          index: year,
          label: year,
        });
      }
      return years;
    }, [])
    .sort((a, b) => b.index - a.index);
}

export function getAvailableNewsMonths(allNews, year) {
  return allNews
    .reduce((months, news) => {
      const newsYear = new Date(news.date).getFullYear();
      if (newsYear === +year) {
        const month = new Date(news.date).getMonth();
        if (!months.find((mt) => mt.index === month)) {
          months.push({
            index: month + 1,
            label: new Date(news.date).toLocaleDateString('en', {
              month: 'long',
            }),
          });
        }
      }
      return months;
    }, [])
    .sort((a, b) => b.index - a.index);
}

export function getNewsForYear(allNews, year) {
  return allNews.filter((news) => new Date(news.date).getFullYear() === +year);
}

export function getNewsForYearAndMonth(allNews, year, month) {
  return allNews.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}
