export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="items-right relative mr-9 flex h-11 w-11 justify-center rounded-md pr-14 text-black shadow-md transition-colors dark:text-white">
      <span className=" font-redaction text-5xl">cart</span>

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
