"use client";

import Image from "next/image";
import { RestaurantCard } from "./_components/restaurant-card";
import Link from "next/link";
import { useFetch } from "@/lib/utils/hooks";

export default function Home() {
  const restaurantData = useFetch();

  const apiKey = "AIzaSyDt8lur7UCIe5QA_WFlEZkMG0hm5cPJTsE";
  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let header: string[] | undefined = [];
  let featuredRestaurantList: string[][] = [];

  function handleResponse(restaurantDetails: string[][]) {
    if (restaurantDetails) {
      header = restaurantDetails.shift();

      featuredRestaurantList = restaurantDetails.slice(0, 4);
    }
  }

  if (restaurantData) {
    handleResponse(restaurantData);
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 text-white">
      <Image
        src="/header.png"
        height={858}
        width={1110}
        alt="Glasgow's Good Food Group banner"
        className="lg:hidden"
      />
      <Image
        src="/banner-desktop.png"
        height={400}
        width={4000}
        alt="Glasgow's Good Food Group banner"
        className="max-lg:hidden"
      />
      <div className="px-6 lg:px-20">
        <div className="search__input flex flex-row items-center gap-5 rounded-[15px] border-[2px] border-solid border-slate-500 p-1">
          <label className="text-brand-gray text-2xl sm:text-4xl">Search</label>
          <input type="text" id="inputId" placeholder="Enter your keywords" />
        </div>
        <div className="flex justify-between pt-10 pb-2 sm:pb-4">
          <div className="text-brand-medium-gray content-center text-3xl sm:text-5xl">
            Featured Offers
          </div>
          <div className="max-sm:hidden">
            <Link
              href={"/all-restaurants"}
              className="bg-brand-green border-brand-gray self-center rounded-4xl border-2 px-6 py-2 text-xl sm:py-4 sm:text-3xl"
            >
              See All
            </Link>
          </div>
        </div>
        <div className="text-brand-medium-gray grid grid-cols-2 gap-6 py-6 sm:gap-10 sm:py-10">
          {featuredRestaurantList.map((fetauredRestaurant, index) => (
            <div key={index}>
              <RestaurantCard
                restaurantDetails={fetauredRestaurant}
                isFeatured={true}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full place-content-center pt-4 pb-6 sm:hidden">
          <Link
            href={"/all-restaurants"}
            className="bg-brand-green border-brand-gray rounded-4xl border-2 px-10 py-3 text-2xl"
          >
            See All
          </Link>
        </div>
      </div>
    </main>
  );
}
