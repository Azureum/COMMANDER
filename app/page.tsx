"use client";
import Image from "next/image";
import React, { useState } from "react";
import Router from "next/router";

export default function Home() {
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [hash, setHash] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false); 
  const verify = async () => {
    try {
      const response = await fetch(`${ipAddress}:5000/${password}${username}${hash}`);
      const result = await response.json();

      if (response.ok && result.status === "verified") {
        Router.push("/access")
      } else {
        console.error("API call failed or returned:", result.status);
        setFailed(true);
      }
    } catch (error) {
      console.error("Error connecting to the API:", error);
      setFailed(true);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <section>
        <h1 className="font-bold text-4xl">COMMANDER</h1>
        <p className="pb-[1rem] text-slate-700">Made By Matthew💖</p>
        <h3>IP Address:</h3>
        <input
          className="border-2 border-black rounded w-[15.5rem]"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <h2 className="pt-[1rem]">Username:</h2>
        <input
          className="border-2 border-black rounded w-[15.5rem]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h2 className="pt-[1rem]">Hash:</h2>
        <input
          className="border-2 border-black rounded w-[15.5rem]"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <h3 className="pt-[1rem]">Password:</h3>
        <input
          className="border-2 border-black rounded w-[15.5rem]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h4 className="opacity-0">hi</h4>
        <span className="flex justify-center">
          <button
            className="shadow-[0_0_0_3px_#000000_inset] px-[2rem] py-[0.5rem] bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            onClick={verify}
            >
            Connect
          </button>
        </span>
        {/* Put a link here of a youtube tutorial later when app is fully done */}
      {
      failed && (
        <h5 className="flex justify-center pt-[1rem] text-red-600 font-bold opacity-100">Wrong Information!</h5>
      )
      }
        <h6 className="flex justify-center pt-[1rem] text-blue-600 font-bold">
          Need Help? Press Here!
        </h6>
      </section>
      <a
        className="absolute inset-x-0 bottom-0 pt-[5rem] pl-[1rem]"
        href="https://www.flaticon.com/free-icons/setup"
        title="setup icons"
      >
        Icon by Freepik-Flaticon
      </a>
    </main>
  );
}
