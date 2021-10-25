const PERSON = "X"
const COMPUTER = "O"
const EMPTY = ""
const SCORES = {
    X: -1,
    O: 1,
    TIE: 0
}

let board = [];
let currentBoard = 0;
let currentPlayer = PERSON;

const gameLoop = () => {
    renderBoard();
    if (checkGameOver() == PERSON) {
        document.getElementById("winner").innerText = "YOU WON"
    } else if (checkGameOver() == COMPUTER) {
        document.getElementById("winner").innerText = "COMPUTER WON"
    } else if (checkGameOver() == "TIE") {
        document.getElementById("winner").innerText = "TIE GAME"
    }

    switchCurrentPlayer();

    if (currentPlayer === COMPUTER) {
        makeComputerMove();
    }
}

const switchCurrentPlayer = () => {
    if (currentPlayer === COMPUTER) {
        currentPlayer = PERSON;
    } else {
        currentPlayer = COMPUTER;
    }
}

const checkGameOver = () => {
    if (checkWinner(PERSON)) {
        return PERSON
    } else if (checkWinner(COMPUTER)) {
        return COMPUTER
    } else if (checkBoardFull()) {
        return "TIE"
    } else {
        return null
    }
}

const generateBoard = (size) => {
    board = [];
    currentPlayer = PERSON;
    let playArea = document.createElement("div");
    playArea.setAttribute("class", `play-area`);
    for (let boardNum = 0; boardNum < size**2; boardNum++) {
        let newBoard = [];
        for (let rowNum = 0; rowNum < 3; rowNum++) {
            let newRow = [];
            for (let colNum = 0; colNum < 3; colNum++) {
                newRow.push(EMPTY);
                let block = document.createElement("div");
                block.setAttribute("onclick", `makePersonMove(${boardNum}, ${rowNum}, ${colNum})`)
                block.setAttribute("id", `block-${(9 * boardNum) + (3 * rowNum) + colNum}`);
                block.classList.add("block");
                if (rowNum == 0) {block.classList.add("block-top");}
                if (rowNum == 2) {block.classList.add("block-bottom");}
                if (colNum == 0) {block.classList.add("block-left");}
                if (colNum == 2) {block.classList.add("block-right");}
                playArea.appendChild(block);
            }
            newBoard.push(newRow);
        }
        board.push(newBoard);
    }
    let container = document.getElementById("game");
    container.innerHTML = "";
    
    
    let winner = document.createElement("h2");
    let button = document.createElement("button");
    winner.setAttribute("id", "winner");
    button.setAttribute("onclick", "generateBoard(1)");
    button.innerText = "RESET BUTTON";

    container.appendChild(playArea);
    container.appendChild(winner);
    container.appendChild(button);
}

const renderBoard = () => {
    for (let boardNum = 0; boardNum < board.length; boardNum++) {
        for (let rowNum = 0; rowNum < 3; rowNum++) {
            for (let colNum = 0; colNum < 3; colNum++) {
                let block = document.getElementById(`block-${(9 * boardNum) + (3 * rowNum) + colNum}`);
                let text = board[boardNum][rowNum][colNum];
                if (text === "X" || text === "O") {
                    block.classList.add("occupied");
                    block.setAttribute("onclick", "");
                }
                block.innerHTML = text;
            }
        }
    }
}

const makePersonMove = (boardNum, rowNum, colNum) => {
    if (currentPlayer === PERSON) {
        board[boardNum][rowNum][colNum] = PERSON;
        gameLoop();
    }
}

const minimax = (board, depth, isMaximizing) => {
    let result = checkGameOver();
    if (result != null) {
        let score = SCORES[result]
        return {score: score, row: null, col: null}
    }

    let bestMove = {row: null, col: null};
    let bestScore;

    let nextPlayer;

    if (isMaximizing) {
        nextPlayer = COMPUTER;
        bestScore = -Infinity;
    } else {
        nextPlayer = PERSON;
        bestScore = Infinity;
    }

    for (let rowNum = 0; rowNum < 3; rowNum++) {
        for (let colNum = 0; colNum < 3; colNum++) {
            if (board[currentBoard][rowNum][colNum] === EMPTY) {
                board[currentBoard][rowNum][colNum] = nextPlayer;
                let score = minimax(board, depth + 1, !isMaximizing).score;
                board[currentBoard][rowNum][colNum] = EMPTY;
                if ((isMaximizing && score > bestScore) || (!isMaximizing && score < bestScore)) {
                    bestScore = score
                    bestMove = {row: rowNum, col: colNum}
                }
            }
        }
    }

    return {score: bestScore, row: bestMove.row, col: bestMove.col}

}

const makeComputerMove = () => {
    if (currentPlayer === COMPUTER) {
        let bestMove = minimax(board, 0, true);
        console.log(bestMove)
        board[currentBoard][bestMove.row][bestMove.col] = COMPUTER;
        gameLoop();
    }
}

const checkWinner = (player) => {
    for (let boardNum = 0; boardNum < board.length; boardNum++) {
        let winBoard = Array.from({length: 3}, (_, rowNum) => Array.from({length: 3}, (_, colNum) => board[boardNum][rowNum][colNum] === player));
        return ((winBoard[0][0] && winBoard[0][1] && winBoard[0][2])
                || (winBoard[1][0] && winBoard[1][1] && winBoard[1][2])
                || (winBoard[2][0] && winBoard[2][1] && winBoard[2][2])
                || (winBoard[0][0] && winBoard[1][0] && winBoard[2][0])
                || (winBoard[0][1] && winBoard[1][1] && winBoard[2][1])
                || (winBoard[0][2] && winBoard[1][2] && winBoard[2][2])
                || (winBoard[0][0] && winBoard[1][1] && winBoard[2][2])
                || (winBoard[0][2] && winBoard[1][1] && winBoard[2][0]));
    }
}

const checkBoardFull = () => {
    for (let boardNum = 0; boardNum < board.length; boardNum++) {
        for (let rowNum = 0; rowNum < 3; rowNum++) {
            for (let colNum = 0; colNum < 3; colNum++) {
                if (board[boardNum][rowNum][colNum] === "") {return false;}
            }
        }
    }
    return true;
}

generateBoard(1)