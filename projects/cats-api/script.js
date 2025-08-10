const button = document.querySelector(".btn");
const image = document.querySelector(".img");
const url = "https://api.thecatapi.com/v1/images/search?limit=1"
async function fetchHandler () {
    try{
        const response = await fetch(url);
        const data = await response.json();
        image.src = data[0].url;
    }catch(error){
        console.log("Произошла ошибка при закрузке картинки:",error);
    }
}
button.addEventListener("click",() =>{
    fetchHandler();
}
)

document.addEventListener("DOMContentLoaded",fetchHandler);