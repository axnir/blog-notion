import { getPostList } from '../common/service/notion';
import PostList from '../components/PostList';

export default async function Post() {
  const posts = await getPostList().catch((error) => {
    console.log('error', error);

    return [];
  });

  return (
    <div className="flex flex-col items-center">
      <PostList posts={posts} />
    </div>
  );
}
