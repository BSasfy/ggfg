import Link from "next/link";

export function Footer() {
  return (
    <div className="flex h-16 w-full justify-between bg-black text-center">
      <div className="flex-auto content-center text-2xl text-white">
        <Link href="/">
          <span className="material-symbols-outlined">Home</span>
        </Link>
      </div>
      <div className="border-brand-light-brown border border-y-2 text-2xl"></div>
      <div className="flex-auto content-center text-2xl text-white">
        <span className="material-symbols-outlined">Favorite</span>
      </div>
    </div>
  );
}

// TODO: add icons instead of text, make home and favourites a link. Create page to show all favourites for it to point to
