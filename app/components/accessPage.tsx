import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

const AccessContent = () => {
  const searchParams = useSearchParams();
  const ipAddress = searchParams.get('ip');
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  const hash = searchParams.get('hash');
  const [loopOn, setLoopOn] = useState(true);
  const [commandStatus, setCommandStatus] = useState('________________');

  const [data, setData] = useState({
    wifiname: '',
    runtime: '',
    cpu: '',
    gpu: '',
    memory_usage: '',
    cpu_usage: '',
    recallstatus: '',
  });

  const updateData = async () => {
    try {
      const response = await fetch(`http://${ipAddress}:80/get-data/${password}${username}${hash}`);
      const result = await response.json();

      if (result.status == 200) {
        setData(result.data);
        console.log("Data updated successfully");
      } else {
        console.error("API call failed or returned:", result.status);
      }
    } catch (error) {
      console.error("Error connecting to the API:", error);
    }
  };

  const sendCommand = async (command: string) => {
    try {
      const response = await fetch(`http://${ipAddress}:80/send-command/${command}/${password}${username}${hash}`);
      const result = await response.json();

      if (response.ok && result.status === "Success") {
        setCommandStatus("COMMAND SUCCESS");
      } else {
        setCommandStatus("COMMAND FAILURE");
      }
    } catch (error) {
      setCommandStatus("COMMAND ERROR");
    }
  }

  const sendMacro = async (macroID: string) => {
    try {
      const response = await fetch(`http://${ipAddress}:80/send-macro/${macroID}/${password}${username}${hash}`);
      const result = await response.json();

      if (response.ok && result.status === "Success") {
        setCommandStatus("MACRO SUCCESS");
      } else {
        setCommandStatus("MACRO FAILURE");
      }
    } catch (error) {
      setCommandStatus("MACRO ERROR");
    }
  }

  useEffect(() => {
    updateData();
    const intervalId = setInterval(updateData, 500);
    return () => clearInterval(intervalId);
  }, []);

  const loopToggle = () => {
    setLoopOn(prevLoopOn => !prevLoopOn);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {/* Statistics Box */}
        <div className="w-full p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-bold dark:text-white mb-2">System Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-sm font-semibold dark:text-gray-300">{data.cpu}</span>
            <span className="text-sm font-semibold dark:text-gray-300">{data.gpu}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold dark:text-gray-300">CPU Usage:</span>
              <span className="text-sm dark:text-white">{data.cpu_usage}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold dark:text-gray-300">Memory Usage:</span>
              <span className="text-sm dark:text-white">{data.memory_usage}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold dark:text-gray-300">Runtime:</span>
              <span className="text-sm dark:text-white">{data.runtime}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold dark:text-gray-300">Wifi Name:</span>
              <span className="text-sm dark:text-white">{data.wifiname}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold dark:text-gray-300">Recall On:</span>
              <span className="text-sm dark:text-white">{data.recallstatus}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold dark:text-gray-300">Loop On:</span>
              <span className="text-sm dark:text-white">{loopOn.toString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full p-4 mb-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
             Command Status:  {commandStatus}            
          </div>
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendCommand("shutdown")}>
          Shutdown PC
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendCommand("restart")}>
            Restart PC
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendCommand("wifirestart")}>
            Restart Wifi
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendCommand("sleep")}>
            Turn Off Screen
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendMacro("1")}>
            Macro 1
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendMacro("2")}>
            Macro 2
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendMacro("3")}>
            Macro 3
          </button>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={() => sendMacro("4")}>
            Macro 4
          </button>
          <button className="col-span-2  shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={loopToggle}>
            Toggle Loop
          </button>
          <button className="col-span-2 shadow-[0_0_0_3px_#000000_inset] px-1 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            View Screen
          </button>
        </div>
      </div>
    </main>
  );
};

export default AccessContent;
