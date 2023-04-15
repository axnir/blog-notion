'use client';

import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Link from 'next/link';
import type { PostListItem } from '../common/types/notion';

type PostListProps = {
  posts: PostListItem[];
};

function PostItem({
  titleInfo,
  description,
  createTime,
  tags,
  cover,
  id,
}: PostListItem) {
  console.log('cover', cover);
  const href = `/post/${id}`;

  return (
    <motion.article whileHover={{ scale: 1.05 }}>
      <Link href={href} className="h-full w-full">
        <h2>{titleInfo?.text}</h2>
        <span>{dayjs(createTime).format('YYYY/MM/DD')}</span>
        <span>{description}</span>
        <span>{tags.join(' ')}</span>
      </Link>
    </motion.article>
  );
}

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </>
  );
}
