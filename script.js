const display = document.getElementById('display');
let shouldResetDisplay = false;

function appendNumber(number) {
    if (display.value === '0' || shouldResetDisplay) {
        resetDisplay();
    }
    display.value += number;
}

function appendOperator(operator) {
    if (shouldResetDisplay) shouldResetDisplay = false;
    
    // Prevent adding sequential operators
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else if (display.value !== '') {
        display.value += operator;
    }
}

function appendDecimal() {
    if (shouldResetDisplay) resetDisplay();
    if (display.value === '') display.value = '0';
    
    // Split by operators to check if the current number already has a decimal
    const parts = display.value.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];
    
    if (!currentNumber.includes('.')) {
        display.value += '.';
    }
}

function clearDisplay() {
    display.value = '';
    shouldResetDisplay = false;
}

function resetDisplay() {
    display.value = '';
    shouldResetDisplay = false;
}

function calculate() {
    if (display.value === '') return;
    
    try {
        // Use a safe, contained evaluation context instead of global eval()
        const expression = display.value;
        const result = new Function(`return ${expression}`)();
        
        if (result === Infinity || isNaN(result)) {
            display.value = "Error";
        } else {
            // Fix floating point math issues (e.g., 0.1 + 0.2 = 0.300000004)
            display.value = Number(Math.round(result + 'e12') + 'e-12');
        }
        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
}
