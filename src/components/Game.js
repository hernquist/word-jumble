import React, { useState } from "react";
import { number } from "prop-types";
import axios from "axios";
import { get } from "lodash";
import { setInitialLetters } from "../utils";
import ShowPlayersLetters from "./ShowPlayersLetters";
import ShowSelectedLetters from "./ShowSelectedLetters";

const getWordFromReponse = repsonse => get(repsonse, ["data", "0"]);

const Game = ({ numberOfLetters }) => {
  const [letters, setLetters] = useState(setInitialLetters(numberOfLetters));
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [wordFromApi, setWordFromApi] = useState("");

  const pushSelectedLetter = letter =>
    setSelectedLetters([...selectedLetters, letter]);

  const resetLetterStatuses = letters =>
    letters.map(letter => ({ ...letter, selected: false }));

  const checkWord = async () => {
    const selectedWord = selectedLetters.map(letter => letter.value).join("");

    const query = `https://api.datamuse.com/words?sp=${selectedWord}&max=1`;

    await axios
      .get(query)
      .then(response => setWordFromApi(getWordFromReponse(response)))
      .catch(error => console.log(error));

    setLetters(resetLetterStatuses(letters));
  };

  const reset = () => {
    setSelectedLetters([]);
    setWordFromApi({});
  };

  console.log("HENRY");

  console.log(wordFromApi);
  console.log(selectedLetters.map(letter => letter.value).join(""));

  const success =
    wordFromApi.word === selectedLetters.map(letter => letter.value).join("") &&
    wordFromApi.word.length > 2;

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
      <ShowPlayersLetters
        letters={letters}
        setLetters={setLetters}
        pushSelectedLetter={pushSelectedLetter}
      />
      <ShowSelectedLetters selectedLetters={selectedLetters} />
      <button onClick={checkWord}>SELECT WORD</button>
      {success && <div>SUCCESS</div>}
      <button onClick={reset}>RESET</button>
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
