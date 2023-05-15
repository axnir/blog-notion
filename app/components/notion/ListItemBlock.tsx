import RichText from './RichText';
import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

type ListItemBlockType =
  | BulletedListItemBlockObjectResponse
  | NumberedListItemBlockObjectResponse;

export default function ListItemBlock(
  props: ListItemBlockType & { start?: number }
) {
  const { type, start } = props;
  const isBulleted = type === 'bulleted_list_item';
  const richText = isBulleted
    ? props.bulleted_list_item.rich_text
    : props.numbered_list_item.rich_text;

  const renderLiElement = (): JSX.Element => (
    <li className="my-2 ml-4">
      {(richText as TextRichTextItemResponse[]).map((txt, idx) => (
        <RichText key={idx} isNewLine={richText.length === 1} {...txt} />
      ))}
    </li>
  );

  if (isBulleted) {
    return <ul className="list-disc">{renderLiElement()}</ul>;
  }

  return (
    <ol start={start} className="list-decimal">
      {renderLiElement()}
    </ol>
  );
}
