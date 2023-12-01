/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react/no-unescaped-entities */
"use client";

import FloatingActionButton from '@/components/FloatingButton';
import Image from 'next/image';

console.log('OPENAI_API_KEY present:', Boolean(process.env.OPENAI_API_KEY));
console.log('PUBLIC OPENAI_API_KEY present:', Boolean(process.env.NEXT_PUBLIC_OPENAI_API_KEY));


function Home() {
  return (
    <>
 
    <div className="full-viewport-background">   </div>
    <div className="homecontainer">



      <section className="text-center py-10 bg-primary-500 text-light-1">
      <h1 className="text-13xl md:text-9xl lg:text-10xl font-bold font-lobster text-shadow">Welcome to Food Connect!</h1>
        <p className="mt-4 font-body-normal animate-fadeIn">Discover easy, healthy, and budget-friendly solutions while you're in school!</p>
      </section>

      <section className="my-10 animate-fadeIn">
        <h2 className="font-heading2-bold text-secondary-500 text-center"></h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Repeat this block for each recipe */}
          <div className="rounded-lg bg-light-1 p-4 shadow-md">
            <Image src="/images/AlmondSnack.jpg" alt="snack" width={500} height={200} className="rounded object-cover" />
            <h3 className="mt-2 font-body-semibold">Healthy Snack</h3>
            <p className="font-body-normal text-dark-2">Have a healthy protein snack</p>
          </div>
          <div className="rounded-lg bg-light-1 p-4 shadow-md">
            <Image src="/images/New_Smoothie_Cups-2.png" alt="Campus Restuarant" width={500} height={200} className="rounded object-cover" />
            <h3 className="mt-2 font-body-semibold">On Campus Restaurant</h3>
            <p className="font-body-normal text-dark-2">Find healthy Food on Campus</p>
          </div>
          <div className="rounded-lg bg-light-1 p-4 shadow-md">
            <Image src="/images/LocalJuice-food.png" alt="In Town Restuarant" width={500} height={200} className="rounded object-cover" />
            <h3 className="mt-2 font-body-semibold">Healthy Restuarant</h3>
            <p className="font-body-normal text-dark-2">Find a new favorite Restaurant in town</p>
          </div>
          {/* End of recipe block */}
        </div>
      </section>

      <section className="my-10">
        <h2 className="font-heading3-bold text-center text-dark-7"></h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
          {/* Repeat this block for each tip */}
          <div className="rounded-lg bg-dark-1 p-4">
            <h3 className="font-body-semibold">Tip</h3>
            <p className="font-body-normal">Fill your plate with a variety of colorful fruits and vegetables to ensure a broad spectrum of essential nutrients.</p>
          </div>
          <div className="rounded-lg bg-dark-1 p-4">
            <h3 className="font-body-semibold">Tip</h3>
            <p className="font-body-normal">Practice mindful eating by paying attention to hunger and fullness cues, and enjoy your meals without distractions to prevent overeating.</p>
          </div>
          
          {/* End of tip block */}
        </div>
      </section>
    </div>
    <FloatingActionButton />
    </>
    
    
  );
}



export default Home;
