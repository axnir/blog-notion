import type {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

type HeadingProps =
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse;

export default function HeadingsBlock(props: HeadingProps) {
  const { type } = props;
  const text = { current: '' };

  if (type === 'heading_1') {
    text.current = props.heading_1.rich_text
      .map((text) => text.plain_text)
      .join('');
  } else if (type === 'heading_2') {
    text.current = props.heading_2.rich_text
      .map((text) => text.plain_text)
      .join('');
  } else if (type === 'heading_3') {
    text.current = props.heading_3.rich_text
      .map((text) => text.plain_text)
      .join('');
  }

  if (type === 'heading_1') {
    return <h1 className="font-bold text-xl my-2">{text.current}</h1>;
  }

  if (type === 'heading_2') {
    return <h2 className="font-semibold text-lg my-2">{text.current}</h2>;
  }

  if (type === 'heading_3') {
    return <h3 className="font-medium text-base my-2">{text.current}</h3>;
  }

  return null;
}
