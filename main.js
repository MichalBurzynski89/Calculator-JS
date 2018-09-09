const calcResult = document.querySelector('.result');
const numbers = [...document.querySelectorAll('.number')];
const mathSymbols = [...document.querySelectorAll('.math-symbol')];

let equation = [0];

let firstNumber = calcResult.textContent;
let secondNumber = '';

numbers.forEach(number => {
    number.addEventListener('click', function () {
        if (!calcResult.textContent.match(/[^0-9, .]/)) {
            firstNumber !== '0' ? firstNumber += this.textContent : firstNumber = this.textContent;
            equation[0] = Number(firstNumber);
            calcResult.textContent = firstNumber;
        } else {
            secondNumber !== '0' ? secondNumber += this.textContent : secondNumber = this.textContent;
            equation[1] = Number(secondNumber);
            if (calcResult.textContent.split(' ')[2] !== '0') {
                calcResult.textContent += secondNumber[secondNumber.length - 1];
            } else {
                calcResult.textContent = calcResult.textContent.replace(calcResult.textContent[calcResult.textContent.length - 1], this.textContent);
            }
        }
    });
});

function math() {
    if (!(calcResult.textContent.indexOf(this.textContent) > -1)) {
        calcResult.textContent += ` ${this.textContent} `;
        mathSymbols.forEach(mathSymbol => mathSymbol.removeEventListener('click', math));
    }
}

mathSymbols.forEach(mathSymbol => mathSymbol.addEventListener('click', math));

document.querySelector('.point').addEventListener('click', function () {
    if (!calcResult.textContent.match(/[^0-9, .]/)) {
        if (!(firstNumber.indexOf(this.textContent) > -1)) {
            firstNumber += this.textContent;
            calcResult.textContent = firstNumber;
        }
    } else {
        if (!(secondNumber.indexOf(this.textContent) > -1)) {
            if (secondNumber === '') {
                secondNumber = '0.';
                calcResult.textContent += secondNumber;
                equation[1] = 0;
            } else {
                secondNumber += this.textContent;
                calcResult.textContent += secondNumber[secondNumber.length - 1];
            }
        }
    }
});

document.querySelector('.clear').addEventListener('click', function () {
    calcResult.textContent = '0';
    firstNumber = calcResult.textContent;
    secondNumber = '';
    equation = [0];
    mathSymbols.forEach(mathSymbol => mathSymbol.addEventListener('click', math));
});