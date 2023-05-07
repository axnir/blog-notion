import { getPostContent } from '@/app/common/service/notion';
import CodeBlock from '@/app/components/ui/CodeBlock';
import ImageBlock from '@/app/components/ui/ImageBlock';
import ParagraphBlock from '@/app/components/ui/ParagraphBlock';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const content = (await getPostContent(params.slug).catch(
    () => []
  )) as BlockObjectResponse[];

  // TODOempty
  if (!content.length) {
    return '内容为空';
  }

  return (
    <article className="h-auto flex justify-center">
      <div className="w-[1000px] p-6">
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
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}
