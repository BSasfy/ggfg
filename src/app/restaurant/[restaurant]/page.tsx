import Image from "next/image";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ restaurant: string }>;
}) {
  const { restaurant } = await params;
  const apiKey = "AIzaSyDt8lur7UCIe5QA_WFlEZkMG0hm5cPJTsE";

  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let header: string[] | undefined = [];
  let restaurantList: string[][] = [];
  const restaurantProfile: string = restaurant.replace(/-/g, " ");
  let restaurantName: string | undefined = "";
  let discountType: string | undefined = "";
  let discountDays: string | undefined = "";
  let address: string | undefined = "";
  // let googleMapsURL: string = "";
  let description: string | undefined = "";

  function handleResponse(restaurantsObject: object) {
    // eslint-disable-next-line
    const tempArray: string[][] = Object.values(restaurantsObject)[2];
    header = tempArray.shift();
    restaurantList = tempArray;
    restaurantList.forEach((element) => {
      if (element.includes(restaurantProfile)) {
        [restaurantName, discountType, discountDays, address, description] =
          element;
      }
    });
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E?key=${apiKey}`,
  )
    .then((response) => response.json())
    .then((restaurantsObject: object) => {
      handleResponse(restaurantsObject);
    });
  return (
    <div>
      <div className="h-[30vh] overflow-hidden">
        <Image
          src="/restaurant.png"
          width={3000}
          height={100}
          alt={`${restaurantName}`}
          className="overflow-hidden"
        />
      </div>
      <div className="p-8">
        <div className="text-brand-gray text-2xl font-bold">
          {restaurantName}
        </div>
        <div className="mx-auto my-5 w-full border border-gray-400"></div>
      </div>
    </div>
  );
}
