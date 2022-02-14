import React, { Component } from 'react'
import './Calculator.css'

import Button from '../componets/Button'
import Display from '../componets/Display'

//Estado inicial da calculadora
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    //Clone do objeto acima atribuido a variavel state
    state = {...initialState}

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
       if(this.state.current === 0) {
           this.setState({ operation, current: 1, clearDisplay: true })
       } else {
           //Se ela for '=' ela irpa ser true
           const equals = operation === '='
           //Operação que irá ser feita
           const currentOperation = this.state.operation

           const values = [...this.state.values]
           let result;

           console.log(operation)
           
           switch (currentOperation) {
                case '+':
                    result = values[0] + values[1]
                    break;
                case '-': 
                    result = values[0] - values[1]
                    break;
                case '*': 
                    result = values[0] * values[1]
                    break;
                case '/': 
                    result = values[0] / values[1]
           } 

            try {
                values[0] = result
            } catch(e) {
               values[0] = this.state.values[0]
            }

           values[1] = 0

           this.setState({
               displayValue: values[0],
               operation: equals ? null : operation,
               current: equals ? 0 : 1,
               clearDisplay: !equals,
               values
           })

       }
    }

    addDigit(n) {
        //Impede de ser digitado mais de um "."
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        // Precisa limpar o display caso o valor seja 0 ou a variavel seja verdadeira
        //evita os 0 na esquerda, ex.: 0001
        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay
        
        //Depende do clearDisplay acima, e recebe vazio ou o valor digitado
        const currentValue = clearDisplay ? '' : this.state.displayValue
        //"Concatena" os valores digitados ex.: 1.5
        const displayValue = currentValue + n

        //Uma vez que digitei o valor, clearDisplay deve ser marcado como falso
        this.setState({ displayValue, clearDisplay: false})

        
        //Sempre que digitar um numero que seja diferente de '.'
        if(n != '.') {
            //Indice do array values 
            const i = this.state.current
            //Conversão para float
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue

            //Uma vez que eu alterei o array values, terei que adicionar ele ao estado do objeto
            this.setState({ values })

            console.log(values)
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation double/>

            </div>
        )
    }

}