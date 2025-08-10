let currentPriceEl = document.getElementById("current-price")
let priceChangeEl  = document.getElementById("price-change")
let lastUpdatedEl  = document.getElementById("last-updated")
let timeButtons = document.querySelectorAll('.time-btn');
let chartCanvas = document.getElementById('btc-chart').getContext('2d');

let myChart = null
const API_CURRENT_PRICE_URL = 'https://data-api.coindesk.com/index/cc/v1/latest/tick?market=cadli&instruments=BTC-USD';
const API_HISTORICAL_URL_BASE = 'https://data-api.coindesk.com/index/cc/v1/historical/days?market=cadli&instrument=BTC-USD';
const API_KEY = '116229285bae1cc633afab2ad298c42b7cea15027da5fa508a4e99035f645012'

async function fetchCurrentPrice(){
    try{
        const response = await fetch(API_CURRENT_PRICE_URL)
        const data = await response.json();
        // console.log(data)
        const btcData = data.Data['BTC-USD'];
        const price = btcData.VALUE.toFixed(2)
        currentPriceEl.textContent = `$${new Intl.NumberFormat('en-US').format(price)}`
        lastUpdatedEl.textContent = new Date(btcData.VALUE_LAST_UPDATE_TS * 1000).toLocaleString("ru-RU")
        // console.log(price)
        const change = btcData.MOVING_24_HOUR_CHANGE;
        const percentChange = btcData.MOVING_24_HOUR_CHANGE_PERCENTAGE;
        priceChangeEl.textContent = `${change > 0 ? '+' : ''}${change.toFixed(2)} USD (${percentChange.toFixed(2)}%)`;
        priceChangeEl.classList.toggle('positive',change > 0);
        priceChangeEl.classList.toggle('negative',change < 0 );


    }catch(error){
        console.error("Ошибка при получении текущей цены:", error)

    }
    
}

async function fetchAndDrawChart(days) {
    const url = `${API_HISTORICAL_URL_BASE}&limit=${days} `;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const historicalData = data.Data;
        const slicedData = historicalData.slice(-days);
        const chartLabels = slicedData.map(entry=>{
            const date = new Date(entry.TIMESTAMP*1000);
            return date.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit'})
        });
        const chartData = slicedData.map(entry => entry.CLOSE)
        drawChart(chartLabels, chartData);
    } catch (error) {
        console.error("Ошибка при получение исторических данных:", error);
    }
}

function drawChart(labels,data){
    if(myChart){
        myChart.destroy();
    }
    myChart = new Chart(chartCanvas,{
        type:'line',
        data:{
            labels:labels,
            datasets:[{
                label:'Цена Bitcoin (USD)',
                data:data,
                borderColor:'#007bff',
                backgroundColor:'rgba(0, 123, 255, 0.1)',
                borderWidth:2,
                pointRadius:0,
                fill:true,
                tension:0.1
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            scales:{
                y:{
                    ticks:{
                        callback:function(value){
                            return '$' + new Intl.NumberFormat('en-US').format(value);

                        }
                    }
                }
            },
            plugins:{
                legend:{
                    display:false

                }
            }
        }
    })
}
console.log(timeButtons)
timeButtons.forEach(button => {
    button.addEventListener('click',() => {
        timeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const days = button.dataset.days;
        fetchAndDrawChart(days);
    })
})

function initialize(){
    fetchCurrentPrice();
    fetchAndDrawChart(7);
}

initialize();