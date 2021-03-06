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
        } else {
          setShowCheckedWords([
            { success, word: selectedLetters },
            ...showCheckedWords
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
    setLetters(resetLetterStatuses(letters));
  };

  const time = timeLeft > 0 ? `${Math.floor(timeLeft / 1000)}s` : " ";
  const lowOnTime = timeLeft < 5000 && timeLeft > 0;

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
          alignItems: "center"
        }}
      >
        <div
          style={{
            margin: "0 20px",
            fontSize: "32px",
            color: lowOnTime ? "red" : "black",
            width: "100px"
          }}
        >
          -{time}-
        </div>
        <ShowPlayersLetters
          letters={letters}
          setLetters={setLetters}
          pushSelectedLetter={pushSelectedLetter}
        />
        <div style={{ margin: "0 20px", fontSize: "32px", width: "100px" }}>
          -{gameScore}-
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "80px"
        }}
      >
        <button
          style={{
            margin: "auto 10px",
            height: "30px",
            borderRadius: "5px",
            width: "95px"
          }}
          disabled={timeLeft < 0}
          onClick={checkWord}
        >
          SELECT WORD
        </button>
        <ShowSelectedLetters selectedLetters={selectedLetters} />
        <button
          style={{
            margin: "auto 10px",
            height: "30px",
            borderRadius: "5px",
            width: "95px"
          }}
          disabled={timeLeft < 0}
          onClick={reset}
        >
          CLEAR
        </button>
      </div>
      <ShowCheckedWords showCheckedWords={showCheckedWords} />
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
