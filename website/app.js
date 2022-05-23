/* Global Variables */
//select the button
const generateButt = document.getElementById('generate');
// select the form
const form = document.querySelector('.app__form');
//select the div in holder entry to update the page with information 
const entryHolder = document.getElementById('entryHolder');
//global data object
let projectData = {};


// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=8bcaf0a03ad0799812528c63cbd6ebf9';
const celsius = '&units=metric';// to display the temperature in celsius not kelvin 
//Please note if country is not specified then the search works for USA as a default.


// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth() +1; //getMonth return the brevious month cause it starts from 0 not 1 
let newDate = month+'\/'+ d.getDate()+'\/'+ d.getFullYear();
/*generateButt.onclick = function(){};*/
// Event listener to add function to existing HTML DOM element
generateButt.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    e.preventDefault();
    // to generat icons and display weather info in the entry div
    let divGenerate = ''; 
    //get user input values
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const country = document.getElementById('country').value;
    //to get weather information (temp)
    getTemp(baseURL, newZip, country, apiKey, celsius)
    .then(function (userData) {
      // add data to POST request
      projectData.date = newDate;
      projectData.temp = userData.main.temp;
      projectData.feel = content;
      postData('/addWeatherState', projectData)
    }).then(function (newData) {
      // call updateUI to update browser content
      console.log("This is the data obtained: ", newData);
      updatUI('/updatURL', entryHolder, divGenerate)
    })
  // reset form
  form.reset();

    /*getWeatherinfo(baseURL, newZip, apiKey)
    .then(postData('/addWeatherState', projectData))
    .then(updatUI('/updatURL', entryHolder, divGenerate));*/
}


/*Function to GET web API Data */

const getTemp = async(baseURL, newZip, country, apiKey, celsius)=>{
    const actualURL = baseURL + newZip + ',' + country + apiKey + celsius;
    console.log(actualURL);
    const request = await fetch(actualURL);
    try{
        // userData equals to the result of fetch function
        if(country === "us"){
        const userData = await request.json();
        console.log("the user data is: ", userData);
        return userData;
        }else{
            //warning my app only works in USA country
            alert("please enter \'us' only in the country field");

        }
    }catch(error){
        console.log("error", error);
    }
}

//making async function to post data and making it as json
const postData = async (url = "", data = {date, temp, feel})=>{
    const response = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        //Body data type must match "Content-Type"
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log("hello there is the data recieved", newData);
        return newData
    }catch(error){
        console.log("error", error);
    }
};


const updatUI = async(url ='', entryHolder, divGenerate)=>{
    const request = await fetch(url, {
        method:'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try{
        const allData = await request.json();
        console.log('hi this is the data in app', allData);
        divGenerate = `
        <li class="entry__date">
            <i class="fas fa-calendar-day fa-lg"></i>
            <p id="date">date:<br> ${allData.date}</p>
        </li>
        <li class="entry__temp">
            <i class="fas fa-thermometer-half fa-lg" style="margin-right: 1vw;"></i>
            <p id="temp">Temp:<br> ${allData.temp}&deg; c</p>
        </li>
        <li class="entry__content">
            <i class="fas fa-user-circle fa-lg" style="margin-right: 1vw;"></i>
            <p id="content">you feel:<br> \'${allData.feel}\' <br> :)</p>
        </li>`
        entryHolder.innerHTML = divGenerate;
        const icons = document.querySelectorAll('.fa-lg');
        icons.forEach(icon => icon.style.opacity = '1');
    }catch(error){
        console.log("error", error);
    }
}