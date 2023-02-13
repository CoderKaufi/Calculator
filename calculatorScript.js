function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(key, num1, num2){
    if(key === "+"){
        return add(num1, num2)
    }
    else if(key === "-"){
        return subtract(num1, num2)
    }
    else if(key === "*"){
        return multiply(num1, num2)
    }
    else if(key === "/"){
        return divide(num1, num2)
    }
}

function evaluate(string){
    array = string.split(" ");
    let depth = false;
    array.forEach(character =>{
        if(character === "*" || character === "/"){
            let insertIndex = array.indexOf(character, 0) - 1;
            let result = operate(character, array[array.indexOf(character, 0) - 1], array[array.indexOf(character, 0) + 1]);
            array.splice(array.indexOf(character, 0) - 1, 3);
            if(array.length === 0){
                if(depth){
                    return;
                }
                display.textContent = result;
                return;
            }
            else if(array.length != 0){
                array.splice(insertIndex, 0, result)
                depth = true;
                evaluate(array.join(" "))
            }
        }
        else if(array.includes("*") === false && array.includes("/") === false && character === "+" || character === "-"){
            let insertIndex = array.indexOf(character, 0) - 1;
            let result = operate(character, Number(array[array.indexOf(character, 0) - 1]), Number(array[array.indexOf(character, 0) + 1]));
            array.splice(array.indexOf(character, 0) - 1, 3);
            if(array.length === 0){
                if(depth){
                    return;
                }
                display.textContent = result;
                return;
            }
            else if(array.length != 0){
                array.splice(insertIndex, 0, result);
                depth = true;
                evaluate(array.join(" "));
            }
        }

    });
}

calculator = document.createElement("div");
calculator.classList.add("calculator")
document.body.appendChild(calculator);

display = document.createElement("div");
display.classList.add("display")
calculator.appendChild(display);

board = document.createElement("div");
board.classList.add("board");
calculator.appendChild(board);
numbers = [  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
buttonsInitArray = ["+", "-", "*", "/", "=", "C", "D",  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
buttonsInitArray.forEach(key => {
    let button = document.createElement("button");
    button.textContent = key;
    board.appendChild(button);
    
    if(key === "C"){
        button.addEventListener("click", click =>{
            display.textContent = "";
        })
    }
    else if(key === "D"){
        button.addEventListener("click", click => {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        })
    }
    else if(key === "="){
        button.addEventListener("click", click =>{
            evaluate(display.textContent);
        })
    }
    
    else if(numbers.includes(key) === false){
        button.addEventListener("click", click => {
            display.textContent += " " + key + " ";
        })
    
    }else{
        button.addEventListener("click", click => {
            display.textContent += key;
        })
    }
});