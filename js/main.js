const api_root_url = 'http://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = 'e860757fa235df9f287b086d5cc51be7'

//select all elements in the html by using querySelector and putting them in variable
const body = document.querySelector("body")
const city = document.querySelector(".city")
const zip = document.querySelector(".zip")
const weather = document.querySelector(".weather")
const temp = document.querySelector(".temp")
const humidity = document.querySelector(".humidity")
const icon = document.querySelector(".icon");
const convert = document.querySelector(".convert")
const changeDeg = document.querySelector(".change-deg")

const groups = [
    {
       condition: 'Rain',
       icon: 'img/rain.png',
       background: 'img/rainwater-bg.jpg',
    },
    {
       condition: 'Cloudy',
       icon: 'img/cloudy.png',
       background: 'img/cloudy-bg.jpg',
    },
    {
       condition: 'Clouds',
       icon: 'img/cloudy.png',
       background: 'img/cloudy-bg.jpg',
    },
    {
       condition: 'Snow',
       icon: 'img/snow.png',
       background: 'img/snowy-bg.jpg',
    },
    {
       condition: 'Sun',
       icon: 'img/sun.png',
       background: 'img/Sunny-bg.jpg',
    },
    {
       condition: 'Thunderstorm',
       icon: 'img/thunderstorm.png',
       background: 'img/thunderstorm-bg.jpg',
    },
    {
       condition: 'Partly Cloudy',
       icon: 'img/partly-cloudy.png',
       background: 'img/partlycloudy-bg.jpg',
    },
    {
       condition: 'Clear',
       icon:'img/sun.png',
       background: 'img/clear-bg.jpg',
    },
    {
       condition: 'Drizzle',
       icon: 'img/rain.png',
       background: 'img/rainwater-bg.jpg',
    },
    ]

//convert is where our converter function will be
function kelvinToFar(Kelvin){
    return Math.round(Kelvin * 9/5 - 459.67)
}

function farToCelsius() {  
    let value = parseInt(temp.textContent)
       return Math.round((value - 32) * 5/9);
    }


//ajax function
function getWeather(zipCode){
    $.ajax({
        type: "GET",
        url: `${api_root_url}${zipCode},us&appid=${API_KEY}`,
        dateType: "json",
        success: function(data){
        console.log(data)
            temp.textContent = kelvinToFar(data.main.temp)
            city.textContent = data.name
            weather.textContent = data.weather[0].main
            humidity.textContent = data.humidity
             icon.setAttribute('src', groups[data.weather[0].main])
            for(var i=0 in groups) {
                if(groups[i].condition === data.weather[0].main) {
                    icon.setAttribute('src', groups[i].icon);
                    document.body.style.backgroundImage = `url(${groups[i].background})`;
                }
            }
        },        
        error: function(error){
        console.log("Something went wrong")
    }
   })
}
getWeather('33182');

zip.addEventListener('keypress', function(event){
    if(event.key==="Enter"){
        getWeather(zip.value)
    }
})

convert.addEventListener("click", function() {
    if (convert.textContent === "Convert to °C") {
    temp.textContent = farToCelsius();
    convert.textContent = "Convert to °F"
    changeDeg.textContent = "°C"
    } else {
    temp.textContent = Math.floor(temp.textContent * 1.8) + 32;
    convert.textContent = "Convert to °C"
    changeDeg.textContent = "°F"
 }
 })