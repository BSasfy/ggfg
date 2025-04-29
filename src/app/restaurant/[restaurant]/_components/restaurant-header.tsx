import Link from "next/link";

export function RestaurantHeader() {
  return (
    <div className="flex h-12 w-full justify-between px-4 pt-4">
      <Link href="/all-restaurants">
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
      <span className="material-symbols-outlined">favorite</span>
    </div>
  );
}
