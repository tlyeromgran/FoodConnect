import Image from "next/image";

interface Restaurant {
  name: string;
  logo: string;
  menu: string;
  hours: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void; // Add an onClick prop
}

function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-7 p-7 px-5 mt-3" onClick={onClick}>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Image
              src={restaurant.logo}
              alt='restaurant_logo'
              width={100}
              height={100}
              className='rounded-full object-cover'
            />
          </div>

          <div className='flex w-full flex-col'>
            <h4 className='text-base-semibold text-gray-4'>{restaurant.name}</h4>
            <p className='mt-2 text-small-regular text-gray-4'>{restaurant.description}</p>

            <div className='mt-5 flex flex-col gap-3'>
            <p className='text-subtle-medium text-gray-1'>Menu: <a href={restaurant.menu} className='text-subtle-medium text-gray-1' target="_blank" rel="noopener noreferrer">
              {restaurant.menu}
            </a></p>
            
              <p className='text-subtle-medium text-gray-1'>Hours: {restaurant.hours}</p>
              <p className='text-subtle-medium text-gray-1'>Email: {restaurant.email}</p>
              <p className='text-subtle-medium text-gray-1'>Phone: {restaurant.phone}</p>
              <p className='text-subtle-medium text-gray-1'>Address: {restaurant.address}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;
