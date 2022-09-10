const INT_ARR_GREATER_THAN_TEN = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/".split('')

const input = document.getElementById("input");
const solution = document.getElementById("solution");
const button = document.getElementById("button");
const radioInputChooser = document.getElementById("radio11")
const radioOutputChooser = document.getElementById("radio11O")
const radioButtons = document.getElementsByClassName("radios")
let inputChooser = null;
let outputChooser = null;

// FUNCTION DOESNT WORK
// I MESSED UP AND WROTE IT WRONG
// IT SHOULD TAKE A NUMBER,
// PARSE IT'S BASE 10 VALUE USING THE ARRAY,
// AND CONVERT THAT VALUE INTO THE TARGET BASE
function bigBases(givenNumber, givenBase, targetBase) {
    const SET_ARRAY = INT_ARR_GREATER_THAN_TEN.slice(0, givenBase);

    let answerArray = []
    let multiplesOfBase = 0;
    let firstDigit = givenNumber;
    while (givenNumber > givenBase) {
        firstDigit -= givenBase;
        multiplesOfBase++;
    }
    answerArray.unshift(SET_ARRAY[firstDigit]);
    answerArray.unshift(SET_ARRAY[multiplesOfBase]);

    let newLine = document.createElement("p");
    newLine.innerHTML = `${SET_ARRAY} ${answerArray}`;
    solution.appendChild(newLine);

}






radioInputChooser.addEventListener("click", () => { 

    if (inputChooser == null){
        inputChooser = document.createElement("input");
        inputChooser.setAttribute("id", "basechooser")
        inputChooser.setAttribute("placeholder", "enter a number");

        document.getElementById("divchooser1").appendChild(inputChooser);
    }

})

radioOutputChooser.addEventListener("click", () => { 

    if (outputChooser == null){
        outputChooser = document.createElement("input");
        outputChooser.setAttribute("id", "basechooserO")
        outputChooser.setAttribute("placeholder", "enter a number");

        document.getElementById("divchooser2").appendChild(outputChooser);
    }

})

button.addEventListener("click", () => {

    let integerSolution  = 0;
    let inputNumber = input.value;

    let inputArray = Array.from(inputNumber.toString()).map(Number);

    let radioSelection = document.querySelector('input[name="inputselect"]:checked').value;
    if (radioSelection == 0) { 
        radioSelection = document.getElementById("basechooser").value;
    }
    if (radioSelection > 10) {
        return;
    }

    let radioOutput = document.querySelector('input[name="outputselect"]:checked').value;
    if (radioOutput == 0) { 
        radioOutput = document.getElementById("outputselect").value;
    }
    if (radioOutput > 10) {
        return;
    }
    
    for (let i = 0; i < inputArray.length; i++) {

        if (inputArray[i] >= radioSelection) {
            let newLine = document.createElement("p");
            newLine.innerHTML = `Not a valid input, as ${inputArray[i]} is outside the scope of the chosen base.`;
            solution.appendChild(newLine);
            return;        
        }
        else if (radioSelection == radioOutput) {
            let newLine = document.createElement("p");
            newLine.innerHTML = `${inputNumber} in base ${radioSelection} would be ${inputNumber} in base ${radioOutput}.`;
            solution.appendChild(newLine);
            return;
        }
        integerSolution += (inputArray[i] * Math.pow(radioSelection, inputArray.length - i - 1));
    }

    let solutionArray = [];
    let remainder = integerSolution;
    while (remainder > 0) {
        newDigitForArray = remainder % radioOutput;
        solutionArray.unshift(newDigitForArray);
        remainder = Math.trunc(remainder / radioOutput);
    }

    let finalAnswer = 0;
    for (let i = solutionArray.length - 1; i >= 0; i--) {
        finalAnswer += solutionArray[i] * Math.pow(10, (solutionArray.length - 1 - i));
    }

    let newLine = document.createElement("p");
    newLine.innerHTML = `${inputNumber} in base ${radioSelection} would be ${finalAnswer} in base ${radioOutput}.`;
    solution.appendChild(newLine);

})