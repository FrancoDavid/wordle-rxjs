const { fromEvent } = require("rxjs");
const  { filter, map } = require("rxjs/operators");

export class WordleGame {

    onKeyDown$;
    attemps;
    maxAttempts;
    inputWords;

    constructor() {
        this.onKeyDown$ = fromEvent(document, "keydown");
        this.attemps = 0;
        this.maxAttempts = 6;
        this.inputWords = [];
    };

    oninit() {
        console.log("oninit");
        this.presskey();
        this.cleanwords();
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
                })
            )
            .subscribe({
                next: function (result) {
                    console.log(result);
                    const positionxInput = this$.inputWords.length;
                    const positionyInput = this$.attemps;

                    const rows = document.querySelectorAll(".row");
                    const rowInput = rows[positionyInput].children[positionxInput];
                    
                    rowInput.textContent = result;
                    this$.inputWords.push(result);
                    console.log(this$.inputWords);
                }
            });
    }

    cleanwords() {
        let this$ = this;
        this.onKeyDown$
            .pipe(
                filter(function(event) {
                    return event.key === "Backspace";
                })
            )
            .subscribe({
                next: function (event) {
                    console.log('Backspace', this$.inputWords);

                    const positionxInput = this$.inputWords.length - 1;
                    const positionyInput = this$.attemps;

                    console.log(positionxInput);

                    const rows = document.querySelectorAll(".row");
                    const rowInput = rows[positionyInput].children[positionxInput];
                    console.log(rowInput);
                    rowInput.textContent = '';
                    this$.inputWords.pop();

                }
            })
    }

}