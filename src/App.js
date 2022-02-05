import { useEffect, useState } from "react";
import WordleFive from "./Wordle";
import { wordsFour } from "./wordsFour";
import { wordsFive } from "./wordsFive";
import { wordsSix } from "./wordsSix";
import { wordsSeven } from "./wordsSeven";

function App() {
  const allWords = {
    4: wordsFour,
    5: wordsFive,
    6: wordsSix,
    7: wordsSeven,
  };

  const [guessWord, setGuessWord] = useState("");
  const [gameMode, setGameMode] = useState(5);

  const randomGuessWord = () => {
    setGuessWord(
      allWords[gameMode][
        Math.floor(Math.random() * allWords[gameMode].length)
      ].toUpperCase()
    );
  };

  useEffect(() => {
    randomGuessWord();
  }, [gameMode]);

  return (
    <WordleFive
      key={gameMode}
      guessWord={guessWord}
      allWords={allWords}
      gameMode={gameMode}
      setGameMode={setGameMode}
      randomGuessWord={randomGuessWord}
    />
  );
}

export default App;
