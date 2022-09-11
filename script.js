const INPUT              = document.getElementById("input");
const SOLUTION           = document.getElementById("solution");
const BUTTON             = document.getElementById("button");
const RADIOINPUTCHOOSER  = document.getElementById("radio11")
const RADIOOUTPUTCHOOSER = document.getElementById("radio11O")
const OPBASECHOOSER      = document.getElementById("radioOp11")
const OPERATIONSINPUT    = document.getElementById("operationsinput")
const DELETEBUTTON       = document.getElementById("clear")

const ADDITION       = (x, y) => { return x + y }
const SUBTRACTION    = (x, y) => { return x - y }
const MULTIPLICATION = (x, y) => { return x * y }
const DIVISION       = (x, y) => { return x / y }

let inputChooser     = null;
let outputChooser    = null;
let operationChooser = null;

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


RADIOINPUTCHOOSER.addEventListener("click", () => { 

    if (inputChooser == null){
        inputChooser = document.createElement("input");
        inputChooser.setAttribute("id", "basechooser")
        inputChooser.setAttribute("placeholder", "enter a number");

        document.getElementById("divchooser1").appendChild(inputChooser);
    }

})

RADIOOUTPUTCHOOSER.addEventListener("click", () => { 

    if (outputChooser == null){
        outputChooser = document.createElement("input");
        outputChooser.setAttribute("id", "basechooserO")
        outputChooser.setAttribute("placeholder", "enter a number");

        document.getElementById("divchooser2").appendChild(outputChooser);
    }

})

OPBASECHOOSER.addEventListener("click", () => { 

    if (operationChooser == null){
        operationChooser = document.createElement("input");
        operationChooser.setAttribute("id", "basechooser")
        operationChooser.setAttribute("placeholder", "enter a number");

        document.getElementById("divchooser3").appendChild(operationChooser);
    }

})

