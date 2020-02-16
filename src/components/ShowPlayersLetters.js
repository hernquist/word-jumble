import React from "react";

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
          padding: "8px",
          margin: "4px",
          borderRadius: "3px",
          minWidth: "32px",
          textTransform: "uppercase",
          background: letter.selected ? "lime" : "orange"
        }}
        onClick={() => {
          setLetters(updateLetters(letters, i));
          pushSelectedLetter(letter);
        }}
      >
        {letter.value}
      </div>
    ))}
  </div>
);

export default ShowPlayersLetters;
