import React from "react";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

type Props = {};

export default function Layout({ children }: React.PropsWithChildren<Props>) {
  return (
    <div>
      <Header />
      <div className='relative'>
        <div className='max-w-8xl pt-[72px] mx-auto px-4 sm:px-6 md:px-8'>
          <Sidebar />
          <main className='lg:pl-[14rem]'>
            <section className='mx-auto px-0 py-6 lg:px-16 lg:py-10 max-w-none xl:ml-0 xl:mr-[15.5rem]'>
              {children}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
