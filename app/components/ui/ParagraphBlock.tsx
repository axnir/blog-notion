import clsx from 'clsx';
import type {
  ParagraphBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

const ParagraphBlockItem = ({
  href,
  text,
  annotations,
}: TextRichTextItemResponse) => {
  const className = clsx({
    'line-through': annotations.strikethrough,
    'font-bold': annotations.bold,
    italic: annotations.italic,
    underline: annotations.underline,
  });

  if (annotations.code) {
    return (
      <code className="bg-[rgba(175,184,193,0.2)] text-[85%] px-1.5 py-0.5 rounded-md">
        {text.content}
      </code>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        // TODO bg color
        style={annotations.color ? { color: annotations.color } : {}}
      >
        {text.content}
      </a>
    );
  }

  return <span>{text.content}</span>;
};

export default function ParagraphBlock(
  props: ParagraphBlockObjectResponse['paragraph']
) {
  const { rich_text } = props;

  return (
    <>
      {(rich_text as TextRichTextItemResponse[]).map((text, idx) => (
        <ParagraphBlockItem key={idx} {...text} />
      ))}
    </>
  );
}
