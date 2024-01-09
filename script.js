const submit = document.querySelector('#submit')
const input = document.querySelector('#input')
const previousSearches = localStorage.getItem("searches")
const previous = document.querySelector('#previous')

const searchPrevious = () =>{
    //api call
}

const search = async() => {
    if(input.value){
        //api call
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
            city.addEventListener('click', searchPrevious)
        }
    }
}

submit.addEventListener('click', search)

const loadPrevious = async() => {
    if(previousSearches){
        const searches = previousSearches.split(',')
        for (i in searches){
            let city = document.createElement('button')
            city.textContent = searches[i]
            previous.appendChild(city)
            city.addEventListener('click', searchPrevious)
        }
    }
}

loadPrevious()