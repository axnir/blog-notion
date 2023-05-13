import { getPostContent, getPostInfo } from '@/app/common/service/notion';
import CodeBlock from '@/app/components/notion/CodeBlock';
import HeadingsBlock from '@/app/components/notion/HeadingsBlock';
import ImageBlock from '@/app/components/notion/ImageBlock';
import ParagraphBlock from '@/app/components/notion/ParagraphBlock';
import QuoteBlock from '@/app/components/notion/QuoteBlock';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const revalidate = 3600;

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const { title: titleInfo } = (await getPostInfo(params.slug)) ?? {};
  const content = (await getPostContent(params.slug).catch(
    () => []
  )) as BlockObjectResponse[];

  // TODOempty
  if (!content.length) {
    return '内容为空';
  }

  return (
    <article className="h-auto w-[1000px] mx-auto">
      <h1 className="font-extrabold text-3xl my-6">{titleInfo.text}</h1>
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
              return <HeadingsBlock key={block.id} {...block} />;
            case 'heading_2':
              return <HeadingsBlock key={block.id} {...block} />;
            case 'heading_3':
              return <HeadingsBlock key={block.id} {...block} />;
            case 'quote':
              return <QuoteBlock key={block.id} {...block.quote} />;
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}
