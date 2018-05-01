// ==============================================================================
// DEPENDENCIES


var express = require("express");
var bodyParser = require("body-parser");




// this makes node understand that an "express" server is created
var app = express();

// initial port. 
var PORT = process.env.PORT || 8080;

// with bodyparser, server can  interpret data sent to it easily.

app.use(bodyParser.json()); //standard
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



// This points the server to a series of "route" files.
// These routes give the server a map of how to respond when users visit or request data from various URLs.

require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);


// The code below starts the server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
