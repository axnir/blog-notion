import dayjs from 'dayjs';
import CodeBlock from '@/app/components/notion/CodeBlock';
import HeadingsBlock from '@/app/components/notion/HeadingsBlock';
import ImageBlock from '@/app/components/notion/ImageBlock';
import ParagraphBlock from '@/app/components/notion/ParagraphBlock';
import QuoteBlock from '@/app/components/notion/QuoteBlock';
import ListItemBlock from '@/app/components/notion/ListItemBlock';
import { getPostContent, getPostInfo } from '@/app/common/service/notion';
import {
  getNumberedListItemIdMap,
  getNumberedListItemNumber,
} from '@/app/common/utils/notion';

import type { Metadata } from 'next';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postInfo = await getPostInfo(params.slug);
  return { title: postInfo.title.text };
}

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const { title: titleInfo, createTime: publishTime } =
    (await getPostInfo(params.slug)) ?? {};
  const content = (await getPostContent(params.slug).catch(
    () => []
  )) as BlockObjectResponse[];

  const numberedListItemIdMap = getNumberedListItemIdMap(content);

  // TODOempty
  if (!content.length) {
    return '内容为空';
  }

  return (
    <article className="h-auto w-[1000px] mx-auto mb-6">
      <h1 className="font-extrabold text-3xl my-6">{titleInfo.text}</h1>
      <p className="mx-0 my-2">{dayjs(publishTime).format('YYYY/MM/DD')}</p>
      <div>
        {content.map((block) => {
          switch (block.type) {
            case 'code':
              /* @ts-expect-error Server Component */
              return <CodeBlock key={block.id} {...block.code} />;
            case 'paragraph':
              return <ParagraphBlock key={block.id} {...block.paragraph} />;
            case 'image':
              /* @ts-expect-error Server Component */
              return <ImageBlock key={block.id} {...block.image} />;
            case 'heading_1':
            case 'heading_2':
            case 'heading_3':
              return <HeadingsBlock key={block.id} {...block} />;
            case 'quote':
              return <QuoteBlock key={block.id} {...block.quote} />;
            case 'bulleted_list_item':
            case 'numbered_list_item':
              return (
                <ListItemBlock
                  key={block.id}
                  start={getNumberedListItemNumber(
                    numberedListItemIdMap,
                    block.id
                  )}
                  {...block}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}
