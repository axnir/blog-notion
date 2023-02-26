import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <div>
        <Image
          src="/vercel.svg"
          alt="Vercels Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <h1 className="mt-10 text-3xl font-bold underline">Hello world!</h1>
    </main>
  );
}
