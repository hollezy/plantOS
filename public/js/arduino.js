/* ARDUINO SCRIPT -
This contains communication between the Arduino and the WebSocket.io.
This allows Arduino data to be displayed on the webpage
*/


// Establish a WebSocket connection to the server
const ws = new WebSocket('ws://localhost:3000');

// Triggered when the WebSocket connection is succesfully established
ws.onopen = function() {
    // Log message to console
    console.log('WebSocket Client Connected');
};

// When a message is received from the WebSocket (Arduino)
ws.onmessage = function(event) {

    // Check if the message contains soil moisture data
    if (event.data.startsWith('Soil Moisture:')) {
        // Extract Value
        const moistureLevel = event.data.split(':')[1].trim();
        // Display soil moisture in HTML
        document.getElementById('soilMoistureValue').textContent = moistureLevel;
        // Store the soil moisture value in local storage
        localStorage.setItem('soilMoisture', moistureLevel);
    }

    // Check if the message contains humidity data
    if (event.data.startsWith('Humidity:')) {
        // Extract value
        const humidity = event.data.split(':')[1].trim();
        // Display humidity value in HTML
        document.getElementById('humidityValue').textContent = humidity;
        // Store the humidity value in local storage
        localStorage.setItem('humidity', humidity);
    }

    // Check if the message is temperature data
    if (event.data.startsWith('Temperature:')) {
        // Extract value
        const temperature = event.data.split(':')[1].trim();
        // Display temperature value in HTML
        document.getElementById('temperatureValue').textContent = temperature;
        // Store the temperature value in local storage
        localStorage.setItem('temperature', temperature);
    }
};
