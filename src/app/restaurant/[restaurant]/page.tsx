export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ restaurant: string }>;
}) {
  const { restaurant } = await params;
  return <div>My restaurant: {restaurant} </div>;
}
