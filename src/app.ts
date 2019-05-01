import { getRandomInt } from "./numbers";

let squares: NodeList;
let gameOver = false;

let triesRemaining: number = 3;

export function runApp() {
    const secretNumber = getRandomInt(1, 6);
    squares = document.querySelectorAll('.square');
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            sq.dataset.secret = "true";
        }

        sq.addEventListener('click', handleClick);
        currentSquare++;
    })
    let tryAgainButton = document.querySelector('.tryAgainInactive') as HTMLDivElement;
    tryAgainButton.addEventListener('click', playAgainClicked);
}

function playAgainClicked() {
    if (gameOver === true) {
        console.log("You clicked play again!");
    }
}

function handleClick() {
    console.log(`You clicked on ${this}`);
    let tryAgainButton = document.querySelector('.tryAgainInactive') as HTMLDivElement;
    let resultMessage = document.querySelector('.headerMessage') as HTMLHeadingElement;
    const isWinner = this.dataset.secret === 'true';
    const clickedSquare = this;
    if (isWinner) {
        gameOver = true;
        tryAgainButton.classList.add('tryAgainActive');
        resultMessage.innerText = "Winner Winner Chicken Dinner";
        clickedSquare.classList.add('winner');
        squares.forEach((square: HTMLDivElement) => {
            if (square !== clickedSquare) {
                square.classList.add('loser');
                square.removeEventListener('click', handleClick);
            }
        })
    }
    else {
        if (triesRemaining === 1) {
            gameOver = true;
            tryAgainButton.classList.add('tryAgainActive');
            resultMessage.innerText = "You Stink!"
            squares.forEach((square: HTMLDivElement) => {
                square.classList.add('loser');
                square.removeEventListener('click', handleClick);
            })
        }
        triesRemaining -= 1;
        console.log(`You have ${triesRemaining} tries left.`)
        clickedSquare.classList.add('loser');
    }
}
