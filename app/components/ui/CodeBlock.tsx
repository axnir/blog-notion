import { getHighlighter, Lang, renderToHtml } from 'shiki';
import type {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import SITE_CONFIG from '@/site.config';

const lightTheme = SITE_CONFIG.codeTheme.light;
const darkTheme = SITE_CONFIG.codeTheme.dark;

export default async function CodeBlock(
  props: CodeBlockObjectResponse['code']
) {
  const { rich_text, language } = props;

  const highlighter = await getHighlighter({
    themes: [lightTheme, darkTheme],
    langs: [language as Lang],
  });

  const code = (rich_text as TextRichTextItemResponse[])
    .map((i) => i.plain_text)
    .join('');

  const tokens = highlighter.codeToThemedTokens(code, language);
  const renderToHTML = (theme: 'light' | 'dark'): string => {
    const themeName = theme === 'light' ? lightTheme : darkTheme;
    const html = renderToHtml(tokens, {
      fg: highlighter.getForegroundColor(themeName),
      bg: theme === 'light' ? '#f6f8fa' : '#0d1117',
      themeName,
      elements: {
        pre({ style, children }) {
          return `<pre class="rounded-md mb-6 p-3 text-sm" style="tab-size: 2; ${style}">${children}</pre>`;
        },
        code({ children }) {
          return `<code>${children}</code>`;
        },
      },
    });
    return html;
  };

  // TODOsupport dark mode
  const lightHtml = renderToHTML('light');
  // const darkHtml = renderToHTML('dark');

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: lightHtml,
      }}
    ></div>
  );
}
