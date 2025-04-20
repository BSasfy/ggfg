import Image from "next/image";
import Link from "next/link";

interface RestaurantProps {
  restaurantDetails: string[];
  isFeatured?: boolean;
}

export function RestaurantCard({
  restaurantDetails,
  isFeatured,
}: RestaurantProps) {
  const [name, discountType, discountDays, address, description] =
    restaurantDetails;

  const urlSlug = name?.replace(/\s+/g, "-")?.toLowerCase();

  return (
    <Link href={`/restaurant/${urlSlug}`}>
      <div
        className={`${isFeatured ? "flex flex-col" : "grid grid-cols-4"} h-40 content-center rounded-2xl border-2 border-gray-300 bg-white text-3xl shadow-lg`}
      >
        {!isFeatured && (
          <Image
            src="/restaurant.png"
            height={150}
            width={150}
            alt="restaurants"
            style={{ objectFit: "contain" }}
          />
        )}

        <div className="col-span-3 my-auto flex-col py-4 text-center">
          <div className="xs:text-3xl text-xl sm:text-4xl">{name}</div>
          <div className="xs:text-2xl text-lg sm:text-3xl">
            {discountType}, {discountDays}
          </div>

          {!isFeatured && <div className="text-xl sm:text-2xl">{address}</div>}
        </div>
      </div>
    </Link>
  );
}
