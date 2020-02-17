import { LETTERS } from "./letters";

const getLetterWeightTotal = letters =>
  Object.keys(letters).reduce((sum, letter) => sum + letters[letter].weight, 0);

const findRandomLetter = (letters, randomNumber) =>
  Object.keys(letters).reduce(
    (tracker, letter) => {
      if (
        tracker.number - letters[letter].weight <= 0 &&
        !tracker.returnValue
      ) {
        tracker.returnValue = letter;
      } else {
        tracker.number = tracker.number - letters[letter].weight;
      }
      return tracker;
    },
    {
      number: randomNumber,
      returnValue: ""
    }
  );

const returnRandomLetter = () => {
  const weightTotal = getLetterWeightTotal(LETTERS);
  const randomSample = Math.floor(Math.random() * weightTotal);
  return findRandomLetter(LETTERS, randomSample);
};

const setInitialLetters = totalLetters =>
  [...Array(totalLetters)].map(_ => ({
    value: returnRandomLetter().returnValue,
    selected: false
  }));

const makeWord = letters => letters.map(letter => letter.value).join("");

const getWordScore = letters =>
  letters.reduce((score, letter) => LETTERS[letter.value].points + score, 0);

const checkForDuplication = (list, selectedWord) =>
  list.every(listItem => makeWord(listItem.word) !== selectedWord);

export {
  returnRandomLetter,
  setInitialLetters,
  makeWord,
  getWordScore,
  checkForDuplication
};
