import ModalBackdrop from '@/components/ModalBackdrop';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const InterceptedImagePage = async ({ params }) => {
  const { id: slug } = await params;
  const res = await fetch(`http://localhost:3000/api/news/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch news.');
  }

  const newsItem = await res.json();

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
            width={500}
            height={500}
          />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;
