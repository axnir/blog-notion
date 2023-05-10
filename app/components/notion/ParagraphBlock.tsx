import RichText from './RichText';
import type {
  ParagraphBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

export default function ParagraphBlock(
  props: ParagraphBlockObjectResponse['paragraph']
) {
  const { rich_text } = props;

  return (
    <>
      {(rich_text as TextRichTextItemResponse[]).map((text, idx) => (
        <RichText key={idx} {...text} />
      ))}
    </>
  );
}
