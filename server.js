// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const req = require('express/lib/request');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));
//app.use(express.static(path.join(__dirname +'website)));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});




//creating array to save projectData object
const data = [];
// making post to retrieve data and post route
app.post('/addWeatherState', (request, response)=>{

    let newData = request.body;
    projectData['date'] = newData.date;
    projectData['temp'] = newData.temp;
    projectData['feel'] = newData.feel;
    data.push(projectData);
    response.send(projectData);
    console.log("This is the data retreived from app.js and posted here in the server: ", projectData);
 });

 //create get function to get the updating occure in the frontend page after posting the data

 app.get('/updatURL', (request, response)=>{
     response.send(projectData);
     console.log("its data from server sent to client \"update frontend\" ", projectData);
 })