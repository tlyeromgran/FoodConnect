"use client"

import Image from "next/image";
import Link from "next/link";

import { signOut } from "@/lib/actions/auth.actions";

function Topbar() {

  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/logo.svg' alt='logo' width={50} height={50} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>FoodConnect</p>
      </Link>

      <div className='flex items-center gap-1'>

        <div className='block md:hidden'>
          <form
            action={async () => {
              await signOut();
              window.location.assign("/sign-in");
            }}
          >
            <button type='submit' className='flex cursor-pointer'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
