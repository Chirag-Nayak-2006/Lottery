const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    // parseFloat("str") => NaN
    // pareseFloat converts into number
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = (totalLines) => {
  while (true) {
    const lines = prompt(
      `Enter a number of lines to bet on amount (1-${totalLines}): `
    );
    // parseFloat("str") => NaN
    // pareseFloat converts into number
    const numberOfLines = parseFloat(lines);
    if (
      isNaN(numberOfLines) ||
      numberOfLines <= 0 ||
      numberOfLines > totalLines
    ) {
      console.log(`Invalid number of lines, try again.`);
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, numberOfLines) => {
  while (true) {
    const bet = prompt(
      `Enter the bet per line (1-${balance / numberOfLines}): `
    );
    // parseFloat("str") => NaN
    // pareseFloat converts into number
    const numberBet = parseFloat(bet);
    if (
      isNaN(numberBet) ||
      numberBet <= 0 ||
      numberBet > balance / numberOfLines
    ) {
      console.log(`Invalid bet, try again.`);
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols]; // copies symbols array into this array
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      reels[i].push(reelSymbols.splice(randomIndex, 1)[0]);
    }
  }
  return reels;
};

const transpose = (array) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(array[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = row.join(" | ");
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    if (new Set(symbols).size === 1) {
      winnings += bet * [SYMBOL_VALUES[symbols[0]]];
      console.log(bet * [SYMBOL_VALUES[symbols[0]]]);
    } else {
      winnings += bet * -1;
      console.log(bet * -1);
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    let numberOfLines = getNumberOfLines(3);
    const bet = getBet(balance, numberOfLines);
    let reels = spin();
    let transposed = transpose(reels);
    printRows(transposed);
    let winnings = getWinnings(transposed, bet, numberOfLines);
    balance += winnings;
    console.log(
      `Your winnings are ${winnings}\nAnd your new balance is ${balance}`
    );
    if (balance <= 0) {
      console.log("You ran out of money");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();
