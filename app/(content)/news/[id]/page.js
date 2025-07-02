import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const NewsDetailsPage = async ({ params }) => {
  const { id: slug } = await params;
  const res = await fetch(
    `https://next-news-gray-iota.vercel.app/api/news/${slug}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch news.');
  }

  const newsItem = await res.json();

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <div className="img-container">
          <Link href={`/news/${newsItem.slug}/image`}>
            <Image
              src={`/images/news/${newsItem.image}`}
              alt={newsItem.title}
              width={500}
              height={500}
            />
          </Link>
        </div>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailsPage;
