'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import type { PostListItem } from '../common/types/notion';
import classNames from 'classnames';

type PostListProps = {
  posts: PostListItem[];
};

function PostItem({
  title,
  description,
  createTime,
  tags,
  cover,
  id,
  className,
}: PostListItem & { className?: string }) {
  const href = `/post/${id}`;

  return (
    <Link href={href}>
      <article
        className={classNames(
          'w-[650px] rounded-lg bg-slate-100 p-4',
          className
        )}
      >
        {cover.url ? (
          <Image
            className="h-[60%] w-full rounded-lg"
            src={cover.url}
            height={cover.height}
            width={cover.width}
            alt="picture of the post"
          />
        ) : null}
        <div className="flex justify-between  mb-2 ">
          <h2 className="font-medium text-black dark:text-gray-100">
            {title.text}
          </h2>
          <time className="text-gray-600 dark:text-gray-400">
            {dayjs(createTime).format('YYYY/MM/DD')}
          </time>
        </div>
        <span className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
          {description}
        </span>
        <span className="">{tags.join(' ')}</span>
      </article>
    </Link>
  );
}

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} className="mb-3" {...post} />
      ))}
    </>
  );
}
