'use strict';

// Imports dependencies and set up http server

const PAGE_ACCESS_TOKEN = process.env.EAAeIgYlrrccBAGc7w8vQAWO6CxOQrcJyXkzdsrAT5JYh4TVlhzIr6Nc31Fl991oDCbQEmvaHob3jlJ2gTB4Vop5n0Rukbe1HI4kJRCZBZCSvQ2YFB9dI8xvuenUryFjZCgHY9HT8J7XZBI2vQBUKfLDE7IXTKxm5pEw1VQZAG1gZDZD;

const
express = require('express'),
bodyParser = require('body-parser'),
app = express().use(bodyParser.json());// creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 5000, () => console.log('webhook is listening'));
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
         
         let body = req.body;
         
         // Checks this is an event from a page subscription
         if (body.object === 'page') {
         
         // Iterates over each entry - there may be multiple if batched
         body.entry.forEach(function(entry) {
                            
                            // Gets the body of the webhook event
                            let webhook_event = entry.messaging[0];
                            console.log(webhook_event);
                            
                            // Get the sender PSID
                            /*let sender_psid = webhook_event.sender.id;
                            console.log('Sender PSID: ' + sender_psid);*/
                            
                            });
         
         // Returns a '200 OK' response to all requests
         res.status(200).send('EVENT_RECEIVED');
         } else {
         // Returns a '404 Not Found' if event is not from a page subscription
         res.sendStatus(404);
         }
         
         });
// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
        
        // Your verify token. Should be a random string.
        let VERIFY_TOKEN = "thisisatoken"
        
        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
        
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
        
        } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
        }
        }
        });


// Handles messages events
function handleMessage(sender_psid, received_message) {
    
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    
}
