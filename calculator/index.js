


function calculator() {
    let history = [];

    function add(a, b) {
        const result = a + b;
        history.push({ operation: 'add', inputs: [a, b], result })
        return result;
    }

    function sub(a, b) {
        const result = a - b;
        history.push({ operation: 'sub', inputs: [a, b], result })

        return result;
    }

    function mul(a, b) {
        const result = a * b;
        history.push({ operation: 'mul', inputs: [a, b], result })

        return result;
    }

    function div(a, b) {
        if (b == 0) {
            throw console.error("Division by zero is not allowed");

        }
        const result = a / b;
        history.push({ operation: 'div', inputs: [a, b], result })

        return result;
    }

    function getHistory() {
        return history;
    }

    function clearHistory() {
        history = [];
    }


    return { add, sub, mul, div, getHistory, clearHistory };
}

const calc = calculator();

calc.add(2, 3);       // 5
calc.mul(4, 5);       // 20
calc.sub(10, 2);      // 8
calc.div(9, 3);       // 3

console.log(calc.getHistory());
[
    { operation: "add", inputs: [2, 3], result: 5 },
    { operation: "mul", inputs: [4, 5], result: 20 },
    { operation: "sub", inputs: [10, 2], result: 8 },
    { operation: "div", inputs: [9, 3], result: 3 }
]

calc.clearHistory();
console.log(calc.getHistory()); // []
