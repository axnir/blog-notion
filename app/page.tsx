import { getPostList } from '@/app/common/service/notion';

export default async function Home() {
  // const posts = await getPostList();

  return (
    <main className="h-screen flex flex-col items-center">
      <h1 className="mt-10 text-3xl font-bold underline">Hello world!</h1>
    </main>
  );
}
