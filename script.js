
const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

   let currentInput = '';
   let operator = '';
   let previousInput = '';

   buttons.forEach(button => {
      button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'clear') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '0';
                return;
            }

            if (value === 'delete') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0'; 
                return;
            }

            if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.value = currentInput;
                    previousInput = '';
                    operator = '';
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
               if (currentInput && previousInput && operator) {
                  currentInput = calculate(previousInput, currentInput, operator);
                  display.value = currentInput;
                  previousInput = currentInput;
                  currentInput = '';
               } else if (currentInput) {
                  previousInput = currentInput;
                  currentInput = '';
               }
            operator = value;
            return;
         }

         currentInput += value;
         display.value = currentInput;
      });
   });

   function calculate(num1, num2, operator) {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);

      switch (operator) {
         case '+':
            return (num1 + num2).toString();
         case '-':
            return (num1 - num2).toString();
         case '*':
            return (num1 * num2).toString();
         case '/':
            return (num1 / num2).toString();
         default:
            return '0';
      }
   }

   const deleteButton = document.querySelector('.delete');
   let longPressTimer;

   deleteButton.addEventListener('mousedown', () => {
      longPressTimer = setTimeout(() => {
         currentInput = '';
         operator = '';
         previousInput = '';
         display.value = '0';
      }, 1000);
   });

   deleteButton.addEventListener('mouseup', () => {
      clearTimeout(longPressTimer);
   });
   deleteButton.addEventListener('mouseleave', () => {
      clearTimeout(longPressTimer);
   });