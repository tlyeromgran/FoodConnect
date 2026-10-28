import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import { currentUser } from "@/lib/auth";
// import dynamic from 'next/dynamic';
import "../globals.css";


const inter = Inter({ subsets: ["latin"] });
// const FloatingActionButton = dynamic(()=> import('@/componenents/FloatingButton'), {ssr: false, loading: () => <p>Loading...</p>});

export const metadata: Metadata = {
  title: "FoodConnect",
  description: "A UTC Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Topbar />

        <main className='flex flex-row'>
          <LeftSidebar userId={user?.id ?? null} />
          <section className='main-container'>
            <div className='w-full max-w-4xl'>{children}</div>
            
          </section>
          {/* @ts-ignore */}
         
          <RightSidebar />
        </main>

        <Bottombar />
      </body>
    </html>
  );

  
}
