import RestaurantList from "@/components/RestaurantList";
import Pagination from "@/components/shared/Pagination";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { redirect } from "next/navigation";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  // import MyMapComponent from '@/components/MyMap';
  const MyMapComponent = dynamic(() => import('@/components/MyMap'), {
    ssr: false,  // This will load the component only on the client side
    loading: () => <p>Loading...</p> 
  });

  const Searchbar = dynamic(() => import('@/components/shared/Searchbar'), {
    ssr: false,  // This will load the component only on the client side
    loading: () => <p>Loading...</p> 
  });

  return (
    <section>
      <h1 className='head-text5 mb-10'>Search</h1>

      <Searchbar />

      <div>
        <h1 className='head-text5 text-left'></h1>
        <MyMapComponent />
      </div>
        <RestaurantList />
      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
    
  );
}

export default Page;
