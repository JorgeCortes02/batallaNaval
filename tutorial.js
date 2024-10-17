// Array to keep track of selected hordes (ships)
var selectesHorders = [[0], [0, 0], [0, 0, 0], [0, 0, 0, 0]];



// Get all buttons with the class "tableButton"
const buttons = document.getElementsByClassName("tableButton");

//Array with the game sounds
const gameSounds = [new Audio('sounds/water1.mp3'), new Audio('sounds/victory.mp3'), new Audio('sounds/perfect.mp3'), new Audio('sounds/gameover.mp3'), new Audio('sounds/zombie.mp3'), new Audio('sounds/IndianaJonesTheme.mp3')];


// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {

    const notificationsDiv = document.getElementById("notificationsDiv");

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
    firstMessageInEasterEggBox.innerText = 'Has trobat l\'arca perduda.';
    const secondMessageInEasterEggBox = document.createElement('p');
    secondMessageInEasterEggBox.innerText = 'Enhorabona!';

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

    updateScoreDisplay(score + 7000);
    // Generate sound of the Easter Egg (--> will trigger indiana jones arrayOfSounds[5])
    generateSound("easterEgg");
}



// Variables para guardar el timeout y el intervalo
let fadeOutTimeout;
let fadeOutInterval;

function generateNewNotification(typeNotification) {
    // Limpia el timeout y el intervalo anteriores para reiniciar el temporizador
    if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
    if (fadeOutInterval) clearInterval(fadeOutInterval);

    // Selecciona todas las notificaciones y oculta las que están visibles
    let notifications = document.getElementsByClassName('notification');
    for (let i = 0; i < notifications.length; i++) {
        notifications[i].classList.remove('showNot');
        notifications[i].style.opacity = '1'; // Reinicia la opacidad (opcional)
    }

    // Muestra la notificación correcta según el tipo
    let notificationToShow;
    switch (typeNotification) {
        case "victory":
            notificationToShow = document.getElementById("victoryNotification");
            break;
        case "sunk":
            notificationToShow = document.getElementById("sunkNotification");
            break;
        case "touched":
            notificationToShow = document.getElementById("touchedNotification");
            break;
        case "gameover":
            notificationToShow = document.getElementById("gameoverNotification");
            break;
        case "water":
            notificationToShow = document.getElementById("waterNotification");
            break;
    }

    // Añade la clase showNot para que la notificación se deslice hacia dentro
    if (notificationToShow) {
        notificationToShow.classList.add("showNot");

        // Inicia el timeout para desvanecer la notificación
        fadeOutTimeout = setTimeout(() => {
            let opacity = 1; // Opacidad inicial

            // Inicia el intervalo para desvanecer gradualmente
            fadeOutInterval = setInterval(() => {
                opacity -= 0.1; // Decrementa la opacidad gradualmente
                notificationToShow.style.opacity = opacity;

                if (opacity <= 0) {
                    clearInterval(fadeOutInterval); // Detiene el desvanecimiento
                    notificationToShow.classList.remove("showNot"); // Oculta el div
                }
            }, 150); // Desvanece cada 150ms
        }, 5000); // Comienza a desvanecer después de 6 segundos
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
    const easterEggButton = document.getElementById('easterEggButton');
    if (easterEggButton) {
        easterEggButton.disabled = true; // Disable the button
    }
}
// Function to handle cell click events
function turnACell(e) {
    const value = e.target.value; // Get the value of the clicked button
    stateCell = sumFoundPositions(value); // "victory" (for instavictory) This variable will hold the state of the cell (e.g., victory)

    // Change the class from "tableButton" to "button-disabled"
    e.target.classList.replace("tableButton", "button-disabled");
    generateSound(stateCell);
    generateNewNotification(stateCell)

    e.target.innerText = stateCell;

    //If the position is diferent to water, print the position in table with red background
    if (stateCell !== "water") {

        e.target.classList.add("touch");
    } // Change the button's text to reflect its state
    // Calcula el nuevo puntaje basándose en el estado del juego
    score = getScore(score, stateCell);
    updateScoreDisplay(score); // Actualiza el marcador en la pantalla
    // If the state is "victory", disable all buttons and generate new buttons
    if (stateCell === "victory") {
        disableTableIfVictory();
        stopTimer(); // Detener el cronómetro
        generateRankingAndHomeButtons();
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
    buttonHome.innerText = "Inici"; // Set the button text to "Inicio" (Home)

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
    // Create the "Guardar Record" button
    let buttonSaveRecord = document.createElement("button");
    buttonSaveRecord.innerText = "Guardar Record"; // Set the button text for save record

    // Add an event listener to open the popup for saving record when clicked
    buttonSaveRecord.addEventListener("click", function () {
        openModal(); // Llama a la función para abrir el modal
    });

    // Append the buttons to the new div
    newDiv.appendChild(buttonHome);
    newDiv.appendChild(buttonHall);
    newDiv.appendChild(buttonSaveRecord);
    // Append the new div to the scoreboard container
    scoreBoard.appendChild(newDiv);
}

// Function to track the positions found (hits on the ships)
function sumFoundPositions(positionString) {
    let checkVictoryText = "";
    const elements = positionString.split(",");
    numHorder = elements[1];
    longHorder = elements[0];

    console.log(numHorder)
    console.log(longHorder)
    // Check the type of horde based on the positionString value
    if (longHorder == "4") {


        selectesHorders[0][0] += 1; // Increment the count for the first horde

        // Check if all positions have been found
        // Check if all positions have been found
        checkVictoryText = checkVictory();

        if (checkVictoryText == "victory") {
            return checkVictoryText;
        }

        // Check if the first horde is sunk
        if (selectesHorders[0][0] == 4) {
            return "sunk"; // Return "sunk" if the first horde has been fully hit
        } else {
            return "touched"; // Return "touched" if the first horde is hit but not sunk
        }
    } else if (longHorder == "3") {


        switch (numHorder) {

            case "0":

                selectesHorders[1][0] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[1][0] == 3) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;

            case "1":
                selectesHorders[1][1] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[1][1] == 3) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;
        }

    } else if (longHorder == "2") {

        switch (numHorder) {
            case "0":

                selectesHorders[2][0] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[2][0] == 2) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;

            case "1":
                selectesHorders[2][1] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[2][1] == 2) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;
            case "2":
                selectesHorders[2][2] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[2][2] == 2) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;
        }
    } else if (longHorder == "1") {
        switch (numHorder) {
            case "0":

                selectesHorders[3][0] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[3][0] == 1) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;

            case "1":
                selectesHorders[3][1] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[3][1] == 1) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;
            case "2":
                selectesHorders[3][2] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[3][2] == 1) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;
            case "3":
                selectesHorders[3][3] += 1
                checkVictoryText = checkVictory();
                if (checkVictoryText == "victory") {
                    return checkVictoryText;
                }
                // Check if the second horde is sunk
                if (selectesHorders[3][3] == 1) {
                    return "sunk";
                } else {
                    return "touched";
                }
                break;
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

