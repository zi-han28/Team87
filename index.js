
// This is my main entry point for my web application

// import modules
const express = require('express');// Web framework for handling HTTP requests
const app = express(); // Create an express application
const port = 3000; // port number 
var bodyParser = require("body-parser");// Parse form data

app.use(bodyParser.urlencoded({ extended: true })); // parse url encoded form data
app.set('view engine', 'ejs'); //use ejs for rendering
app.use(express.static(__dirname + '/public')); // set static files from public directory

//Default Home Page Route
//Endpoint: GET /
//Purpose: Renders the main homepage for the Attendee and Organiser sections.
//Inputs: None
//Outputs: Renders the 'main.ejs' template.
app.get("/", (req, res) => {
    res.render("main");
});
// Set up SQLite database
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // exit if unable to connect with database
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON");// enforce foreign key constraints in SQLite
    }
});

// Organiser Routes
// Path Prefix: /organiser
// Purpose: Handles all routes related to the organiser's functionality, such as managing events and viewing bookings
const organiserRoutes = require('./routes/organiser');
app.use('/organiser', organiserRoutes);

 // Edit Event Routes
 // Path Prefix: /organiser/editEvent
 // Purpose: Handles routes for creating and editing events
const editEventRoutes = require('./routes/editEvent');
app.use('/organiser/editEvent', editEventRoutes);

 // Settings Routes
 // Path Prefix: /settings
 // Purpose: Handles routes for updating site settings
const settingsRoutes = require('./routes/settings');
app.use('/settings', settingsRoutes);

 // Attendee Routes
 // Path Prefix: /attendee
 // Purpose: Handles all routes related to attendees, such as viewing events and making bookings.
const attendeeRoutes = require('./routes/attendee');
app.use('/attendee', attendeeRoutes);

 // Edit Attendee Routes
 // Path Prefix: /attendee/event
 // Purpose: Handles routes for attendees to view and book specific events.
const editAttendeeRoutes = require('./routes/editattendee');
app.use('/attendee/event', editAttendeeRoutes);



// Start the web application
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

