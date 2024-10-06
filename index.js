const CalculatorBox = document.getElementById("Calculator");
const NumberPad = document.getElementById("NumberPad");
const OperationPad = document.getElementById("OperationPad");
const Pad = document.getElementById("Pad");
const InputBox = document.getElementById("CalculatorInputField");
const Zero = document.getElementById("Zero");
const Equal = document.getElementById("Equal");
const CurrOperation = document.getElementById("CurrentOperation");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let digitsEntered = 0
let MAX_DIGITS_ALLOWED = 10
let dotWasPressed = false;


document.addEventListener("keydown", (event) => {
    if(event.key >= 0 && event.key <= 9) {
        buttonClickedAddToDisplayBox(event.key)
        return
    }

    if(event.key == 'C') {
        clearCalculator();
        return;
    }

    if(event.key == '.') {
        dotPressed();
        return;
    }

    if(event.key == 'Enter') {
        calculateResult();
        return;
    }

    let opArr = ["+", "-", "*", "/", "%"];
    for(let i = 0; i < opArr.length; ++i) {
        if(event.key == opArr[i]) {
            setOperator(event.key)
            return
        }
    }

})

function createNumButtons() {
    for (let i = 1; i < 10; ++i) {
        const num = document.createElement("button");
        num.classList.add("NumberButton");
        num.textContent = `${i}`;
        num.addEventListener("click", () => buttonClickedAddToDisplayBox(i));
        NumberPad.appendChild(num);
    }

    const num = document.createElement("button")
    num.classList.add("NumberButton");
    num.textContent = "0"
    num.addEventListener("click", () => buttonClickedAddToDisplayBox(0));
    Zero.appendChild(num);

    createOperatorButtons();
}

function buttonClickedAddToDisplayBox(number) {
    if (waitingForSecondNumber) {
        InputBox.textContent = '';
        digitsEntered = 0
        waitingForSecondNumber = false;
    }

    if(InputBox.textContent == '' && number === 0) { 
        return
    }

    if(digitsEntered > MAX_DIGITS_ALLOWED) {
        return
    }

    InputBox.textContent += number;
    ++digitsEntered
}

function createOperatorButtons() {
    const operatorArr = ["+", "-", "*", "/", "%"];

    for(let i = 0; i < operatorArr.length; ++i) {
        const operator = document.createElement("button");
        operator.classList.add("OperatorButton");
        operator.textContent = operatorArr[i];
        operator.addEventListener("click", () => setOperator(operatorArr[i]));
        OperationPad.appendChild(operator);
    }

    const clearButton = document.createElement("button");
    clearButton.classList.add("OperatorButton");
    clearButton.textContent = "C";
    clearButton.addEventListener("click", () => clearCalculator());
    OperationPad.appendChild(clearButton);

    const equalsButton = document.createElement("button");
    equalsButton.classList.add("OperatorButton");
    equalsButton.textContent = "=";
    equalsButton.addEventListener("click", () => calculateResult());
    Equal.appendChild(equalsButton);

    const dotButton = document.createElement("button");
    dotButton.classList.add("OperatorButton");
    dotButton.textContent = "."
    dotButton.addEventListener("click", () => dotPressed());
    OperationPad.appendChild(dotButton);
}

function setOperator(op) {
    if (firstNumber == null) {
        firstNumber = parseFloat(InputBox.textContent);
    } else if (operator) {
        calculateResult();
    }
    operator = op;
    waitingForSecondNumber = true;

    CurrOperation.textContent = `${firstNumber} ${operator}`;
}

function calculateResult() {
    const secondNumber = parseFloat(InputBox.textContent);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        InputBox.textContent = "baNaNa";
        return;
    }

    let result = firstNumber

    switch(operator) {
        case "+":
            result += secondNumber;
            break;
        case "-":
            result -= secondNumber;
            break;
        case "*":
            result *= secondNumber;
            break;
        case "/":
            result /= secondNumber;
            break;
        case "%":
            result %= secondNumber;
            break;
    }

    InputBox.textContent = result;
    firstNumber = result;

    operator = null;
    waitingForSecondNumber = false;
    digitsEntered = firstNumber.length;
    dotWasPressed = firstNumber.toString().includes(".");
    CurrOperation.textContent = "";
}

function clearCalculator() {
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    InputBox.textContent = '';
    digitsEntered = 0
    dotWasPressed = false;
    CurrOperation.textContent = "";
}

function dotPressed() {
    if(dotWasPressed) {
        return
    }

    if(InputBox.textContent == "") {
        InputBox.textContent = "0."
        dotWasPressed = true;
        return
    }

    InputBox.textContent += "."
    dotWasPressed = true;
}

createNumButtons();
