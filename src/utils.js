import { letters } from "./letters";

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
  const weightTotal = getLetterWeightTotal(letters);
  const randomSample = Math.floor(Math.random() * weightTotal);
  return findRandomLetter(letters, randomSample);
};

const setInitialLetters = totalLetters =>
  [...Array(totalLetters)].map(_ => ({
    value: returnRandomLetter().returnValue,
    selected: false
  }));

export { returnRandomLetter, setInitialLetters };
