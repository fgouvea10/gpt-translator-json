import Link from "next/link";

export function Header() {
  return (
    <header className="w-full relative">
      <div className="flex w-full max-w-7xl my-0 mx-auto items-center p-4">
        <Link href="/" className="text-lg font-regular text-zinc-200">
          GPT Translator JSON
        </Link>
      </div>
    </header>
  );
}
