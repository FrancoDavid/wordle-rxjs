export class Paragraph {
    paragraph;

    constructor() {
        this.paragraph = document.querySelector("h2");
    }

    clean() {
        this.paragraph.textContent = "";
    }

    updated(text) {
        this.paragraph.textContent = text;
    }
}