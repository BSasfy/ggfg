import Image from "next/image";
import { RestaurantHeader } from "./_components/restaurant-header";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ restaurant: string }>;
}) {
  const { restaurant } = await params;
  const apiKey = "AIzaSyDt8lur7UCIe5QA_WFlEZkMG0hm5cPJTsE";

  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let restaurantList: string[][] = [];
  const restaurantProfile: string = restaurant.replace(/-/g, " ");
  let restaurantName: string | undefined = "";
  let discountType: string | undefined = "";
  let discountDays: string | undefined = "";
  let imgUrl: string | undefined = "";
  let imgId: string | undefined = "17d3itcacvk9cj9zRCpuSS2YXUeYDPGfN";

  function handleResponse(restaurantsObject: object) {
    // eslint-disable-next-line
    const tempArray: string[][] = Object.values(restaurantsObject)[2];
    tempArray.shift(); // Remove header
    restaurantList = tempArray;
    restaurantList.forEach((element) => {
      if (element.includes(restaurantProfile)) {
        console.log(element);
        [
          restaurantName,
          discountType,
          discountDays, // address (unused)
          // description (unused)
          ,
          ,
          imgUrl,
        ] = element;
      }
    });
    if (imgUrl) {
      imgId = imgUrl.split("/").reverse()[1];
      console.log(imgId, "<<<<");
    }
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F?key=${apiKey}`,
  )
    .then((response) => response.json())
    .then((restaurantsObject: object) => {
      handleResponse(restaurantsObject);
    });
  return (
    <div>
      <div className="h-[30vh] overflow-hidden">
        <Image
          src={`https://drive.google.com/uc?id=${imgId}`}
          width={3000}
          height={100}
          alt={`${restaurantName}`}
          className="overflow-hidden"
        />
      </div>
      <RestaurantHeader />
      <div className="p-8 text-center">
        {/* restaurant name */}
        <div className="text-4xl font-bold text-black">{restaurantName}</div>
        <div className="mx-auto my-3 w-full border border-gray-400"></div>

        {/* Offer type */}
        <div className="text-brand-gray text-lg">Offer:</div>
        <div className="text-xl md:text-2xl">{discountType}</div>
        <div className="mx-auto my-3 w-[40vw] border-2 border-gray-300"></div>

        {/* Offer Days */}
        <div className="text-brand-gray text-lg">When?</div>
        <div className="text-xl md:text-2xl">{discountDays}</div>
        <div className="mx-auto my-3 w-[50vw] border-2 border-gray-300"></div>

        {/* Booking */}
        <div className="text-brand-gray text-lg">Booking required?</div>
        {/* if link exists, say yes, book here. if no link, say no */}
        <div className="flex flex-row justify-center gap-1">
          <div className="text-xl md:text-2xl">Yes, </div>{" "}
          <div className="text-xl md:text-2xl"> Book Here! </div>
        </div>
        <div className="mx-auto my-3 w-[60vw] border-2 border-gray-300"></div>

        {/* Description */}
        <div className="text-brand-gray text-lg">Description:</div>
        <div className="max-w-[80vw] justify-self-center text-xl md:text-2xl">
          Type of food, atmosphere, dog friendly, kid friendly, etc
        </div>
        <div className="mx-auto my-3 w-[80vw] border-2 border-gray-300"></div>
      </div>
    </div>
  );
}
