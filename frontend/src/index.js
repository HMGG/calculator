import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery'
import './index.css'

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: 'term1',
      term1: '',
      term2: '',
      operation: '',
      result: '',
    }
  }

  write(number) {
    switch (this.state.editing) {
      case 'term1':
        if (this.state.term1.includes('.') && number === '.') return
        else this.setState({
          ...this.state,
          term1: this.state.term1.concat(number)
        })
        break
      case 'term2':
        if (this.state.term2.includes('.') && number === '.') return
        else this.setState({
          ...this.state,
          term2: this.state.term2.concat(number)
        })
        break
      case 'none':
        this.setState({
          editing: 'term1',
          term1: number.toString(),
          term2: '',
          operation: '',
          result: '',
        })
        break
      default:
        return
    }
  }

  operate(op) {
    if (this.state.editing === 'term1')
      this.setState({
        ...this.state,
        operation: op,
        editing: 'term2'
      })
    else if (this.state.editing === 'none')
      this.setState({
        editing: 'term2',
        term1: this.state.result,
        term2: '',
        operation: op,
        result: '',
      })
  }

  eval() {
    switch (this.state.operation) {
      case '+':
        this.setState({
          ...this.state,
          result: +this.state.term1 + +this.state.term2,
          editing: 'none'
        })
        break
      case '-':
        this.setState({
          ...this.state,
          result: this.state.term1 - this.state.term2,
          editing: 'none'
        })
        break
      case '*':
        this.setState({
          ...this.state,
          result: this.state.term1 * this.state.term2,
          editing: 'none'
        })
        break
      case '/':
        this.setState({
          ...this.state,
          result: this.state.term1 / this.state.term2,
          editing: 'none'
        })
        break
      default:
        return
    }
  }

  clear() {
    this.setState({
      editing: 'term1',
      term1: '',
      term2: '',
      operation: '',
      result: '',
    })
  }

  save() {
    if(this.state.result)
    jQuery.ajax({
      url: 'http://localhost:3000/',
      method: 'PUT',
      data: {number: this.state.result}
    })
  }

  load() {
    jQuery.ajax({
      url: 'http://localhost:3000/',
      method: 'GET',
      success: (data) => {
        console.log(data);
        if (data)
          this.setState({
            editing: 'term1',
            term1: data,
            term2: '',
            operation: '',
            result: '',
          })
      }
    })
  }

  render() {
    return (
      <div id='calculator'>
        <div id='screen'>
          <div class='line' id='term1'>{this.state.term1}</div>
          <div class='line' id='term2'>{this.state.operation + this.state.term2}</div>
          <div class='line' id='product'>{this.state.result}</div>
        </div>
        <div class='row'>
          <button onClick={() => this.save()}>SAVE</button>
          <button onClick={() => this.load()}>MEM</button>
          <button onClick={() => this.eval()} id='eval'>=</button>
        </div>
        <div class='row'>
          <button onClick={() => this.write(1)}>1</button>
          <button onClick={() => this.write(2)}>2</button>
          <button onClick={() => this.write(3)}>3</button>
          <button onClick={() => this.operate('+')}>+</button>
        </div>
        <div class='row'>
          <button onClick={() => this.write(4)}>4</button>
          <button onClick={() => this.write(5)}>5</button>
          <button onClick={() => this.write(6)}>6</button>
          <button onClick={() => this.operate('-')}>-</button>
        </div>
        <div class='row'>
          <button onClick={() => this.write(7)}>7</button>
          <button onClick={() => this.write(8)}>8</button>
          <button onClick={() => this.write(9)}>9</button>
          <button onClick={() => this.operate('*')}>*</button>
        </div>
        <div class='row'>
          <button onClick={() => this.write(0)}>0</button>
          <button onClick={() => this.write('.')}>.</button>
          <button onClick={() => this.clear()}>C</button>
          <button onClick={() => this.operate('/')}>/</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
)