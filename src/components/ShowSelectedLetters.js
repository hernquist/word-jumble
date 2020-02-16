import React from "react";

const ShowSelectedLetters = ({ selectedLetters = [] }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "spaceBetween",
      margin: "20px 0 0 0"
    }}
  >
    {selectedLetters.map((letter, i) => (
      <div
        key={"showSelectedLetters" + i}
        style={{
          fontSize: "32px",
          border: "1.5px solid cornflowerBlue",
          padding: "8px",
          margin: "4px",
          borderRadius: "3px",
          minWidth: "32px",
          textTransform: "uppercase",
          background: "orange"
        }}
      >
        {letter.value}
      </div>
    ))}
  </div>
);

export default ShowSelectedLetters;
