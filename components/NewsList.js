import { Image, ImageKitProvider } from '@imagekit/next';
import Link from 'next/link';

const NewsList = ({ newsList }) => {
  return (
    <ul className="news-list">
      {newsList.map((news) => (
        <li key={news.id}>
          <Link href={`/news/${news.slug}`}>
            <ImageKitProvider urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}>
              <Image
                src={`/images/${news.image}`}
                alt={news.title}
                width={300}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </ImageKitProvider>
            <span>{news.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
