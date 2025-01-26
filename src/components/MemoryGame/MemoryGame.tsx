"use client";

import { useState, useEffect } from "react";
import cat from "../../../public/images/cat.jpg";
import dog from "../../../public/images/dog.jpg";
import elephant from "../../../public/images/elephant.jpg";
import rabbit from "../../../public/images/rabbit.jpg";
import rat from "../../../public/images/rat.jpg";
import robot from "../../../public/images/robot.jpg";
import tiger from "../../../public/images/tiger.jpg";
import whiteTiger from "../../../public/images/white-tiger.jpg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import ReactConfetti from "react-confetti";

export default function MemoryGame() {
  const [cards, setCards] = useState<StaticImageData[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  const initializeGame = () => {
    const memoryImages = [
      cat,
      dog,
      elephant,
      rabbit,
      rat,
      robot,
      tiger,
      whiteTiger,
    ];

    const shuffledCards = [...memoryImages, ...memoryImages].sort(
      () => Math.random() - 0.5
    );

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
  };

  const playCardFlipSound = () => {
    if (soundEnabled) {
      // Only play the sound if enabled
      const audio = new Audio("/sounds/card-flip.wav");
      audio.volume = 0.5;
      audio.play();
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      playCardFlipSound();
      setFlipped([...flipped, index]);
    }
  };

  const winMatch = solved.length === cards.length;

  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {winMatch && (
        <>
          {windowWidth > 0 && windowHeight > 0 && (
            <ReactConfetti
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 10,
              }}
              numberOfPieces={400}
            />
          )}

          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
            <h1 className="text-6xl font-bold text-white">You Win</h1>
          </div>
        </>
      )}

      <div className="absolute top-9 sm:top-5 left-1/2 transform -translate-x-1/2 text-white text-base sm:text-xl font-bold">
        <span>Matched Cards: {solved.length / 2} / 8</span>
      </div>

      <button
        className="absolute top-5 right-5 p-2  rounded-full shadow-md hover:scale-110 z-20"
        onClick={goHome}
      >
        <Image
          src="/images/home-icon-silhouette-svgrepo-com.svg"
          alt="Home"
          width={20}
          height={20}
        />
      </button>

      <div className="grid grid-cols-4 gap-1 sm:gap-5 mt-20">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-20 h-20 sm:w-28 sm:h-28 relative border text-4xl font-bold border-gray-300 shadow-md rounded-md overflow-hidden flex justify-center items-center cursor-pointer transition-transform duration-300 ${
              flipped.includes(index) || solved.includes(index)
                ? "rotate-180"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <Image
                className="rotate-180"
                src={card}
                fill
                alt={`card-${index}`}
                sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, 150px"
              />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-5 px-5 py-2 bg-slate-500 rounded-md shadow-md hover:bg-slate-600 transition-colors z-20 flex items-center justify-center"
        onClick={initializeGame}
      >
        <Image
          src="/images/reset-svgrepo-com.svg"
          alt="Reset"
          width={32}
          height={32}
        />
      </button>

      <button
        className="absolute bottom-5 right-4 transform -translate-x-1/2  py-2  rounded-md shadow-md transition-colors"
        onClick={() => setSoundEnabled((prev) => !prev)}
      >
        {soundEnabled ? (
          <span
            role="img"
            aria-label="sound-off"
            className="text-white text-xl"
          >
            🔊
          </span>
        ) : (
          <span role="img" aria-label="sound-on" className="text-white text-xl">
            🔇
          </span>
        )}
      </button>
    </div>
  );
}
