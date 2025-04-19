import Image from "next/image";

import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col gap-4 text-white">
      <Image
        src="/header.png"
        height={858}
        width={1110}
        alt="Glasgow's Good Food Group banner"
      />
      <div className="px-6">
        <div className="search__input flex flex-row items-center gap-5 rounded-[15px] border-[2px] border-solid border-slate-500 p-1">
          <label className="text-brand-gray text-4xl">Search</label>
          <input type="text" id="inputId" placeholder="Enter your keywords" />
        </div>
        <div className="text-brand-medium-gray pt-10 text-4xl">
          Featured Offers
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10">
          <div className="h-40 content-center rounded-2xl border-2 border-gray-300 bg-white text-center text-3xl shadow-lg">
            restaurant
          </div>
          <div className="h-40 content-center rounded-2xl border-2 border-gray-300 bg-white text-center text-3xl shadow-lg">
            restaurant
          </div>
          <div className="h-40 content-center rounded-2xl border-2 border-gray-300 bg-white text-center text-3xl shadow-lg">
            restaurant
          </div>
          <div className="h-40 content-center rounded-2xl border-2 border-gray-300 bg-white text-center text-3xl shadow-lg">
            restaurant
          </div>
        </div>
      </div>
    </main>
  );
}
