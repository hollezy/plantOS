// Global variable to keep track of z-index
let windowZIndex;

// Function to close windows
function closeWindowButtons() {
    // Select all elements with the class 'close'
    const closeButtons = document.querySelectorAll('.close');
    // Loop through each close button
    closeButtons.forEach(button => {
        // Add click event
        button.addEventListener('click', () => {
            // Display window
            const windowElement = button.closest('.window');
            windowElement.style.display = 'none';
        });
    });
}


// Function to make windows draggable and bring to front when clicked
function draggableWindows() {
    // Select all elements with the class 'window'
    const windows = document.querySelectorAll('.window');

    windows.forEach(windowElement => {
        // Select the title bar of the window
        const titleBarElement = windowElement.querySelector('.title-bar');
        
        // Error handling, skip if no title bar
        if (!titleBarElement) {
            return; 
        }

        // Variables to store offset positions and the mousedown state
        let offsetX, offsetY, mouseDown = false;

        // Leeway for dragging windows beyond the viewport bounds
        const leeway = 200;

        // Event listener for mousdown on the title bar
        titleBarElement.addEventListener('mousedown', (e) => {
            // Calculate and store the inital offset from the mouse
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            mouseDown = true;

            // Increase the z-index of the window
            windowZIndex++;
            windowElement.style.zIndex = windowZIndex;
        });

        // Event listener for the mousemove
        document.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                // Calculate the new position of the window
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;

                // Get viewport dimensiosn
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const windowWidth = windowElement.offsetWidth;
                const windowHeight = windowElement.offsetHeight;

                // Enforce boundaries to keep the window within a certain range
                if (newX < -leeway) newX = -leeway;
                if (newY < -leeway) newY = -leeway;
                if (newX + windowWidth > viewportWidth + leeway) newX = viewportWidth - windowWidth + leeway;
                if (newY + windowHeight > viewportHeight + leeway) newY = viewportHeight - windowHeight + leeway;

                // Update the window's position
                windowElement.style.left = newX + 'px';
                windowElement.style.top = newY + 'px';
            }
        });

        // Event listener for mouseup on the entire document
        document.addEventListener('mouseup', () => {
            mouseDown = false; // Reset the mousedown state to false
        });
    });
}

// When the DOM is fully loaded, initalize the draggable windows and close buttons
document.addEventListener('DOMContentLoaded', () => {
    draggableWindows();
    closeWindowButtons();
});