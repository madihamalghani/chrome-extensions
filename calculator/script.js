const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach((button) => {
    const action = button.getAttribute('data-action');
    const value = button.getAttribute('data-value');

    button.addEventListener('click', () => {
        if (action === 'clear') {
            clearDisplay();
        } else if (action === 'append') {
            appendToDisplay(value);
        } else if (action === 'backspace') {
            backspace();
        } else if (action === 'calculate') {
            calculateResult();
        }
    });
});

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        
        if (!display.value.trim()) {
            throw new Error("Please enter a valid expression.");
        }

        
        if (display.value.includes("/0")) {
            throw new Error("Cannot divide by zero.");
        }

        
        const result = evaluateExpression(display.value); 

        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation.");
        }

        
        display.value = result;
    } catch (error) {
        
        display.value = error.message;
    }
}



function evaluateExpression(expression) {
    let tokens = expression.split(/([+\-*/])/); // Split numbers and operators
    let total = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let nextNumber = parseFloat(tokens[i + 1]);

        if (operator === '+') total += nextNumber;
        else if (operator === '-') total -= nextNumber;
        else if (operator === '*') total *= nextNumber;
        else if (operator === '/') total /= nextNumber;
    }

    return total;
}
