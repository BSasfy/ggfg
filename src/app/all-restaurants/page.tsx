import { RestaurantCard } from "../_components/restaurant-card";

export default async function Restaurants() {
  const apiKey = "AIzaSyDt8lur7UCIe5QA_WFlEZkMG0hm5cPJTsE";
  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let restaurantList: string[][] = [];

  function handleResponse(restaurantsObject: object) {
    // eslint-disable-next-line
    const tempArray: string[][] = Object.values(restaurantsObject)[2];
    tempArray.shift(); // Remove header
    restaurantList = tempArray;
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E?key=${apiKey}`,
  )
    .then((response) => response.json())
    .then((restaurantsObject: object) => {
      handleResponse(restaurantsObject);
    });

  console.log(restaurantList, "restaurantList");

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
