import SITE_CONFIG from '@/site.config';

export const metadata = {
  title: SITE_CONFIG.subTitle.about,
};

export default async function About() {
  return (
    <div className="h-[50vh] mt-[80px] flex flex-col items-center justify-center">
      <h1 className="mt-10 text-3xl font-bold">页面施工中!</h1>
    </div>
  );
}
