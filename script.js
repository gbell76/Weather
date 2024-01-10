const submit = document.querySelector('#submit')
const input = document.querySelector('#input')
const previousSearches = localStorage.getItem("searches")
const previous = document.querySelector('#previous')
const cityName = document.querySelector('#cityname')
const icon = document.querySelector('#icon')
const weather = document.querySelector('#weather')
const temperature = document.querySelector('#temperature')
const wind = document.querySelector('#wind')
const humidity = document.querySelector('#humidity')
const forecast = document.querySelector('#forecast')
const key = '1340be71494f66ddb1b4ff4f454d3b17'

//retrieves weather information from the api
const search = async(btn) => {
    let geocode;
    if(input.value){
        geocode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${btn.value}&limit=1&appid=${key}`)
        cityName.textContent = btn.value + ' ' + dayjs().format('dddd, MMMM D, YYYY')
    }else{
        geocode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${btn.textContent}&limit=1&appid=${key}`)
        cityName.textContent = btn.textContent + ' ' + dayjs().format('dddd, MMMM D, YYYY')
    }
    const geoData = await geocode.json()
    const lat = geoData[0].lat
    const lon = geoData[0].lon
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    const weatherData = await weatherResponse.json()
    icon.src = 'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png'
    weather.textContent = 'Weather: ' + weatherData.weather[0].main
    temperature.textContent = 'Temperature: ' + weatherData.main.temp + ' degrees F'
    wind.textContent = 'Wind Speed: ' + weatherData.wind.speed + 'mph'
    humidity.textContent = 'Humidity: ' + weatherData.main.humidity + '%'
    while(forecast.firstChild){
        forecast.removeChild(forecast.firstChild)
    }
    const forecastResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    const forecastData = await forecastResponse.json()
    for(i = 0; i < 5; i++){
        const day = document.createElement('div')
        const date = document.createElement('p')
        date.textContent = dayjs().add(i+1, 'day').format('dddd, MMMM D, YYYY')
        day.appendChild(date)
        const dailyIcon = document.createElement('img')
        dailyIcon.src = 'http://openweathermap.org/img/w/' + forecastData.list[i].weather[0].icon + '.png'
        day.appendChild(dailyIcon)
        const dailyTemperature = document.createElement('p')
        dailyTemperature.textContent = 'Temperature: ' + forecastData.list[i].main.temp + ' degrees F'
        day.appendChild(dailyTemperature)
        const dailyWind = document.createElement('p')
        dailyWind.textContent = 'Wind Speed: ' + forecastData.list[i].wind.speed + 'mph'
        day.appendChild(dailyWind)
        const dailyHumidity = document.createElement('p')
        dailyHumidity.textContent = 'Humidity: ' + forecastData.list[i].main.humidity + '%'
        day.append(dailyHumidity)
        forecast.appendChild(day)
    }
    input.value = ""
}

//calls the search function when the 'Search City' button is clicked
const searchButton = async() => {
    if(input.value){
        searchPrevious(input)
        if(previousSearches){
            const searches = previousSearches.split(',')
            if(!searches.includes(input.value)){
                searches.push(input.value)
                localStorage.setItem('searches', searches.join(','))
            }
        }else{
            const searches = []
            searches.push(input.value)
            localStorage.setItem('searches', searches.join(','))
        }
        while(previous.firstChild){
            previous.removeChild(previous.firstChild)
        }
        const searches = localStorage.getItem("searches").split(',')
        for (i in searches){
            let city = document.createElement('button')
            city.textContent = searches[i]
            previous.appendChild(city)
            city.addEventListener('click', () => {search(city)})
        }
    }
}

submit.addEventListener('click', searchButton)

//loads previous searches
const loadPrevious = () => {
    if(previousSearches){
        const searches = previousSearches.split(',')
        for (i in searches){
            let city = document.createElement('button')
            city.textContent = searches[i]
            previous.appendChild(city)
            city.addEventListener('click', () => {search(city)})
        }
    }
}

loadPrevious()