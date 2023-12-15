/* README SCRIPT
This is the code for the README.txt application. 
This updates based on the software number (1, 2, 3, 4 & 5)
It also changes the visibility of the shorcuts
*/

let levelText; 

// Create  Audio object for the update sound
var softwareUpdateSound = new Audio('audio/softwareUpdate.wav');

function updateReadMe(level) {
    // Retrieve the HTML element
    let readmeContent = document.getElementById('readme-content');

    // Check number of level and update README content
    if (level === 1) {
        // For Level 1
        readmeContent.innerHTML = `
            <pre class="smallAscii">
                _                _     ___   ____            _ 
                 _ __  | |  __ _  _ __  | |_  / _ \\ / ___|  __   __ / |
                | '_ \\ | | / _\` || '_ \\ | __|| | | |\\___ \\  \\ \\ / / | |
                | |_) || || (_| || | | || |_ | |_| | ___) |  \\ V /_ | |
                | .__/ |_| \\__,_||_| |_| \\__| \\___/ |____/    \\_/(_)|_|
                |_|                                                    
            </pre>
            <p>Welcome to PlantOS Version 1.0, an operating system designed for the management of plants.</p>
            <p><b>Plant Evolution:</b> Level 1 - Basics</p>
            <p>Please continue to check for future releases!</p>
            <ul>
                <li><b>Your New Plant:</b> Version 1.0 introduces a basic plant, and its digital counterpart. Users can engage with a virtual plant that closely mimics the attributes and behaviors of its real-world counterpart.</li>
                <li><b>Customizable Plant Name:</b> Give it a name!</li>
                <li><b>Vitals:</b> Alongside the plant, you can also read it's vitals!</li>
            </ul>
            <p>Please check software updates, more coming soon!</p>
        `;
    } else if (level === 2) {
        // For level 2
        readmeContent.innerHTML = `
            <p>Welcome to PlantOS Version 2.0, now with more features!</p>
            <p><b>Plant Evolution:</b> Level 2 - Intelligence</p>
            <p>The plant has gained intelligence and a voice.</p>
            <p>Feel free to talk to it, via the 'Chat' button.</p>
        `;
    } else if (level === 3) {
        // For level 3
        readmeContent.innerHTML = `
            <p>Welcome to PlantOS Version 3.0</p>
            <p><b>Plant Evolution:</b> Level 3 - Vision</p>
            <p>The plant has now gained the power of sight!</p>
            <p>The plant doctor is now available!</p>
        `;
    } else if (level === 4) {
        // For level 4
        readmeContent.innerHTML = `
            <p>Welcome to PlantOS Version 4.0.</p>
            <p><b>Plant Evolution:</b> Level 4 - Networked</p>
            <p>The plant is now connected to it's urban ecosystem</p>
            <p>It uses it's WiRoot to connect to other plants</p>
            <p>They can communicate important vitals and information</p>
        `;
    } else if (level === 5) {
        // For level 5
        readmeContent.innerHTML = `
            <p>Welcome to PlantOS Version 5.0.</p>
            <p><b>Plant Evolution:</b> Level 5 - Automated</p>
            <p>The plant no longer needs a human!</p>
            <p>Version 5.0 introduces full automation for your plant</p>
            <p>It can self-water itself, move towards light, and even genetically modify itself!</p>
        `;
    }
}

// Function used to convert text-to-speech
function speakText(text) {
    // Create a new speech utterance with the text
    const utterance = new SpeechSynthesisUtterance(text);

    // Use the speech synthesis to read aloud
    speechSynthesis.speak(utterance);
}

// Update to Level 2
document.getElementById('version-2').addEventListener('click', function() {
    // Play the update sound
    softwareUpdateSound.play();

    // Speak the level title
    levelText = "Level 2: Intelligence"
    speakText(levelText);

    // Update visibility of shortcuts
    updateShortcutVisibility(2);
    // Disable the button after it's clicked
    this.disabled = true;
    // Update README text
    updateReadMe(2);
    // Change text content to "Installed"
    this.textContent = 'Installed';

    // Store the level in localStorage
    level = 2;
    localStorage.setItem('currentLevel', level);

    // Update the level
    updateLevel(newLevel);
});

// Update to Level 3
document.getElementById('version-3').addEventListener('click', function() {
    // Play the update sound
    softwareUpdateSound.play();

    // Speak the level title
    levelText = "Level 3: Vision"
    speakText(levelText);

    // Update shortcuts
    updateShortcutVisibility(3); 

    // Disable the button after it's clicked
    this.disabled = true;

    // Update README text
    updateReadMe(3);

    // Change text content to "Installed"
    this.textContent = 'Installed';

    // Store the level in localStorage
    level = 3;
    localStorage.setItem('currentLevel', level);

    // Update the Level
    updateLevel(newLevel); 

});

// Update to Level 4
document.getElementById('version-4').addEventListener('click', function() {
    // Play the update sound
    softwareUpdateSound.play();

    // Speak the level title
    levelText = "Level 4: Networked"
    speakText(levelText);

    // Update the level to 4
    updateShortcutVisibility(4); 

    // Disable the button after it's clicked
    this.disabled = true;

    // Update README
    updateReadMe(4);

    // Update text to "Installed"
    this.textContent = 'Installed';

    // Store the level in localStorage
    level = 4;
    localStorage.setItem('currentLevel', level);

    // Update the level
    updateLevel(newLevel); 
});

// Verison 5
document.getElementById('version-5').addEventListener('click', function() {
    // Play the update sound
    softwareUpdateSound.play();

    // Speak the level title
    levelText = "Level 5: Autonomous"
    speakText(levelText);

    // Update to Level 
    updateShortcutVisibility(5);

    // Disable the button after it's clicked
    this.disabled = true;

    // Update README
    updateReadMe(5);
    this.textContent = 'Installed';

    // Store the level in localStorage
    level = 5;
    localStorage.setItem('currentLevel', level);
});