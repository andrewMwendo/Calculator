let operator = ""
let firstElement = NaN
let secondElement = NaN
let enterNew = true
let unaryOperator = false

window.onload = function () {
    const display = document.querySelector("#display")
    setButtons()
}

function setButtons() {
    let numberButtons = document.querySelectorAll(".numberButton")

    for (let numberButton of numberButtons) {
        numberButton.onclick = function (event) {
            if (enterNew) {
                display.value = event.target.value
                enterNew = false
            } else {
                if (event.target.value != ".") {
                    display.value += event.target.value
                } else {
                    display.value += String(display.value).indexOf(".") == -1 ? "." : ""
                }
            }
        }
    }

    let opButtons = document.querySelectorAll(".opButton")

    for (let opButton of opButtons) {
        opButton.onclick = function (event) {

            switch (event.target.value) {
                default:
                    if (operator !== event.target.value) {
                        operator = event.target.value
                        secondElement = NaN
                        unaryOperator = (operator == "√" || operator == "!")
                    }
                    
                    if (!Number.isNaN(firstElement) && !unaryOperator) {
                        display.value = getResult()
                    }
                    
                    firstElement = parseFloat(display.value)                    
                    enterNew = true
                    
                    if (!unaryOperator) break
                case "=":
                    display.value = getResult()
                    firstElement = NaN
                    break
                case "C":
                    firstElement  = NaN
                    secondElement = NaN
                    enterNew = true
                    operator = ""
                    display.value = "0"
                    break

            }
        }
    }
}

function getResult() {
    firstElement  = Number.isNaN(firstElement)  ? parseFloat(display.value) : firstElement
    secondElement = Number.isNaN(secondElement) ? parseFloat(display.value) : secondElement

    let result = parseFloat(display.value)

    switch (operator) {
        case "+":
            result = firstElement + secondElement
            break
        case "-":
            result = firstElement - secondElement
            break
        case "*":
            result = firstElement * secondElement
            break
        case "/":
            result = firstElement / secondElement
            break
        case "√":
            result = Math.sqrt(firstElement)
            secondElement = NaN
            break
        case "!":
            result = factorialize(firstElement)
            secondElement = NaN
            break
        case "^":
            result = Math.pow(firstElement, secondElement)
            break
    }

    return result
}

function factorialize(num) {
    return num  < 0 ? -1 : 
           num == 0 ?  1 :
           num * factorialize(num -1)
}
