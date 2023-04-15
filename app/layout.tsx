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
    <html lang="en">
      <body>
        <main>
          <Nav className="flex justify-center" />
          {children}
        </main>
      </body>
    </html>
  );
}
