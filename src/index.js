import { WordleGame } from "./js/wordle";

document.addEventListener('DOMContentLoaded', () => {
    console.log('initialized app wordle');
    var wordle = new WordleGame();
    wordle.oninit();
});