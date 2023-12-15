/* This is the PIXI application for the plant.
This is a HTML library that allows me to add gamification elements */

// Global variables
let app; // 
let nameText;

// Initalise the PIXI app
function initPixiApp() {
    // Get the HTML elements for the container of the PIXI canvas
    const plantContainer = document.getElementById('plantCanvasContainer');
    const bottomBar = document.getElementById('bottomBar');

    // Resize the PIXI app based on the window size
    function resizeApp() {
        // Calculate the width and height of the window and bottom bar
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const bottomBarHeight = bottomBar.clientHeight;

        // Resize the PIXI renderer and adjust the position of the plant sprite
        app.renderer.resize(windowWidth, windowHeight - bottomBarHeight);
        plant.x = windowWidth / 2;
        plant.y = windowHeight - bottomBarHeight - plant.height / 2;

        // Update the position of the name text to align with the center of the screen
        nameText.x = app.screen.width / 2;
    }

    // Create a new PIXI application with a specified width, height and background color
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight - bottomBar.clientHeight,
        backgroundColor: 0xE7EDDE
    });
    
    // Append the PIXI view to the plant container
    plantContainer.appendChild(app.view);

    // Load the plant image as a PIXI sprite
    const plant = PIXI.Sprite.from('./img/plant.png');
    plant.anchor.set(0.5, 0.5);
    plant.x = app.screen.width / 2;
    plant.y = app.screen.height - plant.height / 2;
    plant.width = 100;
    plant.height = 140;
    app.stage.addChild(plant);

    // Make the plant sprite interactive
    plant.buttonMode = true;

    // Retrieve the plant name from localStorage
    const plantName = localStorage.getItem('plantName') || 'Planty';

    // Define the style for the text
    const textStyle = new PIXI.TextStyle({
        fontFamily: 'Chicago',
        fontSize: 24,
        fill: 0x61917f
    });

    // Create a new PIXI text object
    nameText = new PIXI.Text(plantName, textStyle);
    nameText.anchor.set(0.5, 0); 
    nameText.x = app.screen.width / 2;
    nameText.y = 10;
    app.stage.addChild(nameText);

    // Resize app
    window.addEventListener('resize', resizeApp);
    resizeApp();
}

// Initialize the PIXI app
document.addEventListener('DOMContentLoaded', () => {
    if (document.fonts) {
        document.fonts.load('10pt "Chicago"').then(initPixiApp);
    } else {
        initPixiApp();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Load the font first
    const plantType = localStorage.getItem('plantType');
    if (plantType) {
        const plantTypeSpan = document.getElementById('plantTypeDisplay');
        if (plantTypeSpan) {
            plantTypeSpan.textContent = plantType;
        }
    }
});