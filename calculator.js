"use strict";

const displayValuePanel = document.getElementById('display-value');
const clearButton = document.getElementById('clear-btn');
const numberButtons = document.querySelectorAll('.number-btn');
const operationButtons = document.querySelectorAll('.operation-btn');
const deleteButton = document.getElementById('delete-btn');
const equalsButton = document.getElementById('equals');
let currentDisplayValue = '';
let isEqualsButtonPressed = false;
let lastDisplayValue = '';
const lastDisplayValueHistory = document.getElementById('history-value');
let lastOperation = '';

// calculator functions

// clears everything from display panel
const clearAll = () => {
    currentDisplayValue = '';
    setDisplayPanelValue();
}

// sets the value on display panel UI
const setDisplayPanelValue = () => {
    displayValuePanel.innerHTML = currentDisplayValue;
}

// handles click event on numeric buttons
const handleNumberButtonClick = () => { 

    if (lastOperation != '' && !isEqualsButtonPressed) {
        lastOperation += event.target.innerText;
    }
    
    updateDisplayValueOnNumberClick(event.target.innerText);
}

// handles click event on operator buttons
const handleOperationButtonClick = () => {

    let valueToDisplay = event.target.innerText;
    lastOperation = valueToDisplay;

    if (currentDisplayValue != '') {
        isEqualsButtonPressed = false;
        
        if (currentDisplayValue != '0') {
            currentDisplayValue += valueToDisplay;
        } else {
            currentDisplayValue = valueToDisplay;
        }
    }

    setDisplayPanelValue();

}



const updateDisplayValueOnNumberClick = (valueToDisplay) => {

    if (currentDisplayValue != '0' && !isEqualsButtonPressed) {
        currentDisplayValue += valueToDisplay;
    } else {
        isEqualsButtonPressed = false;
        currentDisplayValue = valueToDisplay;
    }

    // isEqualsButtonPressed

    setDisplayPanelValue();
    
}

const deleteLastInput = () => {

    if (isEqualsButtonPressed) {
        clearAll();
    } else {
        currentDisplayValue = currentDisplayValue.slice(0, -1);
        setDisplayPanelValue();
    }
    
}

const onEqualsClick = () => {
    
    // get last operation performed by user to show it in history section
    lastDisplayValue = currentDisplayValue;

    // if equal button is pressed keep repeating the last operation on the last result
    if (isEqualsButtonPressed) {

        // update last operation UI 
        lastDisplayValueHistory.innerText = currentDisplayValue + lastOperation;

        currentDisplayValue = eval(currentDisplayValue+lastOperation);   
            
        setDisplayPanelValue();

    } else {

        // else evaluate the complete expression entered by user
        try {
            currentDisplayValue = eval(currentDisplayValue);   
            
            // update last operation performed by user on the UI
            lastDisplayValueHistory.innerText = lastDisplayValue;
    
            // set user clicked the equal button to true
            isEqualsButtonPressed = true;

            // update UI with result
            setDisplayPanelValue();
        } catch (err) {
            alert('invalid expression');
        }
    }
    
}


// click handlers
clearButton.addEventListener('click', clearAll);

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', handleNumberButtonClick);
});

operationButtons.forEach((operationButton) => {
    operationButton.addEventListener('click', handleOperationButtonClick);
});

deleteButton.addEventListener('click', deleteLastInput);

equalsButton.addEventListener('click', onEqualsClick);

