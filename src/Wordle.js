import { useState } from "react";
import Grid from "./Grid";
import { BiReset, BiShareAlt } from "react-icons/bi";

export default function WordleFive({
  guessWord,
  allWords,
  randomGuessWord,
  gameMode,
  setGameMode,
}) {
  const generateGrid = () => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push([]);
      for (let j = 0; j < gameMode; j++) {
        arr[i].push({ char: "", state: 0 });
      }
    }
    return arr;
  };

  console.log(guessWord);

  const [grid, setGrid] = useState(generateGrid());

  const [error, setError] = useState("");
  const [win, setWin] = useState(false);
  const [gameover, setGameover] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);

  const updateGrid = (value) => {
    let newGrid = grid;
    newGrid[currentRow][currentIndex % gameMode].char = value;
    setGrid([...newGrid]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteGridItem = () => {
    let newGrid = grid;
    newGrid[currentRow][currentIndex - 1].char = "";
    setGrid([...newGrid]);
    setCurrentIndex(currentIndex - 1);
  };

  window.onkeydown = async (event) => {
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      if (currentIndex < gameMode) {
        updateGrid(event.key.toUpperCase());
      }
    } else if (event.keyCode === 8) {
      if (currentIndex > 0) {
        deleteGridItem();
      }
    } else if (event.keyCode === 13) {
      setError("");
      if (currentIndex === gameMode) {
        let word = "";
        for (let i = 0; i < gameMode; i++) {
          word += grid[currentRow][i].char;
        }
        if (allWords[gameMode].includes(word.toLowerCase())) {
          let newGrid = grid;
          if (word === guessWord) {
            for (let i = 0; i < gameMode; i++) {
              newGrid[currentRow][i].state = 3;
            }
            setWin(true);
          } else {
            const wordArray = guessWord.split("");
            for (let i = 0; i < gameMode; i++) {
              if (newGrid[currentRow][i].char === wordArray[i]) {
                newGrid[currentRow][i].state = 3;
                wordArray[i] = "";
              } else if (wordArray.includes(newGrid[currentRow][i].char)) {
                newGrid[currentRow][i].state = 2;
                wordArray[wordArray.indexOf(newGrid[currentRow][i].char)] = "";
              } else {
                newGrid[currentRow][i].state = 1;
              }
            }
            if (currentRow === gameMode) {
              setGameover(true);
            } else {
              setCurrentRow(currentRow + 1);
              setCurrentIndex(0);
            }
          }
          setGrid([...newGrid]);
        } else {
          setError("Word not found");
        }
      } else {
        setError("Please fill in the entire row");
      }
    }
  };

  const resetGame = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      return;
    } else {
      randomGuessWord();
      setGrid(generateGrid(5));
      setError("");
      setWin(false);
      setGameover(false);
      setCurrentIndex(0);
      setCurrentRow(0);
    }
  };

  const share = () => {
    let copyText = `Wordle [${gameMode}]: \n`;

    for (const row of grid) {
      copyText += "\n";
      for (const cell of row) {
        switch (cell.state) {
          case 1:
            copyText += "⬜";
            break;
          case 2:
            copyText += "🟨";
            break;
          case 3:
            copyText += "🟩";
            break;
          default:
            break;
        }
      }
    }

    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="draggable w-full max-w-[360px] overflow-hidden rounded-2xl bg-white pt-[52px] shadow-xl">
      <div className="no-drag box-border h-full w-full border-t-[2px] border-gray-200 p-6">
        <div className="-mx-1 mb-4 flex h-10 gap-1 rounded-lg border-[2px] border-gray-200 p-1">
          <button
            onClick={() => setGameMode(4)}
            className={`${
              gameMode === 4 ? "!bg-gray-600 text-white" : null
            } top-btn`}
          >
            4
          </button>
          <button
            onClick={() => setGameMode(5)}
            className={`${
              gameMode === 5 ? "!bg-gray-600 text-white" : null
            } top-btn`}
          >
            5
          </button>
          <button
            onClick={() => setGameMode(6)}
            className={`${
              gameMode === 6 ? "!bg-gray-600 text-white" : null
            } top-btn`}
          >
            6
          </button>
          <button
            onClick={() => setGameMode(7)}
            className={`${
              gameMode === 7 ? "!bg-gray-600 text-white" : null
            } top-btn`}
          >
            7
          </button>
        </div>
        <div className="mb-2 flex items-center">
          <h1 className="text-2xl font-semibold">React Wordle [{gameMode}]</h1>
          <button
            onClick={resetGame}
            className="ml-auto mr-2 text-2xl text-gray-400 hover:text-black"
          >
            <BiReset />
          </button>
        </div>
        {error && (
          <p className="text-semibold mb-2 rounded-md border-[2px] border-yellow-300 bg-yellow-100 px-1.5 py-0.5 text-sm text-yellow-500">
            {error}
          </p>
        )}
        {gameover && (
          <p className="text-semibold mb-2 rounded-md border-[2px] border-red-300 bg-red-100 px-1.5 py-0.5 text-sm text-red-500">
            You lose! The word was {guessWord}
          </p>
        )}
        {win && (
          <p className="text-semibold mb-2 rounded-md border-[2px] border-green-300 bg-green-100 px-1.5 py-0.5 text-sm text-green-500">
            🥳 Congratulations! 🎉
          </p>
        )}
        <Grid grid={grid} gameMode={gameMode} />
        {(win || gameover) && (
          <div className="mt-4 flex w-full justify-center gap-2">
            <button
              onClick={resetGame}
              className="grid h-8 w-24 place-items-center rounded-md bg-gray-100 hover:bg-gray-600 hover:text-white"
            >
              Play Again
            </button>
            <button
              onClick={share}
              className="grid h-8 w-8 place-items-center rounded-md bg-gray-100 text-lg hover:bg-gray-600 hover:text-white"
            >
              <BiShareAlt />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
