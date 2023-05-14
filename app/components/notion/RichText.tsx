import clsx from 'clsx';
import type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export default function RichText({
  isNewLine = false,
  href,
  text,
  annotations,
}: TextRichTextItemResponse & { isNewLine?: boolean }) {
  const classes = clsx({
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
        target="_blank"
        className={clsx(
          {
            block: isNewLine,
          },
          'text-[#175199]',
          classes
        )}
        // TODO bg color
        style={annotations.color ? { color: annotations.color } : {}}
      >
        {text.content}
      </a>
    );
  }

  return (
    <span
      className={clsx(
        {
          block: isNewLine,
        },
        classes
      )}
    >
      {text.content}
    </span>
  );
}
