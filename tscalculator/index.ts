interface History {
    operation: 'add' | 'sub' | 'div' | 'mul';
    inputs: [number, number]
    result: number
}

function calculator() {
    let history: History[] = [];

    function add(a: number, b: number) {
        const result = a + b;
        history.push({ operation: "add", inputs: [a, b], result });
        return result;

    }
    function div(a: number, b: number) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        const result = a / b;
        history.push({ operation: "div", inputs: [a, b], result });
        return result;

    }

    function mul(a: number, b: number) {
        const result = a * b;
        history.push({ operation: "mul", inputs: [a, b], result });
        return result;

    }

    function sub(a: number, b: number) {
        const result = a - b;
        history.push({ operation: "sub", inputs: [a, b], result });
        return result;

    }
    function getHistory(): History[] {
        return history;
    }

    function clearHistory(): void {
        history = [];
    }
    return { add, sub, mul, div, getHistory, clearHistory };

}