import { getPostList } from '../common/service/notion';
import PostList from '../components/PostList';

export default async function Page() {
  const posts = await getPostList().catch(() => []);

  console.log('posts', posts);

  return (
    <main className="h-screen flex flex-col items-center">
      <PostList posts={posts} />
    </main>
  );
}
