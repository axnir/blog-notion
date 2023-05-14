import Nav from './components/Nav';
import Footer from './components/Footer';
import SITE_CONFIG from '@/site.config';

import './globals.css';

export const metadata = {
  title: SITE_CONFIG.subTitle.home,
  authors: SITE_CONFIG.author,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hans-CN">
      <body>
        <main className="min-h-screen">
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
