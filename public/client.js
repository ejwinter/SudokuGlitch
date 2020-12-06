// client-side js
// run by the browser each time your view template referencing it is loaded

const sodokuSize = 4;

// define variables that reference elements on our page
const inputSodoku = document.forms[0];

function randomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function areDistinct(indices, array){
  var values = indices.map(i => array[i]);
  console.debug(indices);
  console.debug(values);
  var unique = values.filter(onlyUnique);
  return unique.length === array.length;
}

function isValidSolution(inputPuzzle){
  for(let row = 0; row < sodokuSize; row++){
    const rowIndices = [];
    for(let col = 0; col < sodokuSize; col++){
      rowIndices.push(row*sodokuSize + col);
    }
    if(!areDistinct(rowIndices, inputPuzzle)){
      return false;
    }
  }
  for(let col = 0; col < sodokuSize; col++){
    const colIndices = [];
    for(let row = 0; row < sodokuSize; row++){
      colIndices.push(col + (row*sodokuSize));
    }
    if(!areDistinct(colIndices, inputPuzzle)){
      return false;
    }
  }
  //TODO identify the sodokuSize blocks
  return true;
}

function createRandomSolutuion(inputPuzzle){
  let rando = [];
  for(let i = 0; i < inputPuzzle.length; i++){
    if(inputPuzzle[i]){
      rando.push(inputPuzzle[i]);
    }else{
      rando.push(randomInt(1,sodokuSize));
    }
  }
  return rando;
}

/**
 * Takes an input sodoku array and finds all solutions to that input.  It returns all solutions.
 
 * @input inputPuzzle is the input pizzle.  It will be a one dimensional array
          with the first n elements being the first row where n is the size of
          sodoku puzzle
 * @returns the array of solutions
 */
const solveSodoku = function(inputPuzzle) {
  //TODO currently just returns back the input as the only solution
  const solution = {};
  solution.startTime = new Date();
  solution.iterations = 0;
  let currentSolution;
  do {
    currentSolution = createRandomSolutuion(inputPuzzle);
    solution.iterations++;
  }while(!isValidSolution(currentSolution))
  solution.puzzle = currentSolution;
  solution.endTime = new Date();
  return solution;
};

// listen for the form to be submitted and add a new dream when it is
inputSodoku.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault();
    
    let inputCells = document.querySelectorAll("input[name^='input[']");
    let inputValues = Array.from(inputCells)
      .map(c => c.value)
      .map(c => (c.trim().length == 0 || isNaN(c)) ? undefined: parseInt(c)) ;
  
    console.log(inputValues);
    var solution = solveSodoku(inputValues);
    console.log(solution);
};