// Función para mostrar la ventana emergente.
function openModal() {
    var modal = document.getElementById("popup"); // Obtiene el modal
    modal.style.display = "flex"; // Muestra el modal
}


//Pau Score and Timer

let score = 0; // Puntaje inicial
let startTime;
let timerInterval;
let elapsedTime = 0; // Variable para almacenar el tiempo transcurrido

// Formatear el tiempo
function formatTime(ms) {
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    let hours = Math.floor(ms / (1000 * 60 * 60));

    // Agregar ceros a la izquierda
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

// Iniciar cronómetro cuando se carga la página
window.onload = function () {
    startTime = new Date().getTime(); // Tiempo de inicio
    timerInterval = setInterval(function () {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;
        document.querySelector("#chronometer").textContent = formatTime(elapsedTime);
        //document.querySelector("#chronometer").style.color = "#3b240b"; 

    }, 1000); // Actualizar cada segundo
};

// Función para obtener el tiempo transcurrido en segundos
function getElapsedTimeInSeconds() {
    return Math.floor(elapsedTime / 1000); // Devuelve el tiempo en segundos
}

// Función para detener el cronómetro
function stopTimer() {
    clearInterval(timerInterval); // Detener el cronómetro
}


//para ver tiempo transcurrido
setInterval(() => {
    console.log("Tiempo transcurrido en segundos: " + getElapsedTimeInSeconds());
}, 5000); // Muestra el tiempo cada 5 segundos




// Detener cronómetro cuando la página se cierra o se cambia de pestaña
window.onbeforeunload = function () {
    clearInterval(timerInterval);
};



// funcion para actualizar el marcador con la nueva cifra
function updateScoreDisplay(newScore) {
    //document.getElementById("scoreDisplay").textContent = newScore;
    document.getElementById("scoreDisplay").textContent = String(newScore).padStart(5, '0');//siempre tendra 5 cifras
}


//funcion para carcular puntuacion
function getScore(currentScore, message) {
    let score = currentScore;
    let time = getElapsedTimeInSeconds()
    let counter = 0;

    if (message === 'water') {
        if (time <= 300) {
            score -= 4
            counter = 0

        } else {
            score -= 2

        }
        counter = 0; // Reiniciar combo en caso de fallo
    } else if (message === 'touched') {
        counter++;
        if (time <= 300) {
            if (counter != 0) {
                score += 30 * counter
            } else {
                score += 30
            }
        } else {
            if (counter != 0) {
                score += 20 * counter
            } else {
                score += 20
            }
        }
    } else if (message === "sunk") {
        if (time <= 300) {
            score += 1000

        } else {
            score += 100
        }
    } else if (message === "victory") {
        if (time <= 600) {
            score += 5000
        }

    }

    return Math.max(0, score);
}


document.addEventListener("DOMContentLoaded", function () {

    // Obtener elementos del DOM
    var modal = document.getElementById("popup"); // El modal principal
    var ow = document.getElementById("openWindows"); // El botón que abre el modal
    var span = document.getElementsByClassName("close")[0]; // El botón de cierre (X)


    // Cerrar el modal cuando se hace clic en la "X"
    span.onclick = function () {
        modal.style.display = "none"; // Ocultar el modal
        clearForm(); // Limpiar el formulario al cerrar el modal
    };

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Ocultar el modal si se hace clic fuera
            clearForm(); // Limpiar el formulario al cerrar el modal
        }
    };

    // Añadir el listener para el envío del formulario
    document.getElementById('myForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir el envío del formulario por defecto

        const name = document.getElementById('name').value; // Captura el nombre ingresado por el usuario
        const score = parseInt(document.getElementById('scoreDisplay').textContent); // Obtener el puntaje del marcador

        const longNameMessage = document.getElementById('longName');
        longNameMessage.style.display = 'none'; // Limpiar mensaje anterior

        // Validar longitud del nombre
        if (name.length < 3 || name.length > 30) {
            longNameMessage.textContent = "El nom ha de tenir entre 3 i 30 caràcters.";
            longNameMessage.style.display = 'block'; // Mostrar el mensaje de error
        } else {
            // Crear un objeto FormData para enviar el nombre y el puntaje al PHP
            const formData = new FormData();
            formData.append('name', name);
            formData.append('score', score);

            // Enviar los datos al PHP mediante fetch
            fetch('game.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    console.log('Respuesta del servidor:', data);
                    // Cerrar el modal después de guardar
                    modal.style.display = "none";
                    clearForm(); // Limpiar formulario después de enviar
                })
                .catch(error => {
                    console.error('Error al guardar el score:', error);
                });
        }
    });

    // Función para limpiar el formulario
    function clearForm() {
        document.getElementById('myForm').reset(); // Limpia todos los campos del formulario
        const longNameMessage = document.getElementById('longName');
        longNameMessage.style.display = 'none'; // Oculta el mensaje de error
    }
});
function checkVictory() {

    // Check if all positions have been found
    if (selectesHorders.reduce((accumulator, currentArray) => {
        // Sumar los elementos dentro del array actual
        return accumulator + currentArray.reduce((innerAcc, currentValue) => innerAcc + currentValue, 0);
    }, 0) === 20) {
        return "victory";
    }
}