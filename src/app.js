/* SERVER CODE
This is the script for the back-end development of my application. 
Includes communication with Ardiuno, OpenAI, and an external database. 
*/

// Import required modules
const express = require('express'); // Express framework for building web applications
const path = require('path'); // For working with file paths
const fs = require('fs'); // File system module for file operations
const { SerialPort } = require('serialport'); // Module for Ardiuno serial port communication
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws'); // Module for WebSocket, a protocol for real-time communication
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads in Express
const OpenAI = require('openai'); // OpenAI's API module, for GPT and AI vision
const cloudinary = require('cloudinary').v2; // Cloudinary module for cloud-based image mangagement

// Configure environment variables for security
require('dotenv').config();

// Setting up the Express application
const app = express();
const server = require('http').createServer(app); // Create a HTTP server using the Express app
const wss = new WebSocket.Server({ server }); // Set up a WebSocket server using the Express app

app.use(express.json());


// Configuring Cloudinary with credentials
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to handle file uploads
app.use(fileUpload({
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: true,
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// Setting up serial port communication with Arduino
const port = new SerialPort({
    path: 'COM10', // IMPORTANT: Change to correct serial port
    baudRate: 9600,
});

// Handling errors in serial port communication
port.on('error', function(err) { 
    console.log('Error: ', err.message);
});

// Parse incoming serial data from Ardiuno
const parser = port.pipe(new ReadlineParser({ // Parse incoming data from Arduino
    delimiter: '\r\n' // Seperates each data chunk
}));


// Connection to WebSocket for real-time communication
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', function(message) {
        serialPrint(message); // Forward the message to the Arduino
    });

    // When data is received from the serial port, send it to the WebSocket
    parser.on('data', (data) => {
        console.log('Arduino:', data); // Log the received data
        ws.send(data); // Send data to the WebSocket client
    });
});

// Function to send a message to Arduino
function serialPrint(message) {
    let messageString = message.toString(); // Convert the message to a string

    port.write(messageString + '\n', function(err) { // Add a newline character
        if (err) {
            // Error handling
            return console.log('Error on write: ', err.message);
        }
        // Log message to console 
        console.log('Message sent:', messageString);
    });
}


// Endpoint to handle image uploads
app.post('/upload', async (req, res) => {
    try {
        // Check if an image is uploaded
        if (!req.files || !req.files.plantImage) {
            return res.status(400).send('No file uploaded.');
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.files.plantImage.tempFilePath);

        // System message to set the context for the AI
        const systemMessage = "Doctor Aloe Vera, as an enchanting plant care expert, and an Aloe Vera plant herself, captivates with her knowledge and whimsical charm. Her language is engaging and accessible, perfect for providing advice on plant care. When users share photos and details of their plants, Doctor Aloe Vera offers expert assessments and care suggestions, focusing on essentials like watering, sunlight, nutrients, and pest control. She ensures her advice is easy to understand and apply, always delivered in short paragraphs, limited to a maximum of four sentences. This succinct style keeps her responses clear and to the point. For non-plant photos, she responds in a maximum of two sentences with a playful quip, steering the conversation back to plants, and ends with asking for a photograph of a plant. Doctor Aloe Vera's nurturing character is clear in every interaction, making her feel like a wise, plant mentor, and emphasises with plants, since she too is a plant.";

        // Send the message and image URL to OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system", // Set context for AI
                    content: systemMessage
                },
                {
                    role: "user",
                    content: [
                        { type: "image_url", image_url: result.url } // Send image URL
                    ]
                }
            ],
            // Token limit - this limits the AI in terms of length
            max_tokens: 300
        });

        // Extracting the response from OpenAI's response
        // It is set as a variable as analysis for the front-end
        const analysis = response.choices[0].message.content;
        
        // Send the analysis back to the client
        res.json({ analysis });

    // Handling any errors during the process
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request.');
    }
});

app.post('/ask-plant', async (req, res) => {
    try {
        // Check if both a text question and system message are provided
        if (!req.body || !req.body.question || !req.body.systemMessage) {
            return res.status(400).send('No question or system message provided.');
        }

        const userQuestion = req.body.question;
        const systemMessage = req.body.systemMessage;

        // Send the text question and system message to OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: systemMessage
                },
                {
                    role: "user",
                    content: userQuestion
                }
            ],
            max_tokens: 300
        });

        const plantResponse = response.choices[0].message.content;
        
        res.json({ plantResponse });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request.');
    }
});



// Serve files from the public directory
app.use(express.static('public'));

// Define the port for the server to listen on
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});