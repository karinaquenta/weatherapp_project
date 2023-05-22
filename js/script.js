console.log('heller')

async function getWeatherApiCall(city){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d777df95e1f0d7f9e22b29a639da39a9&units=imperial`,{    
    method: 'GET',
    })
    if (res.ok){
        const data = await res.json()
        console.log(data)
        handleWeatherData(data)
    }else{
        console.log('Error', res.status)
        handleNoData()
    }
    
    
}

//call back function
(async ()=>{
    //await getWeatherApiCall() 
   
})

//request to get the weather data from API
function handleWeatherData({main:{temp,temp_min,temp_max},weather:[{description}]}){
    console.log(temp,temp_min,temp_max,description)
    const td=document.createElement('td')
    //const tdTemp = document.createElement('td')
    const tdTempMin = document.createElement('td')
    const tdTempMax = document.createElement('td')
    const tdMain = document.createElement('td')
    //const tdIcon = document.createElement('td')

    const row =document.createElement('tr')
    //const iconRow = document.createElement('tr')

    //adding the + "°F" to reflect in output
    const tempF = temp + "°F"
    const tempMinF = temp + "°F"
    const tempMaxF = temp + "°F"

    td.innerHTML = tempF
    tdTempMin.innerHTML = tempMinF
    tdTempMax.innerHTML = tempMaxF
    tdMain.innerHTML = description
    //tdIcon.innerHTML = `<i class= "fas ${getWeatherIcon(icon)}"></i>`

    //make sure to show only the users entered date once
    const weatherTableInfo = document.getElementById('weatherTableMain')
    weatherTableInfo.innerHTML = ''
    weatherTableInfo.append(row)
    
    row.append(td,tdTempMin,tdTempMax,tdMain)
    //iconRow.append(tdIcon)
    // weatherTableInfo.append(row)
}

// function getWeatherIcon(iconCode){
//     const weatherIconMap = {
//         '01d': 'fa-sun',
//         '01n': 'fa-moon',
//         '02d': 'fa-cloud-sun',
//         '02n': 'fa-cloud-moon',
//         '03d': 'fa-cloud',
//         '03n': 'fa-cloud',
//         '04d': 'fa-cloud',
//         '04n': 'fa-cloud',
//         '09d': 'fa-cloud-showers-heavy',
//         '09n': 'fa-cloud-showers-heavy',
//         '10d': 'fa-cloud-sun-rain',
//         '10n': 'fa-cloud-moon-rain',
//         '11d': 'fa-bolt',
//         '11n': 'fa-bolt',
//         '13d': 'fa-snowflake',
//         '13n': 'fa-snowflake',
//         '50d': 'fa-smog',
//         '50n': 'fa-smog',
//     }
//     return weatherIconMap[iconCode] || 'fa-question'
// }

function handleNoData(){
    const weatherTableInfo = document.getElementById('weatherTableMain')
    weatherTableInfo.innerHTML = '<tr><td colspan="4">No data available. Please check spelling and try again. </td></tr>'
}

const weatherForm = document.getElementById('weatherForm')
//handle click to get the city name
weatherForm.addEventListener('submit', async(event)=>{
    event.preventDefault()
//display weather for user
    const cityInput = document.getElementById('cityInput')
    const city = cityInput.value

    await getWeatherApiCall(city)
})