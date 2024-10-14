// Array to keep track of selected hordes (ships)
var selectesHorders = [0, 0, 0, 0];

// Example: Add an event listener to the button

//Array with the game sounds
const gameSounds = [new Audio('../Sounds/water1.mp3'), new Audio('../Sounds/victory.mp3'), new Audio('../Sounds/perfect.mp3'), new Audio('../Sounds/gameover.mp3'), new Audio('../Sounds/zombie.mp3'), new Audio('../Sounds/IndianaJonesTheme.mp3')];


// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {

    // Get all buttons with the class "tableButton"
    const buttons = document.getElementsByClassName("tableButton");

    // Attach click event listener to each button
    for (let buttonGame of buttons) {
        buttonGame.addEventListener("click", turnACell);
    }

    // Get the easterEggButton
    const easterEggButton = document.getElementById('easterEggButton');
    // Execute the easterEgg event with parameter once:true so it will execute only once if clicked
    easterEggButton.addEventListener('click', easterEggEvent, { once: true });

});

function easterEggEvent() {

    // Creation of easter egg div which will contain elements
    const easterEggBox = document.createElement('div');
    easterEggBox.setAttribute('id', 'easterEggMessageBox')

    // Creation of easter egg wrapper which will contain text + button and give opacity
    const easterEggMessageBox = document.createElement('div');
    easterEggMessageBox.setAttribute('class', 'easterEggMessageBoxTextWrapper')
    
    // p tag + text generation
    const firstMessageInEasterEggBox = document.createElement('p');
    firstMessageInEasterEggBox.innerText= 'Has trobat l\'arca perduda.';
    const secondMessageInEasterEggBox = document.createElement('p');
    secondMessageInEasterEggBox.innerText= 'Enhorabona!';

    // Button to close box generation
    const closeButtonInEasterEggBox = document.createElement('button');
    closeButtonInEasterEggBox.textContent = "Tancar";
    
    // Add remove event in close button
    closeButtonInEasterEggBox.addEventListener('click', function () {
        easterEggBox.remove();
    });

    // Add elements to the wrapper div
    easterEggMessageBox.appendChild(firstMessageInEasterEggBox);
    easterEggMessageBox.appendChild(secondMessageInEasterEggBox);
    easterEggMessageBox.appendChild(closeButtonInEasterEggBox);
    easterEggBox.appendChild(easterEggMessageBox); // Add wrapper to the easter egg box

    // Add element to the DOM
    document.body.appendChild(easterEggBox);

    // Generate sound of the Easter Egg (--> will trigger indiana jones arrayOfSounds[5])
    generateSound("easterEgg");
}

// Function to handle cell click events
function turnACell(e) {
    const value = e.target.value; // Get the value of the clicked button
    stateCell = sumFoundPositions(value); // This variable will hold the state of the cell (e.g., victory)

    // Change the class from "tableButton" to "button-disabled"
    e.target.classList.replace("tableButton", "button-disabled");
    generateSound(stateCell);
    e.target.innerText = stateCell; // Change the button's text to reflect its state

    // If the state is "victory", disable all buttons and generate new buttons
    if (stateCell === "victory") {
        disableTableIfVictory(buttons);
        generateRankingAndHomeButtons();
    }
}

// Function to disable all buttons when the game is won
function disableTableIfVictory() {
    // Convert the HTMLCollection to an array for easier manipulation
    let buttons1 = Array.from(document.getElementsByClassName("tableButton"));
    for (let buttonGame of buttons1) {
        // Change each button's class to "button-disabled"
        buttonGame.classList.replace("tableButton", "button-disabled");
    }
}

// Function to generate buttons for ranking and home
function generateRankingAndHomeButtons() {
    // Get the scoreboard container element
    let scoreBoard = document.getElementsByClassName("scoreboard")[0];

    // Create a new div for the final game buttons
    let newDiv = document.createElement("div");
    newDiv.className = "divButtonsFinalGame";

    // Create the "Home" button
    let buttonHome = document.createElement("button");
    buttonHome.innerText = "Inicio"; // Set the button text to "Inicio" (Home)

    // Create the "Hall of Fame" button
    let buttonHall = document.createElement("button");
    buttonHall.innerText = "Hall of Fame"; // Set the button text

    // Add an event listener to redirect to the home page when clicked
    buttonHome.addEventListener("click", function () {
        window.location.href = "index.php"; // Redirect to index.php
    });

    // Add an event listener to redirect to the ranking page when clicked
    buttonHall.addEventListener("click", function () {
        window.location.href = "ranking.php"; // Redirect to ranking.php
    });

    // Append the buttons to the new div
    newDiv.appendChild(buttonHome);
    newDiv.appendChild(buttonHall);

    // Append the new div to the scoreboard container
    scoreBoard.appendChild(newDiv);
}

// Function to track the positions found (hits on the ships)
function sumFoundPositions(positionString) {
    // Check the type of horde based on the positionString value
    if (positionString == "2") {
        selectesHorders[0] += 1; // Increment the count for the first horde

        // Check if all positions have been found
        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {
            return "victory"; // If all positions are found, return "victory"
        }

        // Check if the first horde is sunk
        if (selectesHorders[0] == 2) {
            return "sunk"; // Return "sunk" if the first horde has been fully hit
        } else {
            return "touched"; // Return "touched" if the first horde is hit but not sunk
        }
    } else if (positionString == "3") {
        selectesHorders[1] += 1; // Increment the count for the second horde

        // Check if all positions have been found
        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {
            return "victory"; // If all positions are found, return "victory"
        }

        // Check if the second horde is sunk
        if (selectesHorders[1] == 3) {
            return "sunk";
        } else {
            return "touched";
        }
    } else if (positionString == "4") {
        selectesHorders[2] += 1;

        // Check if all positions have been found
        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {
            return "victory";
        }

        // Check if the third horde is sunk
        if (selectesHorders[2] == 4) {
            return "sunk";
        } else {
            return "touched";
        }
    } else if (positionString == "5") {
        selectesHorders[3] += 1;

        // Check if all positions have been found
        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {
            return "victory";
        }

        // Check if the fourth horde is sunk
        if (selectesHorders[3] == 5) {
            return "sunk";
        } else {
            return "touched"; // 
        }
    }
    return "water"; // Return "water" if the position is not a hit
}

//Function for generate de sounds
function generateSound(inputOfGame) {
    //We must insert how a attribute an input with the information of the sound.
    switch (inputOfGame) {

        case "victory":
            gameSounds[1].play();
            break;

        case "sunk":

            gameSounds[2].play();
            break;
        case "touched":

            gameSounds[4].play();
            break;

        case "gameover":
            gameSounds[3].play();
            break;

        case "water":
            gameSounds[0].play();
            break;
        case "easterEgg":
            gameSounds[5].play(); // falta cargar sonido
            break;
    }

}