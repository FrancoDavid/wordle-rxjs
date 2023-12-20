import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

import { Wordle } from "./wordle";


export class View {
    onKeyDown$;
    onClickButton$;

    wordle;

    constructor() {
        this.onKeyDown$ = fromEvent(document, "keydown");
        this.onClickButton$ = fromEvent(document.querySelector("button"), "click");

        this.wordle = new Wordle();
    }

    onInit() {
        this.observerPressKey();
        this.observerPressDelete();
        this.observerPressEnter();
        this.observerPressButton();
    }

    observerPressKey() {
        const this$ = this;

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
                    this$.wordle.whriteBoard(result);
                }
            });
    }

    observerPressDelete() {
        const this$ = this;
        
        this.onKeyDown$
            .pipe(
                filter(function(event) {
                    return event.key === "Backspace";
                })
            )
            .subscribe({
                next: function () {
                    this$.wordle.deleteBoard();
                }
            })
    }

    observerPressEnter() {
        const this$ = this;

        this.onKeyDown$
            .pipe(
                filter(function(event) {
                    return event.key === "Enter";
                })
            )
            .subscribe({
                next: function() {
                    this$.wordle.endGame();
                }
            });
    }

    observerPressButton() {
        const this$ = this;

        this.onClickButton$
            .subscribe({
                next: function() {
                    this$.wordle.resetGame();
                    document.querySelector("button").blur();
                }
            });
    }
}