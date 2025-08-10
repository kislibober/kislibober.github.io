let secretNumber = getRandomInt(1, 10);
let attempts = 3;
let finish = false;
function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max-min + 1)) + min;
}
document.querySelector(".content").onclick = function(){
    let target = event.target;
    if(target.classList.contains("number")){
        let userNumber = target.innerHTML;
        check(userNumber);
    }
    if(target.classList.contains("new")){
        attempts = 3;
        secretNumber = getRandomInt(1,10);
        finish = false;
         document.querySelector(".hint").innerHTML = "Чего ждешь? ткни кнопку!";
          document.querySelector("span").innerHTML = attempts;
          document.querySelector(".new").onmouseover = function(){
            document.querySelector(".new").style.backgroundColor = "#8f9fff";
          };
          document.querySelector(".new").onmouseout = function(){
            document.querySelector(".new").style.backgroundColor = "#6f7fdf";
          };
    }
}

function check(userNumber){
    if(!finish){
        let hint = document.querySelector(".hint")
        let newButton = document.querySelector(".new")
        let spanAttempts = document.querySelector("span")
        if(userNumber> secretNumber){
            hint.innerHTML = "Мимо! попробуй поменьше";
            attempts -= 1;
        }
        if(userNumber< secretNumber){
            hint.innerHTML = "Мимо! попробуй побольше";
            attempts -= 1;
        }
        if (userNumber == secretNumber) {
            hint.innerHTML = "О! Угадал Еще?";
            newButton.computedStyleMap.backgroundColor = "#F44336";
            finish = true;
        }

        spanAttempts.innerHTML = attempts;
        if(attempts == 0) {
            hint.innerHTML = "Все,финиш!Начинай заново!";
            newButton.style.backgroundColor = "#f44336";
            finish = true;
        }
    }

}

