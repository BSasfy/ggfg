import Image from "next/image";

interface RestaurantProps {
  restaurantDetails: string[];
}

export function RestaurantCard({ restaurantDetails }: RestaurantProps) {
  const [name, discountType, discountDays, address, description] =
    restaurantDetails;

  console.log(name);

  return (
    <div className="grid h-40 grid-cols-4 content-center rounded-2xl border-2 border-gray-300 bg-white text-3xl shadow-lg">
      <Image
        src="/restaurant.png"
        height={150}
        width={150}
        alt="restaurants"
        style={{ objectFit: "contain" }}
      />

      <div className="col-span-3 my-auto flex-col text-center">
        <div className="text-4xl">{name}</div>
        <div className="text-3xl">
          {discountType}, {discountDays}
        </div>

        <div className="text-2xl">{address}</div>
      </div>
    </div>
  );
}
