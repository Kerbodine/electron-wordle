import Cell from "./Cell";

export default function GridRow({ row, gameMode }) {
  return (
    <div className="wordle-grid flex w-full gap-1">
      {row.map((cell, cellIndex) => (
        <Cell key={cellIndex} cell={cell} gameMode={gameMode} />
      ))}
    </div>
  );
}
