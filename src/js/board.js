export class Board {
    board;

    constructor() {
        this.board = document.querySelectorAll(".row");
    }

    writeSquare(y, x, letter) {
        const row = this.board[y]
        const square = row.children[x];
        
        square.textContent = letter;
    }

    deleteSquare(y, x) {
        const row = this.board[y]
        const square = row.children[x];
        
        square.textContent = "";
    }

    paintSquareWinner(y, x) {
        for (let i = 0; i < x; i++) {
            const row = this.board[y];
            const square = row.children[i];

            square.classList.add("square-success")
        }
    }

    paintSquareLoser(y, letters, word) {

        for (let i = 0; i < letters.length; i++) {
            const row = this.board[y];
            const square = row.children[i];

            if (word.includes(letters[i])) {

                if (letters[i] === word[i]) {
                    square.classList.add("square-success");
                } else {
                    square.classList.add("square-warning");
                }
            
            } else {
                square.classList.add("square-error");
            }
        }
    }

    cleanSquares(limit) {
        for (let y = 0; y < limit; y++) {
            const row = this.board[y];
            
            for (let x = 0; x < row.children.length; x++) {
                const square = row.children[x];
                square.textContent = "";
                square.classList.remove("square-success", "square-error", "square-warning");
            }
        }
    }
}