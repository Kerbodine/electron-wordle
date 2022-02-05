export default function Cell({ cell, gameMode }) {
  return (
    <div
      className={`${
        cell.state === 0
          ? "box-border border-[2px] border-gray-200 text-gray-500"
          : cell.state === 1
          ? "border-none bg-gray-500 text-white"
          : cell.state === 2
          ? "bg-amber-500 border-none text-white"
          : "border-none bg-green-500 text-white"
      } ${
        gameMode === 4
          ? "text-3xl"
          : gameMode === 5
          ? "text-2xl"
          : gameMode === 6
          ? "text-xl"
          : "text-lg"
      } aspect-square flex w-full items-center justify-center rounded-md font-bold`}
    >
      {cell.char}
    </div>
  );
}
