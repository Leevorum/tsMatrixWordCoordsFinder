const initialString = "QLGNAEKIRNRIGEAE";

["Q", "L", "G", "N"];
["A", "E", "K", "I"];
["R", "N", "R", "I"];
["G", "E", "A", "E"];

function coordsFinder(initialString: string, queryString: string) {
  const matrixArray: string[][] = matrixCreate(initialString);

  const savedCoords: { firstCoord: number; secondCoord: number }[] = [];
  let findedCharsCount = 0;
  let topCoord: string;
  let leftCoord: string;
  let rightCoord: string;
  let bottomCoord: string;

  for (let i = 0; i < queryString.length; i += 1) {
    for (let k = 0; k < queryString.length; k += 1) {
      //Try to find the first character in matrix
      if (matrixArray[i][k] === queryString[findedCharsCount]) {
        findedCharsCount += 1;

        savedCoords.push({ firstCoord: i, secondCoord: k });

        //When we find the first, we check next character with rule:
        //every next character of word can be placed just in the neighbor cell: on the top, on the bottom,
        // or on the left or on the right from the cell with previous character

        for (let j = findedCharsCount; j < queryString.length; j += 1) {
          //Teake coords of the last charater we add
          const currentCoord = savedCoords[j - 1];

          //Check coords, we make "" default coords if they can't exist
          if (currentCoord.firstCoord === 0) {
            topCoord = "";
          } else {
            topCoord =
              matrixArray[currentCoord.firstCoord - 1][
                currentCoord.secondCoord
              ];
          }

          if (currentCoord.secondCoord === 0) {
            leftCoord = "";
          } else {
            leftCoord =
              matrixArray[currentCoord.firstCoord][
                currentCoord.secondCoord - 1
              ];
          }
          if (currentCoord.secondCoord === queryString.length - 1) {
            rightCoord = "";
          } else {
            rightCoord =
              matrixArray[currentCoord.firstCoord][
                currentCoord.secondCoord + 1
              ];
          }
          if (currentCoord.firstCoord === queryString.length - 1) {
            bottomCoord = "";
          } else {
            bottomCoord =
              matrixArray[currentCoord.firstCoord + 1][
                currentCoord.secondCoord
              ];
          }

          //Save coords
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
              console.log(
                `We can't find this ${queryString[j]} character in matrix`
              );
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

//Create array of matrix
function matrixCreate(initialString: string) {
  //create array of string from string
  const stringToArray = initialString.split("");
  //Take one array length
  const arrayItemLength: number = Math.sqrt(stringToArray.length);

  const matrixArray: string[][] = [];

  for (let i = 0; i < arrayItemLength; i += 1) {
    matrixArray.push(
      stringToArray.slice(
        i * arrayItemLength,
        i * arrayItemLength + arrayItemLength
      )
    );
  }

  return matrixArray;
}

coordsFinder(initialString, "KING");
const coords = coordsFinder(initialString, "KING");
