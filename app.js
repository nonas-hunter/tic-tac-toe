let board = [];

const generateBoard = (size) => {
    let playArea = document.createElement("div");
    playArea.setAttribute("class", `play-area-${size*3}x${size*3}`);
    for (let boardNum = 0; boardNum < size**2; boardNum++) {
        let newBoard = [];
        for (let rowNum = 0; rowNum < 3; rowNum++) {
            let newRow = [];
            for (let colNum = 0; colNum < 3; colNum++) {
                newRow.push(boardNum);
                let block = document.createElement("div");
                block.setAttribute("id", `block-${(9 * boardNum) + (3 * rowNum) + colNum}`);
                block.setAttribute("class", `block-${size*3}x${size*3}`);
                playArea.appendChild(block);
            }
            newBoard.push(newRow);
        }
        board.push(newBoard);
    }
    let container = document.getElementById("game");
    container.innerHTML = ""
    container.appendChild(playArea);
    document.body.appendChild(container);
}

generateBoard(3)
console.log(board.length)