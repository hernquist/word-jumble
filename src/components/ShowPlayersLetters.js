import React from "react";
import { LETTERS } from "../letters";

const updateLetters = (letters, index) =>
  letters.map((letter, i) =>
    i === index ? { ...letter, selected: !letter.selected } : letter
  );

const ShowPlayersLetters = ({
  letters = [],
  setLetters,
  pushSelectedLetter
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "spaceBetween"
    }}
  >
    {letters.map((letter, i) => (
      <div
        key={"showPlayersLetters" + i}
        style={{
          fontSize: "32px",
          border: "1.5px solid cornflowerBlue",
          padding: "8px 8px 0",
          margin: "4px 4px 0",
          borderRadius: "8px",
          minWidth: "32px",
          textTransform: "uppercase",
          visibility: letter.selected ? "hidden" : "visible",
          background: "orange"
        }}
        onClick={() => {
          setLetters(updateLetters(letters, i));
          pushSelectedLetter(letter);
        }}
      >
        {letter.value}
        <div
          style={{
            fontSize: "12px",
            position: "relative",
            left: "16px",
            bottom: "12px"
          }}
        >
          {LETTERS[letter.value].points}
        </div>
      </div>
    ))}
  </div>
);

export default ShowPlayersLetters;
