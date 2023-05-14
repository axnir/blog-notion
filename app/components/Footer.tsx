export default function Footer() {
  return (
    <footer className="h-[100px] mx-40 flex items-center justify-between text-violet12 font-regular">
      <div>
        Copyright © 2023 - PRESENT{' '}
        <a href="/" className="text-[#175199]">
          Axnir's Site
        </a>
      </div>
      <div>
        Powered by{' '}
        <a href="https://nextjs.org" className="text-[#175199]">
          Next.js
        </a>
      </div>
    </footer>
  );
}