DELETEBUTTON.addEventListener("click", () => { 
    const ELEMENTS = document.getElementsByClassName("calculations");
    while(ELEMENTS.length > 0) {
        ELEMENTS[0].parentNode.removeChild(ELEMENTS[0]);
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// ON BUTTON PRESS // ON BUTTON PRESS // ON BUTTON PRESS // ON BUTTON PRESS // ON BUTTON PRESS //
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

BUTTON.addEventListener("click", () => {

    let inputInBase10  = 0;
    let inputNumber = INPUT.value;
    let operandInBase10  = 0;
    let operandNumber = OPERATIONSINPUT.value;
    let solutionInBase10 = 0;

    let inputArray = Array.from(inputNumber.toString()).map(Number);
    if (inputArray == "") {
        let newLine = document.createElement("p");
        newLine.setAttribute("class", "calculations");
        newLine.innerHTML = `please enter a valid input`;
        SOLUTION.appendChild(newLine);
        return;   
    }

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

    let radioOpSelect = document.querySelector('input[name="opbaseselect"]:checked').value;
    if (radioOpSelect == 0) { 
        radioOpSelect = document.getElementById("opbaseselect").value;
    }
    if (radioOpSelect > 10) {
        return;
    }    

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONVERSION // NO ARITHMETIC // CONVERSION // NO ARITHMETIC // CONVERSION // NO ARITHMETIC // CONVERSION //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (document.querySelector('input[name="operations"]:checked').value == "convert") {

        for (let i = 0; i < inputArray.length; i++) {

            if (inputArray[i] >= radioSelection) {
                let newLine = document.createElement("p");
                newLine.setAttribute("class", "calculations");
                newLine.innerHTML = `Not a valid input, as ${inputArray[i]} is outside the scope of the chosen base.`;
                SOLUTION.appendChild(newLine);
                return;        
            }
            else if (radioSelection == radioOutput) {
                let newLine = document.createElement("p");
                newLine.setAttribute("class", "calculations");
                newLine.innerHTML = `(${inputNumber})${radioSelection.sub()} = (${inputNumber})${radioOutput.sub()}`;
                SOLUTION.appendChild(newLine);
                return;
            }

            inputInBase10 += (inputArray[i] * Math.pow(radioSelection, inputArray.length - i - 1));

        }

        let solutionArray = [];
        let remainder = inputInBase10;
        while (remainder > 0) {
            newDigitForArray = remainder % radioOutput;
            solutionArray.unshift(newDigitForArray);
            remainder = Math.trunc(remainder / radioOutput);
        }

        let convertedInteger = 0;
        for (let i = solutionArray.length - 1; i >= 0; i--) {
            convertedInteger += solutionArray[i] * Math.pow(10, (solutionArray.length - 1 - i));
        }

    
        let newLine = document.createElement("p");
        newLine.setAttribute("class", "calculations");
        newLine.innerHTML = `(${inputNumber})${radioSelection.sub()} = (${convertedInteger})${radioOutput.sub()}`;
        SOLUTION.appendChild(newLine);
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ARITHMETIC // ARITHMETIC // ARITHMETIC // ARITHMETIC // ARITHMETIC // ARITHMETIC // ARITHMETIC // ARITHMETIC //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else {

        let operandArray = Array.from(operandNumber.toString()).map(Number);

        if (operandArray == "") {
            let newLine = document.createElement("p");
            newLine.setAttribute("class", "calculations");
            newLine.innerHTML = `please enter a valid operand`;
            SOLUTION.appendChild(newLine);
            return;   
        }

        let operation = null;

        if (document.querySelector('input[name="operations"]:checked').value == "add") {
            operation = ADDITION;
            opString = "+";
        }
        if (document.querySelector('input[name="operations"]:checked').value == "sub") {
            operation = SUBTRACTION;
            opString = "-";
        }
        if (document.querySelector('input[name="operations"]:checked').value == "mult") {
            operation = MULTIPLICATION;
            opString = "*";
        }
        if (document.querySelector('input[name="operations"]:checked').value == "divide") {
            operation = DIVISION;
            opString = "/";
        }

        if (radioSelection == radioOutput == radioOpSelect) {
            let calculatedInteger = operation(inputNumber, OPERATIONSINPUT.value)
            let newLine = document.createElement("p");
            newLine.setAttribute("class", "calculations");
            newLine.innerHTML = `(${inputNumber})${radioSelection.sub()} ${opString} (${OPERATIONSINPUT.value})${radioOutput.sub()} = ${calculatedInteger}`;
            SOLUTION.appendChild(newLine);
            return;
            }    

        for (let i = 0; i < inputArray.length; i++) {

            if (inputArray[i] >= radioSelection) {
                let newLine = document.createElement("p");
                newLine.setAttribute("class", "calculations");
                newLine.innerHTML = `Not a valid input`;
                SOLUTION.appendChild(newLine);
                return;    
            }

            inputInBase10 += (inputArray[i] * Math.pow(radioSelection, inputArray.length - i - 1));
        }

        for (let j = 0; j < operandArray.length; j++) {

            if (operandArray[j] >= radioOpSelect) {
                let newLine = document.createElement("p");
                newLine.setAttribute("class", "calculations");
                newLine.innerHTML = `Not a valid input`;
                SOLUTION.appendChild(newLine);
                return;    
            }  

            operandInBase10 += (operandArray[j] * Math.pow(radioOpSelect, operandArray.length - j - 1));

        }

        solutionInBase10 = operation(inputInBase10, operandInBase10);

        let solutionArray = [];
        let remainder = solutionInBase10;
        while (remainder > 0) {
            newDigitForArray = remainder % radioOutput;
            solutionArray.unshift(newDigitForArray);
            remainder = Math.trunc(remainder / radioOutput);
        }

        let convertedInteger = 0;
        for (let i = solutionArray.length - 1; i >= 0; i--) {
            convertedInteger += solutionArray[i] * Math.pow(10, (solutionArray.length - 1 - i));
        }

    
        let newLine = document.createElement("p");
        newLine.setAttribute("class", "calculations");
        newLine.innerHTML = `(${inputNumber})${radioSelection.sub()} ${opString} (${OPERATIONSINPUT.value})${radioOpSelect.sub()} = (${convertedInteger})${radioOutput.sub()}`;
        SOLUTION.appendChild(newLine);
    }
})