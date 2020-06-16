import React from 'react'

class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: '0',
            resolved: false
        };

        this.clear = this.clear.bind(this);
        this.addInput = this.addInput.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    clear(event) {

        if ([undefined, 'Delete'].includes(event.key)) {

            this.setState({ input: '0' })
        }

    }

    addInput(event) {

        const OPERATORS = ['*', '/', '+', '-', '.']

        if (![...OPERATORS, undefined, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
            return;
        }

        let input = this.state.input

        let inputLast = input.length - 1

        let val = (event.target.textContent.length === 1) ? event.target.textContent : event.key

        if (input[inputLast - 1] !== undefined) {

            if (input[inputLast] == 0 &&
                input[inputLast - 1].search(/[-+*/]/) !== -1 &&
                val == 0) {

                return;

            }

            if (input[inputLast] == 0 &&
                input[inputLast - 1].search(/[-+*/]/) !== -1 &&
                val !== 0) {

                return this.setState({
                    input: input.slice(0, -1) + val
                })

            }

            if (val === '.') {

                let operatorsArr = [''].concat(input.match(/[-+./*]/g))

                if (operatorsArr[operatorsArr.length - 1] === '.') {

                    return;
                }
            }

            if (val === '-' && OPERATORS.slice(0, 2).includes(input[inputLast])) {

                this.setState({
                    input: input + val,
                })
            }

            if (OPERATORS.includes(val) && OPERATORS.includes(input[inputLast])) {

                return;
            }
        }

        if (input == '0' &&
            !OPERATORS.includes(val) ||
            this.state.resolved &&
            val.search(/\d|[.]/) !== -1
        ) {

            if (val === '.') {

                return this.setState({
                    input: 0 + val,
                    resolved: false
                })
            }

            return this.setState({
                input: val,
                resolved: false
            })
        }

        this.setState({
            input: input + val,
            resolved: false
        })

    };

    resolve(event) {

        if (typeof this.state.input === 'number' || ![undefined, 'Enter'].includes(event.key)) {
            return;
        };

        let inputA = this.state.input.match(/\D|[0-9.]*/g)

        if (['*', '/', '.'].includes(inputA[inputA.length - 2])) {
            inputA.pop()
        }

        inputA.pop()

        let inputB = [];

        let inputResult = 0;

        for (let i = 0; i < inputA.length; i++) {

            switch (inputA[i]) {
                case '*':

                    if ([inputA[i - 2], inputA[i - 3]].includes('*') ||
                        [inputA[i - 2], inputA[i - 3]].includes('/')) {

                        let last = inputB.slice(-1,)[0]

                        if (inputA[i + 1] === '-') {

                            inputB.pop()

                            inputB.push(-(inputA[i + 2]) * last)

                            break;

                        } else {

                            inputB.pop()

                            inputB.push(inputA[i + 1] * last)

                        }

                        break;

                    } else {

                        if (inputA[i + 1] === '-') {

                            inputB.push(-(inputA[i - 1]) * inputA[i + 2]);

                        } else {

                            inputB.push(inputA[i - 1] * inputA[i + 1]);

                        }
                    }

                    break;

                case '/':

                    if ([inputA[i - 2], inputA[i - 3]].includes('*') ||
                        [inputA[i - 2], inputA[i - 3]].includes('/')) {

                        let last = inputB.slice(-1,)[0]

                        if (inputA[i + 1] === '-') {

                            inputB.pop()

                            inputB.push(last / -(inputA[i + 2]))

                            break;

                        } else {

                            inputB.pop()

                            inputB.push(last / inputA[i + 1])

                        }

                        break;

                    } else {

                        if (inputA[i + 1] === '-') {

                            inputB.push(-(inputA[i - 1]) / inputA[i + 2]);

                        } else {

                            inputB.push(inputA[i - 1] / inputA[i + 1]);

                        }
                    }

                    break;

                default:

                    if (inputA[i + 1] === '*' ||
                        inputA[i + 1] === '/' ||
                        inputA[i - 1] === '*' ||
                        inputA[i - 1] === '/' ||
                        inputA[i - 1] === '-' &&
                        inputA[i - 2] === '*' ||
                        inputA[i - 1] === '-' &&
                        inputA[i - 2] === '/') {

                        break;
                    }

                    inputB.push(inputA[i]);
                    break;

            }
        }

        for (let j = 0; j < inputB.length; j++) {

            if (inputB[j - 1] === undefined && inputB[j] !== '-' || inputB[j - 1] === '+') {

                inputResult += Number(inputB[j]);
            }

            if (inputB[j - 1] === '-') {

                inputResult -= Number(inputB[j])
            }

        }

        inputResult = Number(inputResult.toFixed(10).toString().replace(/0*$/g, ''))

        this.setState({
            input: inputResult,
            resolved: true
        })
    }

    componentDidMount() {

        let add = window.addEventListener

        add('keyup', this.clear, false);
        add('keyup', this.addInput, false);
        add('keyup', this.resolve, false);

        document.getElementsByTagName('footer').item(0).classList.add('footer-calculator')
        
    }
    
    componentWillUnmount() {

        let remove = window.removeEventListener

        remove('keyup', this.clear, false);
        remove('keyup', this.addInput, false);
        remove('keyup', this.resolve, false);

        document.getElementsByTagName('footer').item(0).classList.remove('footer-calculator')

    }

    render() {

        const NUMBERS = new Array(10).fill('')

        const OPERATORS = ['/', '*', '.', '+', '-'];

        return (

            <div className='row' id="calculator">

                <div className='title calculator-title'>Calculadora</div>

                <div className='col s12 calculator-output'>{this.state.input}</div>

                <div className='col s4 calculator-input z-depth-3' onClick={this.clear}>AC</div>

                {OPERATORS.map((operator, i) =>
                    <div key={operator} className='col s4 calculator-input z-depth-3' onClick={this.addInput}>
                        {operator}
                    </div>
                )}

                {NUMBERS.map((useless, i) =>
                    <div key={i} className='col s4 calculator-input z-depth-3' onClick={this.addInput}>
                        {i}
                    </div>
                ).reverse()}

                <div className='col s8 calculator-input z-depth-3' onClick={this.resolve}>=</div>

            </div>
        )
    }
}

export default Calculator