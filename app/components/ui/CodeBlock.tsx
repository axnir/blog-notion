import { getHighlighter, Lang, renderToHtml } from 'shiki';
import * as path from 'path';
import type {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import SITE_CONFIG from '@/site.config';

const lightTheme = SITE_CONFIG.codeTheme.light;
const darkTheme = SITE_CONFIG.codeTheme.dark;

const getShikiResourcesPath = (): string => {
  return path.join(process.cwd(), 'lib/shiki');
};

export default async function CodeBlock(
  props: CodeBlockObjectResponse['code']
) {
  const { rich_text, language } = props;
  const lang = language === 'plain text' ? '' : language;

  const shikiResourcesPath = getShikiResourcesPath();
  const highlighter = await getHighlighter({
    themes: [lightTheme, darkTheme],
    langs: [lang as Lang],
    paths: {
      languages:
        process.env.NODE_ENV === 'development'
          ? undefined
          : `${shikiResourcesPath}/languages/`,
      themes:
        process.env.NODE_ENV === 'development'
          ? undefined
          : `${shikiResourcesPath}/themes/`,
    },
  });

  const code = (rich_text as TextRichTextItemResponse[])
    .map((i) => i.plain_text)
    .join('');

  const lightTokens = highlighter.codeToThemedTokens(code, lang, lightTheme);
  const darkTokens = highlighter.codeToThemedTokens(code, lang, darkTheme);
  const renderToHTML = (theme: 'light' | 'dark'): string => {
    const themeName = theme === 'light' ? lightTheme : darkTheme;
    const html = renderToHtml(theme === 'light' ? lightTokens : darkTokens, {
      fg: highlighter.getForegroundColor(themeName),
      bg: theme === 'light' ? '#f6f8fa' : '#0d1117',
      themeName,
      elements: {
        pre({ style, children }) {
          return `<pre class="rounded-md my-4 p-6 text-sm" style="tab-size: 2; ${style}">${children}</pre>`;
        },
        code({ children }) {
          return `<code>${children}</code>`;
        },
        line({ className, children }) {
          return `<span class="${className}">${children}</span>`;
        },
        token({ style, children }) {
          return `<span style="${style}">${children}</span>`;
        },
      },
    });
    return html;
  };

  const lightHtml = renderToHTML('light');
  const darkHtml = renderToHTML('dark');

  return (
    <>
      <div
        className="dark:hidden"
        dangerouslySetInnerHTML={{
          __html: lightHtml,
        }}
      ></div>
      <div
        className="hidden dark:block"
        dangerouslySetInnerHTML={{
          __html: darkHtml,
        }}
      ></div>
    </>
  );
}
