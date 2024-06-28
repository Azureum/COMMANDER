import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const ScreenContent = () => {
  const searchParams = useSearchParams();
  const ipAddress = searchParams.get('ip');
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  const hash = searchParams.get('hash');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchScreenshot = async () => {
    try {
      const response = await fetch(`http://${ipAddress}:80/get-screen/${password}${username}${hash}`);
      
      if (response.status === 200) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
        setError(null);
      } else if (response.status === 403) {
        setError('Invalid verification');
        setImageSrc(null);
      }
    } catch (err) {
      setError('An ERROR occurred');
      setImageSrc(null);
    }
  };

  useEffect(() => {
    fetchScreenshot();
    const intervalId = setInterval(fetchScreenshot, 110);
    return () => clearInterval(intervalId);
  }, []);

  const backPage = () => {
    router.push(`/access?ip=${ipAddress}&username=${username}&hash=${hash}&password=${password}`);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        {imageSrc ? (
          <Image
            src={imageSrc}
            width={800} // Default width
            height={600} // Default height
            className="transform w-full max-w-[30rem] h-auto"
            alt="Screen Image"
          />
        ) : (
          <div>{error ? error : "Loading..."}</div>
        )}
        <div className="mt-4">
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={backPage}>
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default ScreenContent;
