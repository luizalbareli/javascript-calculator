'use strict';

let display = document.querySelector('#display'),
    history = document.querySelector('#history'),
    // Defining buttons
    btnKeyA = document.querySelector('#clearAll'),
    btnClearLast = document.querySelector('#clear'),
    btnDigit7 = document.querySelector('#seven'),
    btnDigit8 = document.querySelector('#eight'),
    btnDigit9 = document.querySelector('#nine'),
    btnDivide = document.querySelector('#divide'),
    btnDigit4 = document.querySelector('#four'),
    btnDigit5 = document.querySelector('#five'),
    btnDigit6 = document.querySelector('#six'),
    btnMultiply = document.querySelector('#multiply'),
    btnDigit1 = document.querySelector('#one'),
    btnDigit2 = document.querySelector('#two'),
    btnDigit3 = document.querySelector('#three'),
    btnSubtract = document.querySelector('#subtract'),
    btnDigit0 = document.querySelector('#zero'),
    btnPeriod = document.querySelector('#dot'),
    btnEqual = document.querySelector('#equal'),
    btnSum = document.querySelector('#sum'),
    // Prevent from cleaning calculated numbers
    enableClearLast = false,
    // Prevent from calculating when there's an error or not a number in display
    enableOperation = true;

// Replace noscript message with greetings
history.textContent = '',
    display.textContent = 'Welcome to Albareli\'s calculator!';

window.addEventListener('load', () => AssignEventListeners());

function appendToDisplay(value) {
    if (enableOperation && !enableClearLast) history.textContent = '';
    enableClearLast ? display.textContent += value : display.textContent = value;
    enableClearLast = true;
    enableOperation = value !== '.' ? true : false;
}

function operation(operator) {
    if (validateNumber(display.textContent) && enableOperation) {
        updateHistory();
        history.textContent += ' ' + operator + ' ';
        enableClearLast = false;
        enableOperation = false;
    }
}

function calculate() {
    if (validateNumber(display.textContent) && history.textContent !== '' && enableClearLast) {
        updateHistory();
        history.textContent += ' ';
        try {
            // Throw error when display have a division by zero, except 0.X
            if (history.textContent.includes('/ 0 ')) {
                display.textContent = 'Error';
            } else {
                let result = eval(history.textContent);
                display.textContent = result;
            }
            
            history.textContent += '=';
            enableClearLast = false;
        } catch (error) {
            display.textContent = 'Error';
            console.error(error);
        }
        enableClearLast = false;
        enableOperation = true;
    }
}

function clearLast() {
    if (enableClearLast) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function clearAll() {
    display.textContent = '';
    history.textContent = '';
}

function updateHistory() {
    history.textContent.includes('=') ?
        history.textContent = display.textContent : history.textContent += (display.textContent - 0);
}

function validateNumber(number) {
    return !isNaN(number) && number.length !== 0;
}

function simulateClickAnimation(element) {
    element.classList.remove('applyClickButton');
    /* This is just for update the element on screen,
     otherwise the animation only runs once. */
    void element.offsetWidth;
    element.classList.add('applyClickButton');
}

function AssignEventListeners() {
    // Assign Event listeners for clicking on buttons
    btnKeyA.addEventListener('click', () => { clearAll() });
    btnClearLast.addEventListener('click', () => { clearLast() });
    btnDigit7.addEventListener('click', () => { appendToDisplay('7') });
    btnDigit8.addEventListener('click', () => { appendToDisplay('8') });
    btnDigit9.addEventListener('click', () => { appendToDisplay('9') });
    btnDivide.addEventListener('click', () => { operation('/') });
    btnDigit4.addEventListener('click', () => { appendToDisplay('4') });
    btnDigit5.addEventListener('click', () => { appendToDisplay('5') });
    btnDigit6.addEventListener('click', () => { appendToDisplay('6') });
    btnMultiply.addEventListener('click', () => { operation('*') });
    btnDigit1.addEventListener('click', () => { appendToDisplay('1') });
    btnDigit2.addEventListener('click', () => { appendToDisplay('2') });
    btnDigit3.addEventListener('click', () => { appendToDisplay('3') });
    btnSubtract.addEventListener('click', () => { operation('-') });
    btnDigit0.addEventListener('click', () => { appendToDisplay('0') });
    btnPeriod.addEventListener('click', () => { appendToDisplay('.') });
    btnEqual.addEventListener('click', () => { calculate() });
    btnSum.addEventListener('click', () => { operation('+') });

    // Event listeners for keyboard input
    document.addEventListener('keydown', function (event) {
        // Allow update page, full screen mode and inspect HTML
        if (!['F5', 'F11', 'F12'].includes(event.key)) event.preventDefault();

        let key = event.key,
            code = event.code;

        // Assign actions based on the typed button
        if (validateNumber(key) || key === '.' || key.toLowerCase() === 'a') {
            eval('btn' + code).click();
            simulateClickAnimation(eval('btn' + code));
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            let operation = '';

            switch (key) {
                case '+':
                    operation = 'Sum';
                    break;
                case '-':
                    operation = 'Subtract';
                    break;
                case '*':
                    operation = 'Multiply';
                    break;
                case '/':
                    operation = 'Divide';
                    break;
            }

            eval('btn' + operation).click();
            simulateClickAnimation(eval('btn' + operation));
        } else if (key === 'Enter' || key === '=') {
            btnEqual.click();
            simulateClickAnimation(btnEqual);
        } else if (key === 'Backspace' || key.toLowerCase() === 'c') {
            btnClearLast.click();
            simulateClickAnimation(btnClearLast);
        }
    });
}