var contentText = ''; // This is for storing button text (not used)
var content = document.querySelector("#content");
defaultZero(); // Print default 0 on screen

let resultTotal = document.querySelector("#total");
let result = '';
let operators = ['+', '-', '*', '/', '%'];








// Event listener for button clicks and keydown
let buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener('click', printText);
}
function handleClickEvent(event) {
  let pressedButton = event.target.textContent;
  printText(pressedButton);
}
document.addEventListener('keydown', keyboeardPressed);
function keyboeardPressed(event) {
  const pressedKey = event.key;
  if ((pressedKey >= '0' && pressedKey <= '9') || operators.includes(pressedKey) || pressedKey === '.') {
    printText(pressedKey);
  }
   if(pressedKey === 'Backspace')
    backSpacing();
   if(pressedKey === 'Enter' || pressedKey === '=')
    printText('=');
}


function printText(inputValue) {
  switch (inputValue) {
    case 'C':
      clearTextContent();
      return;
    case '=':
      content.value = resultTotal.value; // Display result in content
      resultTotal.value = ''; // Clear result display
      
      return; // Prevent printing after calculation
    case '<':
      backSpacing();
      return;
    case '-/+':
      toggleSign();
      return;
    default:
      break;
  }

  // Handle number and operator input
  if (content.value === '0') {
    if (operators.includes(inputValue)) {
      content.value += inputValue; // Append operator to '0'
    } else if (inputValue === '.') {
      content.value += inputValue;
    } else {
      content.value = inputValue; // Replace '0' with digit
    }
  } else {
    if (operators.includes(inputValue)) {
      if (!operators.includes(content.value.slice(-1))) {
        content.value += inputValue; // Append operator if not already there
      }
    } else {
      content.value += inputValue; // Append digit
    }
  }

  // Check for calculation after each input
  for (const operator of operators) {
    if (content.value.includes(operator)) {
      let splitNumbers = content.value.split(operator);
      if (splitNumbers[0] && splitNumbers[1]) {
        equal();
      } else {
        resultTotal.value = ''; // Clear result if incomplete expression
      }
    }
  }
}


function toggleSign() {
  const currentValue = content.value;
  content.value = (parseFloat(currentValue) * -1).toString();
}
function defaultZero() {
  if (content.value === '' || content.value.length === 0) {
    content.value = "0"; // Display default 0
  } else {
    content.value = ""; // Clear existing content
  }
}
function backSpacing() {
  content.value = content.value.slice(0, -1); // Remove last character
  if (content.value === '') defaultZero(); // Display default 0 if empty

  // Recalculate if backspace leaves a complete expression
  for (const operator of operators) {
    if (content.value.includes(operator)) {
      let text = content.value.split(operator);
      if (text[0] && text[1]) {
        equal();
      } else {
        resultTotal.value = ''; // Clear result if incomplete expression
      }
    }
  }

  // Clear result if no operator after backspace
  if (!operators.some(op => content.value.includes(op))) {
    resultTotal.value = '';
  }
}

function clearTextContent() {
  content.value = '';
  resultTotal.value = '';
  defaultZero();
}

function equal() {
  try {
    result = eval(content.value); // Evaluate expression (consider safer alternatives later)
    resultTotal.value =  eval(content.value); // Display result
    console.log(result); // Log result for debugging
 
  } catch (error) {
    resultTotal.value = "Error"; // Display error message
  }
  
}

// Adding colors for operators (same as before)
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".operator").forEach(button => {
    button.style.backgroundColor = "gray";
  });
});
