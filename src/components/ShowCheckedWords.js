import React from "react";
import { LETTERS } from "../letters";

const ShowCheckedWords = ({ showCheckedWords = [] }) =>
  showCheckedWords.map((checkedWord, i) => (
    <div
      key={"checkedWord" + i}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "spaceBetween",
        margin: "20px 0 0 0"
      }}
    >
      {checkedWord.word.map((letter, i) => (
        <div
          key={"ShowCheckedWords" + i}
          style={{
            fontSize: "32px",
            border: "1.5px solid cornflowerBlue",
            padding: "8px 8px 0",
            margin: "4px 4px 0",
            borderRadius: "8px",
            minWidth: "32px",
            textTransform: "uppercase",
            background: checkedWord.success ? "lime" : "red"
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
  ));

export default ShowCheckedWords;
