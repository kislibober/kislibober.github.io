// a3f8ff6825fd6b52a44e01788774
const cityInput = document.querySelector(".city-input");//окно ввода города
const searchButton = document.querySelector(".search-btn");//кнопка поиска 

const weatherinfoDiv = document.querySelector(".weather-info");//информация о погоде
const forecastContainer = document.querySelector(".forecast-container");//контейнер карусели
const errorMessageDiv = document.querySelector(".error-message");//блок ошибок

const cityNameEI = document.querySelector(".city-name"); //название города
const  weatherIconEl = document.querySelector(".weather-icon");//иконка погоды
const temperatureEI = document.querySelector(".temperature");//температура текущая
const descriptionEI = document.querySelector(".description");//описание текущей погоды
const humidityEI = document.querySelector(".humidity");//влажность текущая
const windSpeedEI = document.querySelector(".wind-speed");//ветер

const forecastCarousel = document.querySelector(".forecast-carousel") //карусель
const apiKey = "2919a3f8ff6825fd6b52a44e01788774" //ключ апи


//Обработка события нажатия по кнопке поиск
searchButton.addEventListener("click",() =>{
    const city = cityInput.value.trim();
    if(city){
        console.log(city);
        fetchAllWeatherData(city)
    }
})

//Считывание Ентера в строке город
cityInput.addEventListener("keypress",(event)=>{
    if (event.key === "Enter"){
        searchButton.click();
    }
});
async function fetchAllWeatherData(city) {
    // Апи для получения текущей погоды и получение погоды на 5 дней
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    // Скрытие информационных блоков
    weatherinfoDiv.style.display = 'none';
    forecastContainer.style.display = 'none'
    errorMessageDiv.style.display = 'none'
    searchButton.disabled = true
    try {

        const[currentWeatherResponce, foreacstRespons] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ])

        if(!currentWeatherResponce.ok || !foreacstRespons.ok){
            throw new Error("Город не найден")
        }

        const currentWeatherData = await currentWeatherResponce.json()
        const foreacstData = await foreacstRespons.json()

        console.log(currentWeatherData)
        console.log(foreacstData)

        updateCurrentWeatherUI(currentWeatherData);
        updateForecastUI(foreacstData);

    } catch (error) {
        
        console.error("Ошибка:", error);
        errorMessageDiv.style.display = 'block';
    }
    searchButton.disabled = false


};


function updateCurrentWeatherUI(data){
    weatherinfoDiv.style.display = 'block';
    cityNameEI.textContent = data.name; 
    temperatureEI.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionEI.textContent = data.weather[0].description;
    humidityEI.textContent = `${data.main.humidity}% `;
    windSpeedEI.textContent = `${data.wind.speed} м/с`;
    const iconCode = data.weather[0].icon;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function updateForecastUI(data){
    const dailyData = processForecastData(data.list);
    forecastCarousel.innerHTML = '';
    dailyData.forEach(day => {
        const card = document.createElement('div');
        card.className = 'day-card';
         card.innerHTML = `
            <p class="day-name">${day.dayName}</p>
            <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}" class="day-icon">
            <p class="day-temp">${day.maxTemp}° / ${day.minTemp}°</p>
        `;
        forecastCarousel.appendChild(card);
    });
    forecastContainer.style.display = 'block';
}

function processForecastData(forecastList){
    const dailyForecasts = new Map();
    forecastList.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayKey = date.toISOString().split('T')[0];
        if (!dailyForecasts.has(dayKey)){
            dailyForecasts.set(dayKey,{
                dayName:formatDay(date),
                minTemp:Math.round(entry.main.temp_min),
                maxTemp:Math.round(entry.main.temp_max),
                icon:(date.getHours() >= 12 && date.getHours() <= 15) ? entry.weather[0].icon : null,
                descrription:entry.weather[0].description
            });
        }else{
            const existingDay = dailyForecasts.get(dayKey);
            existingDay.minTemp = Math.min(existingDay.minTemp, Math.round(entry.main.temp_min));
            existingDay.maxTemp = Math.max(existingDay.maxTemp, Math.round(entry.main.temp_max));
            if(!existingDay.icon && date.getHours()>= 12 && date.getHours() <= 15){
                existingDay.icon = entry.weather[0].icon;
            }
        }
 
        
    })
    for(const[key,value] of dailyForecasts.entries()) {
        if(!value.icon){
            const firstEntryForDay = forecastList.find(entry => new Date(entry.dt * 1000).toISOString().startsWith(key));
            if(firstEntryForDay){
                value.icon = firstEntryForDay.weather[0].icon;
            }
        }
    }  
    const result = Array.from(dailyForecasts.values());
    const todayKey = new Date().toISOString().split('T')[0];
    if(dailyForecasts.has(todayKey)){
        return result.slice(0,5);
    }
    return result.slice(0,5);
}

function formatDay(date){
    const today = new Date();
    if(date.getDate() === today.getDate()) {
        return "Сегодня";
    }
    return date.toLocaleDateString('ru-RU',{ weekday:'short'});
}