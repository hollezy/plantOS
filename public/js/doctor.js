/* DOCTOR SCRIPT
This is the code for the Doctor application. 
In this, the user uploads an image of a plant.
It is sent to GPT's API and the response return is displayed
*/

// Accessing HTML elements to use
const imageForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('plantImage');
const fileChosen = document.getElementById('file-chosen');
const analysisText = document.getElementById('analysisText'); 
const uploadSound = document.getElementById('uploadSound'); 
const loadingBar = document.getElementById('loadingBar'); 

// Function to speak text using Web Speech API
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    let voices = window.speechSynthesis.getVoices();
    
    // Find female voice ('Susan' for Google Chrome)
    let femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('susan') || voice.name.toLowerCase().includes('woman') || voice.name.toLowerCase().includes('female') );

    // If female voice is found then it will be used
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }
    // Speak aloud
    speechSynthesis.speak(utterance);
}


// Changes the text to "File uploaded"
imageInput.addEventListener('change', function () {
    // Checks if file is selected
    if (this.files.length > 0) {
        // Update the text to indicate a file has been uploaded
        fileChosen.textContent = "File Uploaded"; // Change text to "File Uploaded" when file is selected
    }
});

// Function to handle the image upload process
function uploadImage(event) {
    // Prevents the default form submission
    event.preventDefault();

    // Gets the first file is selected by the user
    const imageFile = imageInput.files[0];

    // Checks if file is actually selected
    if (!imageFile) {
        // Alerts the user if no file is selected
        alert("Please select an image file.");
        return;
    }

    // Show the loading bar while image is being processed
    loadingBar.style.display = 'block';

    // Read contents of selected file
    const reader = new FileReader();

    // Once the user has successfully uploaded a file
    reader.onload = function(e) {
        // Displays uploaded image in page
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block'; // CSS formatting

        // Update text to indicate that the doctor is being called
        analysisText.innerText = "CALLING PLANT DOCTOR ... PLEASE WAIT...";
        speakText(analysisText.innerText); // Speaking the text

        // Play sound for immersion
        uploadSound.play(); //
    };

    // Start reading the image file as a URL
    reader.readAsDataURL(imageFile);

    // Prepare the image file to be sent to the server
    const formData = new FormData();
    formData.append('plantImage', imageFile);

    // Sending the image to the server using POST request
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => { //  Response received
        // Display the result or a default message if this fails
        analysisText.innerHTML = data.analysis || "Doctor is unavailable. Please try again.";
        speakText(analysisText.innerHTML); // Speaking the response

        // Reset the file chosen text
        fileChosen.textContent = "No file selected"; 

        // Hide the loading bar
        loadingBar.style.display = 'none';
    })
    .catch(error => {
        // Log any errors here
        console.error('Error:', error);
        analysisText.innerText = "Doctor is unavailable. Please try again.";
        speakText(analysisText.innerText); // Speaking the error message

        // Reset file chosen
        fileChosen.textContent = "No file selected";

        // Hide the loading bar 
        loadingBar.style.display = 'none';
    });
}

// Event listener for form submission
imageForm.addEventListener('submit', uploadImage);
