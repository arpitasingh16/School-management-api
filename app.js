const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes/route'); 
const port = 3000;
const path = require('path');
// Middleware to parse JSON request body
app.use(bodyParser.json());

app.use('/', route);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/addSchool', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/addSchool', route);  
app.use('/listSchool', route); 

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
