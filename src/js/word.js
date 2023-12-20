import { WORDS } from "./words";

export class Word {
    word;

    constructor() {
        this.word = this.assign();
        console.log(this.word);
    }

    assign() {
        return WORDS.words[Math.floor(Math.random() * 26)].toUpperCase();
    }

    reset() {
        this.word = this.assign();
    }

    verication(text) {
        return this.word === text;
    }
 }