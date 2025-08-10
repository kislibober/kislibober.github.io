let area = [
    ["*","*","*"],
    ["*","*","*"],
    ["*","*","*"]
];

let turn = 1;
let char = "X";

let table = document.querySelector("table")

table.onclick = function (){
    let cell = event.target;
    let row = cell.parentElement.rowIndex;
    let column = cell.cellIndex;
    console.log(row,column)
    if (area[row][column] !== "X" && area[row][column] !=="0"){
        area[row][column] = char;
        cell.innerHTML = char;

        if(char === "X"){
            cell.classList.add("crosses");
        }else if(char === "0"){
            cell.classList.add("zeros");
        }

        if (checkWinner() === "X"){
                winner("Крестики победили");
        }else if (checkWinner() === "0"){
            winner("нолики победили");
        }
        
        turn = turn + 1;
        changeChar()

        if (checkWinner() === null && turn == 10){
            winner("ничья")
        }
    }
}

function winner(text){
    setTimeout(function(){
        alert(text);
        newGame()
    },50)
}

function newGame(){
    let rows = document.querySelectorAll("tr");
    for (let i = 0; i < rows.length;i++){
        let row = rows[i];
        let cells = row.querySelectorAll("td");

        for (let j = 0; j < cells.length; j++){
            cells[j].classList.remove("crosses");
            cells[j].classList.remove("zeros");
            cells[j].innerHTML = "";
            area[i][j] = "*";
        }
    }
    turn = 1;
    char = "X";
    document.querySelector("span").innerHTML = char;
}

function changeChar(){
    if (turn % 2 === 1){
        char = "X";    
    } else{
        char = "0";
    }
    document.querySelector("span").innerHTML = char;
}

function checkWinner(){
    if(area[0][0] == "X" && area[0][1] == "X" && area[0][2] == "X"){
        return "X";
    }
    if(area[1][0] == "X" && area [1][1] == "X" && area[1][2] == "X"){
        return"X";
    }
    if (area[2][0] == "X" && area[2][1] == "X" && area[2][2] == "X"){
        return "X";
    }
     if(area[0][0] == "X" && area[1][0] == "X" && area[2][0] == "X"){
        return "X";
    }
    if(area[0][1] == "X" && area [1][1] == "X" && area[2][1] == "X"){
        return"X";
    }
    if (area[0][2] == "X" && area[1][2] == "X" && area[2][2] == "X"){
        return "X";
    }
     if(area[0][0] == "X" && area[1][1] == "X" && area[2][2] == "X"){
        return "X";
    }
    if(area[0][2] == "X" && area [1][1] == "X" && area[2][0] == "X"){
        return"X";
    }

     if(area[0][0] == "0" && area[0][1] == "0" && area[0][2] == "0"){
        return "0";
    }
    if(area[1][0] == "0" && area [1][1] == "0" && area[1][2] == "0"){
        return"0";
    }
    if (area[2][0] == "0" && area[2][1] == "0" && area[2][2] == "0"){
        return "0";
    }
     if(area[0][0] == "0" && area[1][0] == "0" && area[2][0] == "0"){
        return "0";
    }
    if(area[0][1] == "0" && area [1][1] == "0" && area[2][1] == "0"){
        return"0";
    }
    if (area[0][2] == "0" && area[1][2] == "0" && area[2][2] == "0"){
        return "0";
    }
     if(area[0][0] == "0" && area[1][1] == "0" && area[2][2] == "0"){
        return "0";
    }
    if(area[0][2] == "0" && area [1][1] == "0" && area[2][0] == "0"){
        return"0";
    }
    return null
}