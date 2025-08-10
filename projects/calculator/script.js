let dot = false
document.querySelector(".buttons").onclick = function () {
    let target = event.target;
    let value = "";
    let input = document.querySelector("#expression");
    let operators = ["/","*","+","-","."];

    if (target.classList.contains("number")){
        value = target.innerHTML;
        if(input.value == "0"){
            input.value = value;
        }else{
            input.value += value;
        }
    }else if(target.classList.contains("operation")){
        let expression = input.value;
        let lastChar = expression[expression.length - 1];
        value = target.innerHTML;
        if (dot == true && value == "."){
            return
        }
        if(value == ".") {
            dot = true
        }else{
            dot = false
        }
        if (operators.indexOf(lastChar) != -1){
            expression = expression.replace(/.$/, value);
            input.value = expression;
        }
        else{
            input.value+=value;
        }
    }
    else if (target.classList.contains("calculation")){
        let expression = input.value;
        let result = eval(expression);
        input.value = result;
        dot = false
    } else if (target.classList.contains("clear_one")){
        let expression = input.value;
        expression = expression.substring(0,expression.length-1)
        if(expression.length == 0){
            expression = 0 
            dot = false
        }
        input.value = expression;
    }else if (target.classList.contains("clear")){
        input.value = 0
        dot = false

    }
     
}