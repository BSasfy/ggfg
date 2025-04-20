import Image from "next/image";

import { auth } from "@/server/auth";
import { RestaurantCard } from "./_components/restaurant-card";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  const apiKey = "AIzaSyCRJwEkS1f9rVZ1ATUrRmmkt9ykfl32C3I";
  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let header = {};
  let featuredList: any[] = [];

  function handleResponse(restaurantsArray: any[]) {
    header = restaurantsArray.shift();

    featuredList = restaurantsArray.slice(0, 4);
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E?key=${apiKey}`,
  )
    .then((response) => response.json())
    .then((restaurantsObject) => handleResponse(restaurantsObject.values));

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
          <Link
            href={"/all-restaurants"}
            className="bg-brand-green border-brand-gray self-center rounded-4xl border-2 px-6 py-2 text-xl sm:py-4 sm:text-3xl"
          >
            See All
          </Link>
        </div>
        <div className="text-brand-medium-gray grid grid-cols-2 gap-6 py-10 sm:gap-10">
          {featuredList.map((fetauredRestaurant, index) => (
            <div key={index}>
              <RestaurantCard
                restaurantDetails={fetauredRestaurant}
                isFeatured={true}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
