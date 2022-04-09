/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=949f0e88b75f2e97f6bc90bec403af28';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener & Function
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemperature(baseURL, zipCode, apiKey)
    .then(function (data) {
        console.log(data);
        postData ('/addWeatherData', {
            date: newDate, 
            temperature: data.main.temp, 
            userResponse: feelings});
    })
    .then((data) => updateUI())
};

// GET
const getTemperature = async (baseURL, zipCode, apiKey) => {
    const res = await fetch (baseURL+zipCode+apiKey)
    console.log(res);
    if (zipCode) {
        try {
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log('error', error);
        }
    } else {
        alert('Please enter zip here!');
    }
    
};

//POST 
const postData = async (url = '', data = {}) => {
    const postResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postResponse.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

// UI Update

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
        console.log(allData);
    } catch (error) {
        console.log('error', error);
    }
};