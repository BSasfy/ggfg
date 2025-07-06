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
  const [name, discountType, discountDays, address] = restaurantDetails;

  const urlSlug = name?.replace(/\s+/g, "-");

  return (
    <Link href={`/restaurant/${urlSlug}`}>
      <div
        className={`${isFeatured ? "flex flex-col" : "grid grid-cols-4"} h-40 content-center rounded-2xl border-2 border-gray-300 bg-white text-3xl shadow-lg`}
      >
        {!isFeatured && (
          <Image
            src="/restaurant.png"
            height={160}
            width={160}
            alt="restaurants"
            style={{
              objectFit: "cover",
              height: "160px",
              borderRadius: "16px 0px 0px 16px",
            }}
          />
        )}

        <div className="col-span-3 my-auto flex-col py-4 text-center md:flex-row">
          <div className="xs:text-3xl text-xl font-bold sm:text-4xl">
            {name}
          </div>
          <div className="xs:text-2xl text-lg sm:text-3xl">
            {discountType}, {discountDays}
          </div>

          {!isFeatured && <div className="text-xl sm:text-2xl">{address}</div>}
        </div>
      </div>
    </Link>
  );
}
