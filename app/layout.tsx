import Nav from './components/Nav';
import './globals.css';

export const metadata = {
  title: "Axnir's Blog",
  description: "Axnir's Blog Site",
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
        </main>
      </body>
    </html>
  );
}
