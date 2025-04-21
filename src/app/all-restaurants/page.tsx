import { auth } from "@/server/auth";
import { RestaurantCard } from "../_components/restaurant-card";
import type { JsonArray } from "next-auth/adapters";

export default async function Restaurants() {
  const apiKey = "AIzaSyCRJwEkS1f9rVZ1ATUrRmmkt9ykfl32C3I";
  const session = await auth();
  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let header: string[] | undefined = [];
  let restaurantList: string[][] = [];

  function handleResponse(restaurantsObject: object) {
    // eslint-disable-next-line
    const tempArray: string[][] = Object.values(restaurantsObject)[2];
    header = tempArray.shift();
    restaurantList = tempArray;
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E?key=${apiKey}`,
  )
    .then((response) => response.json())
    .then((restaurantsObject: object) => {
      handleResponse(restaurantsObject);
    });

  return (
    <main className="text-brand-medium-gray flex min-h-screen flex-col gap-10 p-10">
      <div className="text-5xl">All Offers</div>
      {restaurantList.map((restaurant, index) => (
        <div key={index}>
          <RestaurantCard restaurantDetails={restaurant} />
        </div>
      ))}
    </main>
  );
}
