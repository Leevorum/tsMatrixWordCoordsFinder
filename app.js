"use strict";
const form = document.querySelector(".find_form");
const stringField = document.getElementById("stringField");
const wordField = document.getElementById("wordField");
const result = document.querySelector(".result");
const formData = {
    stringField: "",
    wordField: "",
};
stringField.addEventListener("input", () => {
    formData.stringField = stringField.value;
});
wordField.addEventListener("input", () => {
    formData.wordField = wordField.value;
});
form.addEventListener("submit", onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if (formData.stringField === "" || formData.wordField === "") {
        return alert("Please fill in all the fields!");
    }
    const resultCoords = coordsFinder(formData.stringField, formData.wordField);
    const textCoords = resultCoords.map((item) => {
        return `(${item.firstCoord.toString()}, ${item.secondCoord.toString()})=>`;
    });
    result.textContent = textCoords.toString();
    form.reset();
    formData.stringField = "";
    formData.wordField = "";
}
function coordsFinder(initialString, queryString) {
    const matrixArray = matrixCreate(initialString);
    const savedCoords = [];
    let findedCharsCount = 0;
    let topCoord;
    let leftCoord;
    let rightCoord;
    let bottomCoord;
    for (let i = 0; i < queryString.length; i += 1) {
        for (let k = 0; k < queryString.length; k += 1) {
            if (matrixArray[i][k] === queryString[findedCharsCount]) {
                findedCharsCount += 1;
                savedCoords.push({ firstCoord: i, secondCoord: k });
                for (let j = findedCharsCount; j < queryString.length; j += 1) {
                    const currentCoord = savedCoords[j - 1];
                    if (currentCoord.firstCoord === 0) {
                        topCoord = "";
                    }
                    else {
                        topCoord =
                            matrixArray[currentCoord.firstCoord - 1][currentCoord.secondCoord];
                    }
                    if (currentCoord.secondCoord === 0) {
                        leftCoord = "";
                    }
                    else {
                        leftCoord =
                            matrixArray[currentCoord.firstCoord][currentCoord.secondCoord - 1];
                    }
                    if (currentCoord.secondCoord === queryString.length - 1) {
                        rightCoord = "";
                    }
                    else {
                        rightCoord =
                            matrixArray[currentCoord.firstCoord][currentCoord.secondCoord + 1];
                    }
                    if (currentCoord.firstCoord === queryString.length - 1) {
                        bottomCoord = "";
                    }
                    else {
                        bottomCoord =
                            matrixArray[currentCoord.firstCoord + 1][currentCoord.secondCoord];
                    }
                    switch (queryString[j]) {
                        case topCoord:
                            savedCoords.push({
                                firstCoord: currentCoord.firstCoord - 1,
                                secondCoord: currentCoord.secondCoord,
                            });
                            break;
                        case leftCoord:
                            savedCoords.push({
                                firstCoord: currentCoord.firstCoord,
                                secondCoord: currentCoord.secondCoord - 1,
                            });
                            break;
                        case rightCoord:
                            savedCoords.push({
                                firstCoord: currentCoord.firstCoord,
                                secondCoord: currentCoord.secondCoord + 1,
                            });
                            break;
                        case bottomCoord:
                            savedCoords.push({
                                firstCoord: currentCoord.firstCoord + 1,
                                secondCoord: currentCoord.secondCoord,
                            });
                            break;
                        default:
                            console.log(`We can't find this ${queryString[j]} character in matrix`);
                    }
                }
                return savedCoords;
            }
        }
    }
    if (savedCoords.length === 0) {
        console.log("We can't find this word");
    }
    return savedCoords;
}
function matrixCreate(initialString) {
    const stringToArray = initialString.split("");
    const arrayItemLength = Math.sqrt(stringToArray.length);
    const matrixArray = [];
    for (let i = 0; i < arrayItemLength; i += 1) {
        matrixArray.push(stringToArray.slice(i * arrayItemLength, i * arrayItemLength + arrayItemLength));
    }
    return matrixArray;
}
