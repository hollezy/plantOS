/* MAIN SCRIPT
This is the main script for the main interaction and functionality of the application
Includes the script to make windows draggable, the dialog appears at first, and various toggles */

// Global variables
const shortcutIcons = document.querySelectorAll('.shortcut-icon');

// Function to play audio
function playAudio() {
    var audio = new Audio('audio/floatingCat.mp3');
    audio.play();
}

// Updates the current level to the Local Storage
function updateLevel(newLevel) {
    localStorage.setItem('currentLevel', newLevel);
}

// Function to display time
function timeBar() {
    // Gets the current date and time
    const currentDate = new Date();
    // Formats time as string and trims
    const currentTime = currentDate.toLocaleTimeString().slice(0, 5);
    // Displays time in HTML
    document.getElementById('currentTime').textContent = currentTime;
}

// Function to update the shorctu visibility dependening on level
function updateShortcutVisibility(level) {
    // Selects all shortcut icons
    const shortcuts = document.querySelectorAll('.shortcut-icon');

    // Loops through each shortcut
    shortcuts.forEach((shortcut) => {
        // Gets the level of each shortcut defined in HTML
        const shortcutLevel = parseInt(shortcut.getAttribute('data-level'));
        // Toggles the display
        shortcut.style.display = shortcutLevel <= level ? 'block' : 'none';
    });
}

// Function to toggle windows and bring to front when shown
function toggleWindow(iconId, windowId) {
    // Gets the HTML components
    const icon = document.getElementById(iconId);
    const window = document.getElementById(windowId);

    // Event for when the icons are clicked
    icon.addEventListener('click', () => {
        // Checks if the window is currently hidden
        const isHidden = window.style.display === 'none' || window.style.display === '';
        // Toggles window's visibility
        window.style.display = isHidden ? 'block' : 'none';
        if (isHidden) {
            // Increments the z-index to bring the window to the front
            windowZIndex++;
            window.style.zIndex = windowZIndex;
        }
    });
}

// Code executed when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Hide all windows initially and then fade them in after 5 seconds
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => window.style.opacity = '0');

    // Hide all shortcut icons initially
    shortcutIcons.forEach(icon => icon.style.display = 'none');

    // After 5 seconds, set the opacity of each window to 1 (visible)
    setTimeout(() => {
        windows.forEach(window => {
            window.style.opacity = '1';
        });
    }, 5000);

    // Display the first opening dialog
    const dialog = document.querySelector('.standard-dialog');
    dialog.style.display = 'block';

    // Loops through all shortcut icons and adds click listeners
    shortcutIcons.forEach(icon => {
        const windowId = icon.getAttribute('data-window-id');
        // Assign click listeners to each icon, exlucding audio
        if (windowId !== 'audio') {
            icon.addEventListener('click', () => {
                const windowElement = document.getElementById(windowId);
                const isHidden = windowElement.style.display === 'none' || windowElement.style.display === '';
                windowElement.style.display = isHidden ? 'block' : 'none';
                if (isHidden) {
                    windowZIndex++;
                    windowElement.style.zIndex = windowZIndex;
                }
            });
        } else {
            // Run the playAudio() function instead
            icon.addEventListener('click', playAudio);
        }
    });

    // Get HTML elements for the opening dialog
    const startButton = document.getElementById('startButton');
    const loadingDialog = document.querySelector('.standard-dialog');
    const loadingBar = document.querySelector('.loading-bar');
    const startupSound = document.getElementById('startupSound');
    const connectingMessage = document.querySelector('.loading-dialog h3');

    // Handle the form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {

        // Prevent default form submission
        event.preventDefault(); 

        // Handle plant name input and in local storage
        const plantName = document.getElementById('plantNameInput').value;
        localStorage.setItem('plantName', plantName);
        displayPlantName(plantName);

        // Handle plant type selection and storage
        const plantType = document.getElementById('plant-select').value;
        localStorage.setItem('plantType', plantType);
        displayPlantType(plantType);

        // Update HTML elements for the loading process
        form.style.display = 'none';
        startButton.style.display = 'none';
        loadingBar.style.display = 'block';

        // Play startup sound
        startupSound.play();

        // Show connecting message
        connectingMessage.style.display = 'block';

        // After 5 seconds, connection established with PlantOS
        setTimeout(() => {
            loadingDialog.style.display = 'none';
            showHideElements();
        }, 5000);

        // Refresh the iframe
        document.getElementById('plantIframe').contentWindow.location.reload();

        // Start updating the time on intervals
        setInterval(timeBar, 1000);
    });

    // Function to show and hide UI elements
    function showHideElements() {
        // Display the menu bar and hide loading elements
        const menuBar = document.querySelector('ul[role="menu-bar"]');
        menuBar.style.display = 'flex';

        loadingDialog.style.display = 'none';
        loadingBar.style.display = 'none';

        // Make plant and readme visible
        document.getElementById('window-draggable-plantagotchi').style.opacity = '1';
        document.getElementById('window-draggable-plantagotchi').style.display = 'block';

        document.getElementById('window-draggable-readme').style.opacity = '1';
        document.getElementById('window-draggable-readme').style.display = 'block';

        // Update to level 1
        level = 1;
        updateShortcutVisibility(level);
        updateReadMe(level);
    }

    // Update PlantType
    document.getElementById('plant-select').addEventListener('change', displayPlantType);
});

// Function to display the plant name
function displayPlantName(name) {
    // Get the HTML span
    const plantNameSpan = document.getElementById('plantNameDisplay');

    // If exists, display in text content
    if(plantNameSpan) {
        plantNameSpan.textContent = name;
    }
}

// Function to display the plant type
function displayPlantType(type) {
    // Get the HTML span
    const plantTypeSpan = document.getElementById('plantTypeDisplay');

    // If exists, display in text content
    if (plantTypeSpan) {
        plantTypeSpan.textContent = type;
    }
}


// Credit to WeatherWidget.io
// Code from https://weatherwidget.io/
// Accessed: 14 January 2023
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');