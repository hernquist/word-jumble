import React from "react";
import { LETTERS } from "../letters";

const ShowSelectedLetters = ({ selectedLetters = [] }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: "20px 0 0 0",
      width: "413px"
    }}
  >
    {selectedLetters.map((letter, i) => (
      <div
        key={"showSelectedLetters" + i}
        style={{
          fontSize: "32px",
          border: "1.5px solid cornflowerBlue",
          padding: "8px 8px 0",
          margin: "4px 4px 0",
          borderRadius: "8px",
          minWidth: "32px",
          textTransform: "uppercase",
          background: "orange"
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

export default ShowSelectedLetters;
