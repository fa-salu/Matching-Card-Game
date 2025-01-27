"use client";

import { useState } from "react";

interface LevelSelectorProps {
  click: number;
  setMaxMoves: (moves: number) => void;
  initializeGame: () => void;
}

export default function LevelSelector({
  click,
  setMaxMoves,
  initializeGame,
}: LevelSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>("Easy");

  const levels = [
    { level: "Easy", move: 60 },
    { level: "Medium", move: 46 },
    { level: "Hard", move: 36 },
  ];

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedLevel(selected);
    const levelMoves = levels.find((lvl) => lvl.level === selected)?.move || 60;
    setMaxMoves(levelMoves);

    initializeGame();
  };

  return (
    <div className="flex absolute top-9 left-1/2 space-x-2 text-center items-center justify-center  transform -translate-x-1/2 text-white text-lg sm:text-xl font-bold">
      <div className="relative">
        <select
          id="levelSelector"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="p-2 pr-1 bg-gray-800 text-white text-sm rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {levels.map((level) => (
            <option key={level.level} value={level.level}>
              {level.level}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm">
        <span className="text-gray-400 text-[12px]">Moves:</span>
        {"  "}
        {click} / {levels.find((lvl) => lvl.level === selectedLevel)?.move}
      </div>
    </div>
  );
}
