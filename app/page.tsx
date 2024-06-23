"use client";
import Image from "next/image";
import React from "react";


export default function Home() {
  return (
    <main className = "flex items-center justify-center h-screen">
      <section >
      <h1 className = "font-bold text-4xl ">
        COMMANDER
      </h1>
      <p className="pb-[1rem] text-slate-700">Made By Matthew💖</p>
      <h3>
        IP Address:
      </h3>
      <input className = "border-2 border-black rounded w-[15.5rem]"/>
      <h2 className="pt-[1rem]">
        Password:
      </h2>
      <input className = "border-2 border-black rounded w-[15.5rem]"/>
      <h2 className="pt-[1rem]">
        Generated Phrase:
      </h2>
      <input className = "border-2 border-black rounded w-[15.5rem]"/>
      <h3 className="opacity-0">hi</h3>
      <span className = "flex justify-center">
        {/*do api stuff and allat after doing gui and the C++ stuff and allat 👍👍👍*/}
      <button className="shadow-[0_0_0_3px_#000000_inset] px-[2rem] py-[0.5rem] bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Connect
      </button>
      </span>
      {/* Put a link here of a youtube tutorial later when app is fully done */}
      <h4 className = "flex justify-center pt-[1rem] text-blue-600 font-bold">Need Help? Press Here!</h4>
      </section>
      <a className = "absolute inset-x-0 bottom-0 "href="https://www.flaticon.com/free-icons/setup" title="setup icons">Icon by Freepik-Flaticon</a>
    </main>
  );
}
