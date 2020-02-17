import React, { useState, useEffect } from "react";
import { number } from "prop-types";
import axios from "axios";
import { get } from "lodash";
import {
  setInitialLetters,
  makeWord,
  getWordScore,
  checkForDuplication
} from "../utils";
import ShowCheckedWords from "./ShowCheckedWords";
import ShowPlayersLetters from "./ShowPlayersLetters";
import ShowSelectedLetters from "./ShowSelectedLetters";

const getWordFromResponse = response => get(response, ["data", "0"]);

const Game = ({ numberOfLetters }) => {
  const [letters, setLetters] = useState(setInitialLetters(numberOfLetters));
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showCheckedWords, setShowCheckedWords] = useState([]);
  const [wordFromApi, setWordFromApi] = useState("");
  const [gameScore, setGameScore] = useState(0);

  const [initialTimeDone, setInitialTimeDone] = useState(
    new Date().getTime() + 60000
  );

  const calculateTimeLeft = () => initialTimeDone - new Date().getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const pushSelectedLetter = letter =>
    setSelectedLetters([...selectedLetters, letter]);

  const resetLetterStatuses = letters =>
    letters.map(letter => ({ ...letter, selected: false }));

  const checkWord = async () => {
    const selectedWord = makeWord(selectedLetters);

    const query = `https://api.datamuse.com/words?sp=${selectedWord}&max=1`;

    await axios
      .get(query)
      .then(response => {
        setWordFromApi(getWordFromResponse(response));
        return response;
      })
      .then(response => {
        console.log(response);

        let word = "";
        let score = 0;
        const wordData = getWordFromResponse(response);

        if (wordData) {
          word = wordData.word;
          score = wordData.score;
        }

        const success = word === selectedWord && word.length > 2 && score > 500;

        if (!checkForDuplication(showCheckedWords, selectedWord)) {
          console.log("SAME!");
          // setInitialTimeDone(initialTimeDone - 5000);
        } else {
          setShowCheckedWords([
            ...showCheckedWords,
            { success, word: selectedLetters }
          ]);

          if (success) {
            const wordScore = getWordScore(selectedLetters);
            setGameScore(gameScore + wordScore);
          } else {
            setInitialTimeDone(initialTimeDone - 5000);
          }
        }
        setSelectedLetters([]);
      })
      .catch(error => console.log(error));

    setLetters(resetLetterStatuses(letters));
  };

  const reset = () => {
    setSelectedLetters([]);
    setWordFromApi({});
  };

  const time = timeLeft > 0 ? `${Math.floor(timeLeft / 1000)}s` : " ";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px 0 0 0"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "center",
          alignItems: "center"
          // margin: "40px 0 0 0"
        }}
      >
        <div style={{ margin: "0 20px", fontSize: "32px" }}>-{time}-</div>
        <ShowPlayersLetters
          letters={letters}
          setLetters={setLetters}
          pushSelectedLetter={pushSelectedLetter}
        />
        <div style={{ margin: "0 20px", fontSize: "32px" }}>-{gameScore}-</div>
      </div>
      <ShowCheckedWords showCheckedWords={showCheckedWords} />
      <ShowSelectedLetters selectedLetters={selectedLetters} />
      <button style={{ margin: "10px 0" }} onClick={checkWord}>
        SELECT WORD
      </button>
      <button style={{ margin: "10px 0" }} onClick={reset}>
        CLEAR
      </button>
    </div>
  );
};

Game.propTypes = {
  numberOfLetters: number
};

Game.defaultProps = {
  numberOfLetters: 7
};

export default Game;
