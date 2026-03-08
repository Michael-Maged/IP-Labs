let display = document.getElementById('display');
let current = '0';
let operator = null;
let operand = null;
let resetNext = false;

function updateDisplay() {
    display.textContent = current;
}

function clear() {
    current = '0';
    operator = null;
    operand = null;
    resetNext = false;
    updateDisplay();
}

function inputNumber(num) {
    if (resetNext) {
        current = num;
        resetNext = false;
    } else {
        if (current === '0') {
            current = num;
        } else {
            current += num;
        }
    }
    updateDisplay();
}

function inputDot() {
    if (resetNext) {
        current = '0.';
        resetNext = false;
    } else if (!current.includes('.')) {
        current += '.';
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator && !resetNext) {
        calculate();
    }
    operand = parseFloat(current);
    operator = op;
    resetNext = true;
}

function calculate() {
    if (!operator || operand === null) return;
    let num = parseFloat(current);
    switch (operator) {
        case 'add':
            current = (operand + num).toString();
            break;
        case 'subtract':
            current = (operand - num).toString();
            break;
        case 'multiply':
            current = (operand * num).toString();
            break;
        case 'divide':
            current = num === 0 ? 'Error' : (operand / num).toString();
            break;
    }
    operator = null;
    operand = null;
    resetNext = true;
    updateDisplay();
}

function percent() {
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
}

function doubleZero() {
    if (current !== '0') {
        current += '00';
        updateDisplay();
    }
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (!isNaN(action)) {
            inputNumber(action);
        } else if (action === 'dot') {
            inputDot();
        } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            setOperator(action);
        } else if (action === 'equal') {
            calculate();
        } else if (action === 'clear') {
            clear();
        } else if (action === 'percent') {
            percent();
        } else if (action === 'doublezero') {
            doubleZero();
        }
    });
});

clear();
