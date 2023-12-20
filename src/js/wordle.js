import { WORDS } from "./words";

const { fromEvent } = require("rxjs");
const  { filter, map, takeWhile } = require("rxjs/operators");

export class WordleGame {

    onKeyDown$;
    
    attemps;
    maxAttempts;
    inputWords;
    maxLetters;
    correctWord;
    messageElement;
    stateWinner;
    resetButton;
    onClickReset$;

    constructor() {
        this.onKeyDown$ = fromEvent(document, "keydown");
        this.attemps = 0;
        this.maxAttempts = 6;
        this.inputWords = [];
        this.maxLetters = 5;
        this.correctWord = WORDS.words[Math.floor(Math.random() * 26)].toUpperCase();
        this.messageElement = document.querySelector("h2");
        this.stateWinner = false;
        this.resetButton = document.querySelector("button");
        this.onClickReset$ = fromEvent(document.querySelector("button"), "click");
    };

    oninit() {
        console.log("oninit", this.correctWord);
        this.presskey();
        this.cleanwords();
        this.verificationwords();
        this.onreset();
    }

    presskey() {
        let this$ = this;

        this.onKeyDown$
            .pipe(
                filter(function(event) {
                    return (event.key.length === 1 && event.key.match(/[a-z]/i));
                }),
                map(function(event) {
                    return event.key.toUpperCase();
                }),
                takeWhile(function() { 
                    return (this$.attemps < this$.maxAttempts) && !this$.stateWinner;
                })
            )
            .subscribe({
                next: function (result) {
                    const positionxInput = this$.inputWords.length;
                    const positionyInput = this$.attemps;

                
                    if (positionxInput < this$.maxLetters) {
                        const rows = document.querySelectorAll(".row");
                        const rowInput = rows[positionyInput].children[positionxInput];
                        
                        rowInput.textContent = result;
                        this$.inputWords.push(result);
                    }
                    
                    this$.messageElement.textContent = "";
                }
            });
    }

    cleanwords() {
        let this$ = this;
        this.onKeyDown$
            .pipe(
                filter(function(event) {
                    return event.key === "Backspace";
                }),
                takeWhile(function() { 
                    return (this$.attemps < this$.maxAttempts) && !this$.stateWinner;
                })
            )
            .subscribe({
                next: function () {

                    const positionxInput = this$.inputWords.length - 1;
                    const positionyInput = this$.attemps;

                    if (this$.inputWords.length > 0) {
                        const rows = document.querySelectorAll(".row");
                        const rowInput = rows[positionyInput].children[positionxInput];
                        console.log(rowInput);
                        rowInput.textContent = '';
                        this$.inputWords.pop();
                    }
                }
            })
    }

    verificationwords() {
        const this$ = this;
        this.onKeyDown$
            .pipe(
                filter(function(event) {
                    return event.key === "Enter";
                }),
                takeWhile(function() { 
                    return (this$.attemps < this$.maxAttempts) && !this$.stateWinner;
                })
            )
            .subscribe({
                next: function() {

                    const word = this$.inputWords.join("");

                    if (this$.inputWords.length < this$.maxLetters) {
                        this$.messageElement.textContent = `Your missing ${this$.maxLetters - this$.inputWords.length} letters`;
                        return;
                    }

                    if (word === this$.correctWord) {

                        const positionxInput = this$.inputWords.length;
                        const positionyInput = this$.attemps;

                        const rows = document.querySelectorAll(".row");

                        for (let i = 0; i < positionxInput; i++) {
                            const rowInput = rows[positionyInput].children[i];

                            rowInput.classList.add("square-success")
                        }

                        this$.messageElement.textContent = "Congratulations you won!";
                        this$.stateWinner = true;

                    } else {
                        const positionyInput = this$.attemps;

                        const rows = document.querySelectorAll(".row");
                        const correctWordArray = this$.correctWord.split("");

                        for (let i = 0; i < this$.inputWords.length; i++) {
                            if (correctWordArray.includes(this$.inputWords[i])) {
                                if (this$.inputWords[i] === correctWordArray[i]) {
                                    const rowInput = rows[positionyInput].children[i];
                                    rowInput.classList.add("square-success");
                                } else {
                                    const rowInput = rows[positionyInput].children[i];
                                    rowInput.classList.add("square-warning");
                                }
                            
                            } else {
                                const rowInput = rows[positionyInput].children[i];
                                rowInput.classList.add("square-error");
                            }
                        }

                        this$.inputWords.length = 0;
                        this$.attemps++;


                        if (this$.attemps >= this$.maxAttempts) {
                            this$.messageElement.textContent = "You lost, You have exhausted your attempts";
                        }
                    }

                }
            });
    }

    onreset() {
        const this$ = this;
        this.onClickReset$
            .subscribe({
                next: function() {

                    const rows = document.querySelectorAll(".row");

                    for (let y = 0; y < this$.maxAttempts; y++) {
                        const row = rows[y];
                        for (let x = 0; x < row.children.length; x++) {
                            const square = row.children[x];
                            square.textContent = "";
                            square.classList.remove("square-success", "square-error", "square-warning");
                        }
                    }

                    this$.attemps = 0;
                    this$.inputWords.length = 0;
                    this$.messageElement.textContent = "";
                    this$.stateWinner = false;
                    this$.correctWord = WORDS.words[Math.floor(Math.random() * 26)].toUpperCase();

                    this$.resetButton.blur();
                }
            });
    }

}