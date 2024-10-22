// external packages
const express = require('express');
const path = require('path');

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());

// Serve static files from the public directory
webApp.use(express.static(path.join(__dirname, 'public')));

// Server Port
const PORT = process.env.PORT || 5000;

// Home route (optional, can be removed if not needed)
webApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const DIALOGFLOW_API = require('./helper_functions/dialogflow_api');

// Website widget route
webApp.get('/website', async (req, res) => {
    let text = req.query.text;
    let sessionId = req.query.mysession;

    console.log('A request came.');
    console.log(`Query text --> ${text}`);
    console.log(`Session id --> ${sessionId}`);

    let intentData = await DIALOGFLOW_API.detectIntent('en', text, sessionId);

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (intentData.status == 1) {
        res.send(intentData.text);
    } else {
        res.send('Chatbot is having problem. Try again after sometime.');
    }
});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
});
