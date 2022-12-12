const x = 'x-mark';
const cricle = 'cricle-mark';
const winningComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const currentPlayerTextElement = document.querySelector('[data-player]');
const winningElement = document.querySelector('[data-winning-box]');
const winningMassageTextElement = document.querySelector('[data-winning-massage]');
const xScoreTextElement = document.querySelector('[data-x-score]');
const oScoreTextElement = document.querySelector('[data-o-score]');
const playAgainButton = document.querySelector('[data-play-again-button]');
let xTurn = true;
let currentPlayer = xTurn ? 'X' : 'O';

let xScore = 0;
let oScore = 0;
let prevWinner
// console.log(xTurn);

startGame()
setHover();

// cellElement.forEach(cell => {
//   cell.addEventListener('click', handleClick, { once: true});
// })
playAgainButton.addEventListener('click', startGame)

function startGame() {
  xTurn = true;
  board.classList.remove(x)
  board.classList.remove(cricle)
  winningElement.classList.remove('show')

  if(prevWinner == 'X'){
    board.classList.add(cricle)
    xTurn = false;
  }else {
    board.classList.add(x)
  }
  currentPlayer = xTurn ? 'X' : 'O'
  document.body.style.backgroundColor = xTurn ? '#ff9191' : '#0059ffa5' ;
  currentPlayerTextElement.innerText = `${currentPlayer} Turn`
  prevWinner;
  
  cellElement.forEach(cell => {
    cell.classList.remove(x)
    cell.classList.remove(cricle);
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true});
  })
}

function handleClick(e) {
  const currentMark = xTurn ? x : cricle;
  const cell = e.target
  placeMark(cell, currentMark);
  if(checkWins(currentMark)) {
    endGame(false);
  }else if(isdraw()){
    endGame(true)
  }else {
    swapTurn();
    setHover();
  }
}

function placeMark(cell, currentMark) {
  cell.classList.add(currentMark);
}

function endGame(draw) {
  if(draw) {
    winningMassageTextElement.innerText = `it's Draw`
  }else{
    winningMassageTextElement.innerText = `${xTurn ? "X" :" O"} Wins`
    updateDisplay()
  }
  winningElement.classList.add('show');
}

function isdraw(){
  return [...cellElement].every(cell => {
    return cell.classList.contains(x) || cell.classList.contains(cricle)
  })
}

function updateDisplay() {
  xTurn ? xScore++ : oScore++;
  prevWinner = xTurn ? 'X' : 'O';
  xScoreTextElement.innerText = xScore;
  oScoreTextElement.innerText = oScore;
}

function setHover() {
  board.classList.remove(x);
  board.classList.remove(cricle);
  if(xTurn){
    board.classList.add(x);
  }else {
    board.classList.add(cricle);
  }
}

function swapTurn() {
  xTurn = !xTurn;
  currentPlayer = xTurn ? 'X' : 'O'
  document.body.style.backgroundColor = xTurn ? '#ff9191' : '#0059ffa5' ;
  currentPlayerTextElement.innerText = `${currentPlayer} Turn`
}

function checkWins(currentMark) {
  return winningComb.some(comb => {
    return comb.every(index => {
      return cellElement[index].classList.contains(currentMark);
    })
  })
}