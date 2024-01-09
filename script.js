const submit = document.querySelector('#submit')
const input = document.querySelector('#input')
const previousSearches = localStorage.getItem("searches")
const previous = document.querySelector('#previous')
const cityName = document.querySelector('#cityname')
const weather = document.querySelector('#weather')
const temperature = document.querySelector('#temperature')
const humidity = document.querySelector('#humidity')
const key = '1340be71494f66ddb1b4ff4f454d3b17'

const searchPrevious = async(btn) =>{
    const geocode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${btn.textContent}&limit=1&appid=${key}`)
    const geoData = await geocode.json()
    const lat = geoData[0].lat
    const lon = geoData[0].lon
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    const weatherData = await weatherResponse.json()
    console.log(weatherData.weather[0].main)
    console.log(weatherData.main.temp)
    cityName.textContent = btn.textContent
    weather.textContent = 'Weather: ' + weatherData.weather[0].main
    temperature.textContent = 'Temperature: ' + weatherData.main.temp
    humidity.textContent = 'Humidity: ' + weatherData.main.humidity
}

const search = async() => {
    if(input.value){
        //console.log(input.value)
        if(previousSearches){
            const searches = previousSearches.split(',')
            searches.push(input.value)
            localStorage.setItem('searches', searches.join(','))
        }else{
            const searches = []
            searches.push(input.value)
            localStorage.setItem('searches', searches.join(','))
        }
        input.value = ""
        while(previous.firstChild){
            previous.removeChild(previous.firstChild)
        }
        const searches = localStorage.getItem("searches").split(',')
        for (i in searches){
            let city = document.createElement('button')
            city.textContent = searches[i]
            previous.appendChild(city)
            city.addEventListener('click', () => {searchPrevious(city)})
        }
    }
}

submit.addEventListener('click', search)

const loadPrevious = () => {
    if(previousSearches){
        const searches = previousSearches.split(',')
        for (i in searches){
            let city = document.createElement('button')
            city.textContent = searches[i]
            previous.appendChild(city)
            city.addEventListener('click', () => {searchPrevious(city)})
        }
    }
}

loadPrevious()