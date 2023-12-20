import { View } from "./js/view";
import { WordleGame } from "./js/wordle";

document.addEventListener('DOMContentLoaded', () => {
    console.log('initialized app wordle');
    // var wordle = new WordleGame();
    // wordle.oninit();

    const game = new View();

    game.onInit();
});