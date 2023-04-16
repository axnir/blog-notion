import LoadingComponent from '../components/Loading';

export default async function Loading() {
  return (
    <div className="h-[calc(80vh-80px)] flex flex-col items-center justify-center">
      <h2 className="font-mono text-lg">加载中...</h2>
      <LoadingComponent className="h-60 w-60" />
    </div>
  );
}
