import { Board } from "./board";
import { Paragraph } from "./paragraph";
import { Word } from "./word";

export class Wordle {

    userAttempts;
    userMaxAttempts;
    userMaxLetters;
    userLetters;
    
    isWinner;

    paragraph;
    board;

    wordCorrect;

    constructor() {
        this.userAttempts = 0;
        this.userMaxAttempts = 6;
        this.userMaxLetters = 5;

        this.isWinner = false;

        this.userLetters = [];

        this.paragraph = new Paragraph();
        this.board = new Board();
        this.wordCorrect = new Word();
    }

    whriteBoard(letter) {
        if (this.stillMissingLetters()) {
            this.userLetters.push(letter);
            
            this.board.writeSquare(this.userAttempts, this.userLetters.length - 1, letter);
            this.paragraph.clean();
        }
    }

    deleteBoard() {
        if (this.stillExistsLetters()) {
            this.userLetters.pop();
            this.board.deleteSquare(this.userAttempts, this.userLetters.length);
        }
    }

    continueGame() {
        return (this.userAttempts < this.userMaxAttempts) && !this.isWinner;  
    }

    stillMissingLetters() {
        return this.userLetters.length < this.userMaxLetters;
    }

    stillExistsLetters() {
        return this.userLetters.length > 0;
    }

    turnsOver() {
        return this.userAttempts >= this.userMaxAttempts;
    }

    endGame() {
        
        if (this.stillMissingLetters()) {
            this.paragraph.updated(`Your missing ${this.userMaxLetters - this.userLetters.length} letters`);
            return;
        }

        if (this.wordCorrect.verication(this.userLetters.join(""))) {

            this.board.paintSquareWinner(this.userAttempts, this.userLetters.length);
            this.paragraph.updated("Congratulations you won!");
            this.isWinner = true;

        } else {
            
            const correctWordArray = this.wordCorrect.word.split("");

            this.board.paintSquareLoser(this.userAttempts, this.userLetters, correctWordArray);

            this.userLetters.length = 0;
            this.userAttempts++;

            if (this.turnsOver()) {
                this.paragraph.updated("You lost, You have exhausted your attempts");
            }
        }
    }

    resetGame() {
        this.board.cleanSquares(this.userMaxAttempts);
        this.paragraph.clean();

        this.userAttempts = 0;
        this.userLetters.length = 0;

        this.isWinner = false;

        this.wordCorrect.reset();
    }
}