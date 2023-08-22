const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const hexagrams = [
"111111", "000000", "010001", "100010", "010111", "111010", "000010", "010000",
    "110111", "111011", "000111", "111000", "111101", "101111", "000100", "001000",
    "011001", "100110", "000011", "110000", "101001", "100101", "100000", "000001",
    "111001", "100111", "100001", "011110", "010010", "101101", "011100", "001110",
    "111100", "001111", "101000", "000101", "110101", "101011", "010100", "001010",
    "100011", "110001", "011111", "111110", "011000", "000110", "011010", "010110",
    "011101", "101110", "001001", "100100", "110100", "001011", "001101", "101100",
    "110110", "011011", "110010", "010011", "110011", "001100", "010101", "101010"];

const hexagramNumber = (hexagram) => {
    return hexagrams.indexOf(hexagram.join("")) + 1;
};

const formatLine = (line) => (line === 0 ? " _ _" : "____");

const generateHexagrams = () => {
    const initial = hexagrams[Math.floor(Math.random() * hexagrams.length)].split("").map(Number);
    const resulting = hexagrams[Math.floor(Math.random() * hexagrams.length)].split("").map(Number);

    const changing = initial.map((line, index) => (line !== resulting[index] ? index + 1 : 0)).filter(line => line !== 0);

    const formattedInitial = initial.map(formatLine).join(",");
    const formattedResulting = resulting.map(formatLine).join(",");

    const initialHexagramNumber = hexagramNumber(initial);
    const resultingHexagramNumber = hexagramNumber(resulting);

    return {
        initialHexagram: formattedInitial,
        resultingHexagram: formattedResulting,
        changingLines: changing,
        initialHexagramNumber,
        resultingHexagramNumber
    };
};

app.get('/generate', (req, res) => {
    const result = generateHexagrams();
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


