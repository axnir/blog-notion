import SITE_CONFIG from '@/site.config';

export const metadata = {
  title: SITE_CONFIG.subTitle.about,
};

export default async function About() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">页面施工中!</h1>
    </div>
  );
}
