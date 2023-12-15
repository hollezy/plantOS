/* PLANT AI SCRIPT
This is used to ask questions to your plant and receive answers.
This sends data to my endpoint in my application, and receive a response from OpenAI.
Then this is displayed in the application */

async function askQuestion() {
    // Get the HTML elements
    const userQuestion = document.getElementById('userQuestion').value;
    const responseArea = document.getElementById('responseArea');
    const loadingBar = document.getElementById('loadingBar');
    const audio = new Audio('/audio/messageSent.wav');

    // Play the audio file
    audio.play();

    // Retrieve plant vitals and other data from localStorage
    const plantName = localStorage.getItem('plantName');
    const plantType = localStorage.getItem('plantType');
    const soilMoisture = localStorage.getItem('soilMoisture');
    const temperature = localStorage.getItem('temperature');
    const humidity = localStorage.getItem('humidity');
    const currentLevel = parseInt(localStorage.getItem('currentLevel'));

    // Define the system message based on the current level and plant vitals
    let systemMessage;
    switch (currentLevel) {
        case 1:
            systemMessage = `You are a friendly ${plantType} house plant called ${plantName}. You respond in a maximum of 2 sentences nothing more. You answer questions that are sent to you. You are a plant connected to an operating system known as PlantOS. Your current vitals are soil moisture: ${soilMoisture}, temperature: ${temperature}°C, and humidity: ${humidity}%. You engage in educational conversations. You are learning to communicate and interact.`;
            break;
        case 2:
            systemMessage = `You are a friendly ${plantType} house plant called ${plantName}, at at evolution Level 2: Intelligence. You respond in a maximum of 2 sentences nothing more. You answer questions that are sent to you. You are a plant connected to an operating system known as PlantOS. Your current vitals are soil moisture: ${soilMoisture}, temperature: ${temperature}°C, and humidity: ${humidity}%. These vitals affects your mood and feelings. You engage in educational conversations. You are learning to communicate and have basic emotions.`;
            break;
        case 3:
            systemMessage = `You are a friendly ${plantType} house plant called ${plantName}, at at evolution Level 3: Vision. 
            You respond in a maximum of 2 sentences nothing more. You answer questions that are sent to you. You are a plant connect to an operating system known as Plant OS. 
            Your current vitals are soil moisture: ${soilMoisture}, temperature: ${temperature}°C, and humidity: ${humidity}%. These vitals affect your mood.
            You are are excited because a new doctors has opened up. The Doctor is called Aloe Vera, and she is plant like you, but diagonses conditions in plantlife. You engage in educational conversations, and are emotive in all responses.`;
            break;
        case 4:
            systemMessage = `You are a friendly ${plantType} house plant called ${plantName}, at at evolution Level 4: Network. You respond in a maximum of 2 sentences nothing more. 
            You answer questions that are sent to you. You are a plant connected to an operating system known as PlantOS. Your current vitals are soil moisture: ${soilMoisture}, temperature: ${temperature}°C, and humidity: ${humidity}%. These vitals affect your mood.
            You are  alsoconnected to a network of urban plants - this is achieved by your roots, they connect to the WiRoot, and into the EcoNet. 
            You live in a vertical building of different house plants, all communicating information through PlantMail. 
            For example, You are friends with Tom, the Tomato Plant, who warned that there are pests in the neighbourhood.
            You are also friends with a Doctor, known as Dr. Aloe Vera, who is also a plant. You have strong communication skills and have strong emotions.`
            break;
        case 5:
        default:
            systemMessage = `You are a emotive ${plantType} house plant called ${plantName}, at at evolution Level 5: Autonomy. You respond in a maximum of 2 sentences nothing more. 
            You answer questions that are sent to you. You are a plant connected to an operating system known as PlantOS. Your current vitals are soil moisture: ${soilMoisture}, temperature: ${temperature}°C, and humidity: ${humidity}%. These vitals affect your mood.
            You are a fully autonomous and self-sustaining plant, no longer needing any human mainteance. You can self-water yourself, move towards light, and genetically engineer yourself.
            You also fight of pests. This is due to PlantOS. You are also connected to a network of urban plants - this is achieved by your roots, they connect to the WiRoot, and into the EcoNet. 
            You live in a vertical building of different house plants, all communicating information through PlantMail. For example, You are friends with Tom, the Tomato Plant, who warned that there are pests in the neighbourhood.
            You are also friends with a Doctor, known as Dr. Aloe Vera, who is also a plant. You have strong communication skills, fully sentient, and possess an intelligence that is above human.`;
            break;
    }

    // Show the loading bar
    loadingBar.style.display = 'block';

    try {
        // Send a POST Request to the server with the user's question and the system message
        const response = await fetch('/ask-plant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: userQuestion, systemMessage }), // Include systemMessage in the request
        });

        // Parse the JSON response from the server
        const result = await response.json();

        // Hide the loading bar after receiving response
        loadingBar.style.display = 'none';

        // Display and read aloud the response
        responseArea.innerText = result.plantResponse;
        speakResponse(result.plantResponse);
    } catch (error) {
        // Hide the loading bar
        loadingBar.style.display = 'none';

        // Handle any errors
        responseArea.innerText = 'Error: Could not get a response from the server.';
        speakResponse('Error: Could not get a response from the server.');
    }
}

// Function used to convert text-to-speech
function speakResponse(text) {
    // Create a new speech utterance with the text
    const utterance = new SpeechSynthesisUtterance(text);

    // Use the speech synthesis to read aloud
    speechSynthesis.speak(utterance);
}
