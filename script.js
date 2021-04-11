"use strict";

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
      this.previousOperandElement = previousOperandElement;
      this.currentOperandElement = currentOperandElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const previous = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(previous) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = previous + current;
          break;
        case '-':
          computation = previous - current;
          break;
        case 'x':
          computation = previous * current;
          break;
        case '÷':
          computation = previous / current;
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOperandElement.innerText =
        this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandElement.innerText = '';
      }
    }
  }

  
  const numberBtns = document.querySelectorAll('[data-number]');
  const operationBtns = document.querySelectorAll('[data-operation]');
  const equalsBtn = document.querySelector('[data-equals]');
  const deleteBtn = document.querySelector('[data-delete]');
  const allClearBtn = document.querySelector('[data-all-clear]');
  const previousOperandElement = document.querySelector('[data-previous-operand]');
  const currentOperandElement = document.querySelector('[data-current-operand]');
  const calculator = new Calculator(previousOperandElement, currentOperandElement);
  
  numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.appendNumber(btn.innerText);
      calculator.updateDisplay();
    })
  })
  
  operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.chooseOperation(btn.innerText);
      calculator.updateDisplay();
    })
  })
  
  equalsBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateDisplay();
  })
  
  allClearBtn.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
  })
  
  deleteBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplay();
  })

  //Reference: https://www.youtube.com/watch?v=j59qQ7YWLxw