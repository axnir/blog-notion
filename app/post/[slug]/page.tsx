import { getPostContent } from '@/app/common/service/notion';
import Image from 'next/image';

export default async function Page({ params }: { params: { slug: string } }) {
  const content = await getPostContent(params.slug).catch(() => ({}));

  console.log('content', content);

  if (!Object.keys(content).length) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <div>
        <Image
          src="/vercel.svg"
          alt="Vercels Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </div>
  );
}
