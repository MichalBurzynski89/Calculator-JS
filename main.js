const calcResult = document.querySelector('.result');
const numbers = [...document.querySelectorAll('.number')];
const mathSymbols = [...document.querySelectorAll('.math-symbol')];

let equation = [0];

let firstNumber = calcResult.textContent;
let secondNumber = '';

numbers.forEach(number => {
    number.addEventListener('click', function () {
        if (!calcResult.textContent.match(/[^0-9, .]/)) {
            if (firstNumber.length < 16) {
                firstNumber !== '0' ? firstNumber += this.textContent : firstNumber = this.textContent;
                equation[0] = Number(firstNumber);
                calcResult.textContent = firstNumber;
            }
        } else {
            if (secondNumber.length < 16) {
                secondNumber !== '0' ? secondNumber += this.textContent : secondNumber = this.textContent;
                equation[1] = Number(secondNumber);
                if (calcResult.textContent.split(' ')[2] !== '0') {
                    calcResult.textContent += secondNumber[secondNumber.length - 1];
                } else {
                    calcResult.textContent = calcResult.textContent.slice(0, calcResult.textContent.length - 1);
                    calcResult.textContent += secondNumber;
                }
            }
        }
    });
});

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

function math() {
    let mathSymbol = calcResult.textContent.split(' ')[1];
    if (!mathSymbol) {
        calcResult.textContent += ` ${this.textContent} `;
    } else if (secondNumber.length !== 0) {
        if (mathSymbol === '/') {
            if (equation[1] === 0) {
                alert('Nie można dzielić przez 0!');
                location.reload();
            } else {
                calcResult.textContent = equation[0] / equation[1] + ` ${this.textContent} `;
                equal();
            }
        } else if (mathSymbol === '*') {
            calcResult.textContent = equation[0] * equation[1] + ` ${this.textContent} `;
            equal();
        } else if (mathSymbol === '-') {
            calcResult.textContent = equation[0] - equation[1] + ` ${this.textContent} `;
            equal();
        } else if (mathSymbol === '+') {
            calcResult.textContent = equation[0] + equation[1] + ` ${this.textContent} `;
            equal();
        }
    } else {
        calcResult.textContent = calcResult.textContent.replace(mathSymbol, this.textContent);
    }
}

mathSymbols.forEach(mathSymbol => mathSymbol.addEventListener('click', math));

function equal() {
    firstNumber = calcResult.textContent.split(' ')[0];
    secondNumber = '';
    equation = [Number(firstNumber)];
}

document.querySelector('.equal').addEventListener('click', function () {
    let mathSymbol = calcResult.textContent.split(' ')[1];
    if (mathSymbol === '/') {
        if (equation[1] === 0) {
            alert('Nie można dzielić przez 0!');
            location.reload();
        } else {
            calcResult.textContent = equation[0] / equation[1];
            equal();
        }
    } else if (mathSymbol === '*') {
        calcResult.textContent = equation[0] * equation[1];
        equal();
    } else if (mathSymbol === '-') {
        calcResult.textContent = equation[0] - equation[1];
        equal();
    } else if (mathSymbol === '+') {
        calcResult.textContent = equation[0] + equation[1];
        equal();
    }
});

document.querySelector('.clear').addEventListener('click', function () {
    calcResult.textContent = '0';
    firstNumber = calcResult.textContent;
    secondNumber = '';
    equation = [0];
});