async function attachEvents() {
    // attaching event Listener to the search button
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

async function getWeather() {
    //getting the needed DOM elements
    const inputField = document.getElementById('location');
    const forecastSectionElement = document.getElementById('forecast');
    const currentSectionElement = document.getElementById('current');
    const upcomingSectionElement = document.getElementById('upcoming');

    forecastSectionElement.style.display = '';

    //Emptying currentSectionElement and the upcomingSectionElement from previous results by skipping the first rows titled 'Current conditions' and 'Three-day forecast' 
    Array.from(currentSectionElement.querySelectorAll('div')).forEach((el, i) => {
        i !== 0 ? el.remove() : el;
    })
    Array.from(upcomingSectionElement.querySelectorAll('div')).forEach((el, i) => {
        i !== 0 ? el.remove() : el;
    })


    //sending a GET request to the server and converting the promise to object(array of objects in this case) using .json()
    const url = `http://localhost:3030/jsonstore/forecaster/locations`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        //getting the searched by user object from the array of objects
        let currLocation = Object.values(data).find(x => x.name == inputField.value);

        if (response.status != 200 || !currLocation) { // if the head of the response is different from 200 we don't convert the body to json as that would throw an error
            throw new Error('City not found');
        }

        //sending the 2 GET requests parallel as they don't depend on each other
        const [dataCurr, dataUpcoming] = await Promise.all([
            getCurrForecast(currLocation.code),
            getUpcomingForecast(currLocation.code)
        ]);

        //creating nested element using the 'e' function
        let currWeatherData = getDayReport(dataCurr.forecast);
        let currWeather = e('div', { className: 'forecasts' },
            e('span', { className: 'condition-symbol' }, currWeatherData.symbol),
            e('span', { className: 'condition' },
                e('span', { className: 'forecast-data' }, dataCurr.name),
                e('span', { className: 'forecast-data' }, `${currWeatherData.lowTemp}°/${currWeatherData.highTemp}°`),
                e('span', { className: 'forecast-data' }, currWeatherData.condition)));

        currentSectionElement.appendChild(currWeather);

        //creating nested element for the upcoming forecast array of 3 days
        let upcWeatherData1 = getDayReport(dataUpcoming.forecast[0]);
        let upcWeatherData2 = getDayReport(dataUpcoming.forecast[1]);
        let upcWeatherData3 = getDayReport(dataUpcoming.forecast[2]);
        let upcWeather = e('div', { className: 'forecast-info' },
            e('span', { className: 'upcoming' },
                e('span', { className: 'symbol' }, upcWeatherData1.symbol),
                e('span', { className: 'forecast-data' }, `${upcWeatherData1.lowTemp}°/${upcWeatherData1.highTemp}°`),
                e('span', { className: 'forecast-data' }, upcWeatherData1.condition)),
            e('span', { className: 'upcoming' },
                e('span', { className: 'symbol' }, upcWeatherData2.symbol),
                e('span', { className: 'forecast-data' }, `${upcWeatherData2.lowTemp}°/${upcWeatherData2.highTemp}°`),
                e('span', { className: 'forecast-data' }, upcWeatherData2.condition)),
            e('span', { className: 'upcoming' },
                e('span', { className: 'symbol' }, upcWeatherData3.symbol),
                e('span', { className: 'forecast-data' }, `${upcWeatherData3.lowTemp}°/${upcWeatherData3.highTemp}°`),
                e('span', { className: 'forecast-data' }, upcWeatherData3.condition)));

        upcomingSectionElement.appendChild(upcWeather);
    }
    catch (error) {
        let errorMessage = e('div', {}, 'Error');
        currentSectionElement.appendChild(errorMessage);
    }
}


async function getCurrForecast(cityCode) {
    //sending a GET request to server for todays forecast by searched location
    const urlCurr = `http://localhost:3030/jsonstore/forecaster/today/${cityCode}`;
    const responseCurr = await fetch(urlCurr);
    const dataCurr = await responseCurr.json();

    return dataCurr;
}

async function getUpcomingForecast(cityCode) {
    //sending a GET request to server for upcoming forecast by searched location
    const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`;
    const responseUpcoming = await fetch(urlUpcoming);
    const dataUpcoming = await responseUpcoming.json();

    return dataUpcoming;
}

function getDayReport(forecast) {

    const lowTemp = forecast.low;
    const highTemp = forecast.high;
    const condition = forecast.condition;
    let symbol = '';
    switch (condition) {
        case 'Sunny': symbol = '☀'; break;
        case 'Partly sunny': symbol = '⛅'; break;
        case 'Overcast': symbol = '☁'; break;
        case 'Rain': symbol = '☂'; break;
    }

    return { lowTemp: lowTemp, highTemp: highTemp, condition: condition, symbol: symbol };
}

function e(type, attr, ...content) {
    let element = document.createElement(type);

    for (let prop in attr) {
        element.classList.add(attr[prop]);
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}