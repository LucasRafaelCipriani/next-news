import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Image, ImageKitProvider } from '@imagekit/next';

import { API_URL } from '@/constants';

const NewsDetailsPage = async ({ params }) => {
  const { id: slug } = await params;
  const res = await fetch(`${API_URL}api/news/${slug}`);

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
            <ImageKitProvider urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}>
              <Image
                src={`/images/${newsItem.image}`}
                alt={newsItem.title}
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </ImageKitProvider>
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
