import React from 'react';

export class NextFocus{
  constructor(elements){
    this.elements = elements;
    this.elementsNumber = elements.length;

    this.inputs = new Array(this.elementsNumber);
    
    this.setInput();
    this.focusOn = this.focusOn.bind(this); 
  }

  setInput(){
    for(var input = 0; input < this.elementsNumber; input++)
      this.inputs[input] = React.createRef();
  }

  getInputNumber(elementSTR){
    for(var element = 0; element < this.elementsNumber; element++){
      if(this.elements[element] === elementSTR)
        return element;
    }
  }

  getInput(element){
    const elementNumb = this.getInputNumber(element);
    return this.inputs[elementNumb];
  }

  focusOn(element){
    const elementNumb = this.getInputNumber(element);
    this.inputs[elementNumb].current.focus();
  }

  enterPressedFocusOn = (element) => (e) => {
    if (e.key === "Enter")
      this.focusOn(element)
  }

  removeFocus = (e, fun) => {
    if (e.key === "Enter"){
      document.activeElement.blur();
      fun?.()
    }
  }
}