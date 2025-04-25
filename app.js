const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes/route'); 
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

app.use('/', route);

app.use('/addSchool', route);  
app.use('/listSchool', route); 

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
