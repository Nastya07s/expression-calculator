function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let str = expr.replace(/\s/g, '');
    let operands = [];
    let command = [];
    let letter = '';
    let priority = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
    }
    for (let i = 0; i < str.length; i++) {
        if (Number.isInteger(+str[i])) {
            letter += str[i];
        } else {
            if (letter.length > 0) {
                operands.push(letter);
                letter = '';
            }
            if (str[i] === ')') {
                if (command.includes('(')) {
                    while (command[command.length - 1] !== '(') {
                        operands.push(command.pop());
                    }
                    command.pop();
                } else
                    throw new Error('ExpressionError: Brackets must be paired');
            } else {
                while (command.length > 0 && priority[str[i]] <= priority[command.slice(-1)]) {
                    operands.push(command.pop());
                }
                command.push(str[i])
            }
        }
    }
    if (command.includes('('))
        throw new Error('ExpressionError: Brackets must be paired');
    if (letter.length !== 0)
        operands.push(letter);
    let interResult = operands.concat(command.reverse());
    operands = [];
    let a, b;
    for (let i = 0; i < interResult.length; i++) {
        if (/\d/.test(interResult[i])) {
            operands.push(interResult[i]);
        } else {
            b = operands.pop();
            a = operands.pop();
            operands.push(calc(parseFloat(a), parseFloat(b), interResult[i]))
        }
    }
    return operands[0];
}

function calc(first, second, operand) {
    switch (operand) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second !== 0)
                return first / second
            else
                throw new Error('TypeError: Division by zero.');
    }
}

module.exports = {
    expressionCalculator
}