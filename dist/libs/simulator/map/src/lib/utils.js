"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomData = void 0;
function generateRandomData() {
    // Generate two random words of random lengths between 1 and 10 characters
    const word1 = generateRandomWord();
    const word2 = generateRandomWord();
    // Concatenate the number and words with '<br>' separator
    const randomData = `${word1}<br>${word2}`;
    return {
        data: randomData, metadata: `${randomData}<br>Z3 t350 PPN p350<br>OSMOB h..m...<br>134.765<br>V<br>@h221@k260 @m.77@36`,
    };
}
exports.generateRandomData = generateRandomData;
// Function to generate a random word of random length between 1 and 10 characters
function generateRandomWord() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const wordLength = Math.floor(Math.random() * 10) + 1;
    let word = "";
    for (let i = 0; i < wordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        word += characters[randomIndex];
    }
    return word;
}
//# sourceMappingURL=utils.js.map