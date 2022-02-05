import GridRow from "./GridRow";

export default function Grid({ grid, gameMode }) {
  return (
    <div className="flex w-full flex-col gap-1">
      {grid.map((row, rowIndex) => (
        <GridRow key={rowIndex} row={row} gameMode={gameMode} />
      ))}
    </div>
  );
}
