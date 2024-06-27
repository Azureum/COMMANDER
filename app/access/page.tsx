"use client";
import React from "react";
import { useRouter } from 'next/router';


export default function Home() {
    const router = useRouter();
    const { ipAddress, username, hash, password } = router.query;

    const updateData = async () => {
        try {
            const response = await fetch(`${ipAddress}:5000/get-data/${password}${username}${hash}`);
            const result = await response.json();
    
            if (response.ok && result.status === "verified") {
                const data = result.data;
    
                const wifiname = data.wifiname;
                const runtime = data.runtime;
                const cpu = data.cpu;
                const gpu = data.gpu;
                const memory_usage = data.memory_usage;
                const cpu_usage = data.cpu_usage;
                console.log("Data updated successfully");
            } else {
                console.error("API call failed or returned:", result.status);
            }
        } catch (error) {
            console.error("Error connecting to the API:", error);
        }
    };


    return (
        <main className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                {/* Statistics Box */}
                <div className="w-full p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold dark:text-white mb-2">System Statistics</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold dark:text-gray-300">CPU Usage:</span>
                            <span className="text-sm dark:text-white">45%</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold dark:text-gray-300">Memory Usage:</span>
                            <span className="text-sm dark:text-white">8GB / 16GB</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold dark:text-gray-300">Runtime:</span>
                            <span className="text-sm dark:text-white">00:00:03.82</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold dark:text-gray-300">Wifi Name:</span>
                            <span className="text-sm dark:text-white">Wifi</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold dark:text-gray-300">Recall On:</span>
                            <span className="text-sm dark:text-white">False</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold dark:text-gray-300">Loop On:</span>
                            <span className="text-sm dark:text-white">False</span>
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2">
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Restart PC
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Restart Wifi
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Shutdown PC
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Turn Off Screen
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Macro 1
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Macro 2
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Macro 3
                    </button>
                    <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Macro 4
                    </button>
                    <button className="col-span-2  shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        Toggle Recall
                    </button>
                    <button className="col-span-2 shadow-[0_0_0_3px_#000000_inset] px-1 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                        View Screen
                    </button>
                </div>
            </div>
        </main>
    );
}
