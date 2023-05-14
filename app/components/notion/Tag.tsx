export default function Tag({ name }: { name: string }) {
  return (
    <span className="bg-[rgba(175,184,193,0.2)] text-[#0009] text-[85%] px-1.5 py-0.5 rounded-md mr-2">
      {name}
    </span>
  );
}
