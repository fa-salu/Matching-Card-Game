import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-evenly space-y-8 px-5">
      <div className="text-center bg-transparent border-2 -rotate-6 shadow-md shadow-gray-200">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gradient bg-clip-text shadow  shadow-gray-200 text-transparent bg-gray-300">
          Matching <br />
          Card Game
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <Link href={"/memory-game"}>
          <h2 className="bg-[#FFFFFF] text-black text-xl font-semibold px-8 py-4 rounded transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
            Play
          </h2>
        </Link>
      </div>
    </div>
  );
}
