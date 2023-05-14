import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import Tag from '../components/notion/Tag';
import { getPostList } from '../common/service/notion';
import SITE_CONFIG from '@/site.config';

export const metadata = {
  title: SITE_CONFIG.subTitle.post,
};

export default async function Post() {
  const posts = await getPostList();

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <article className="w-[650px] rounded-lg bg-slate-100 p-4 mb-3">
            {post.cover.url ? (
              <Image
                className="h-[60%] w-full rounded-lg"
                src={post.cover.url}
                height={post.cover.height}
                width={post.cover.width}
                alt="picture of the post"
              />
            ) : null}
            <div className="flex justify-between  mb-2 ">
              <h2 className="font-medium text-black dark:text-gray-100">
                {post.title.text}
              </h2>
              <time className="text-gray-600 dark:text-gray-400">
                {dayjs(post.createTime).format('YYYY/MM/DD')}
              </time>
            </div>
            <span className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
              {post.description}
            </span>
            <span>
              {post.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </span>
          </article>
        </Link>
      ))}
    </div>
  );
}
