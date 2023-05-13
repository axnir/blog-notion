import RichText from './RichText';
import type {
  QuoteBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

export default function QuoteBlock(props: QuoteBlockObjectResponse['quote']) {
  const { rich_text } = props;

  return (
    <blockquote className="my-4 pl-2 border-solid border-l-4 border-[#D3D3D3] text-[#646464]">
      {(rich_text as TextRichTextItemResponse[]).map((text, idx) => (
        <RichText key={idx} {...text} />
      ))}
    </blockquote>
  );
}
