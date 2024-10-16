// Array to keep track of selected hordes (ships)
var selectesHorders = [0, 0, 0, 0];



// Get all buttons with the class "tableButton"
const buttons = document.getElementsByClassName("tableButton");

//Array with the game sounds
const gameSounds = [new Audio('../sounds/water1.mp3'), new Audio('../sounds/victory.mp3'), new Audio('../sounds/perfect.mp3'), new Audio('../sounds/gameover.mp3'), new Audio('../sounds/zombie.mp3'), new Audio('../sounds/IndianaJonesTheme.mp3')];


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




function generateNewNotification(typeNotification) {

    // Create a new div element for the notification
    let newNotificationDiv = document.createElement("div");
    newNotificationDiv.setAttribute("class", "notification"); // Assign the 'notification' class for styling

    // Create a new paragraph element for the notification text
    let newText = document.createElement("p");

    // Determine the notification message based on the type of notification
    switch (typeNotification) {
        case "victory":
            newText.innerText = "Has guanyat!"; // Victory message
            break;

        case "sunk":
            newText.innerText = "Has eliminat tota l'horda!"; // Sunk message
            break;

        case "touched":
            newText.innerText = "Has eliminat un enemic!"; // Touched message
            break;

        case "gameover":
            newText.innerText = "Has perdut!"; // Game over message
            break;

        case "water":
            newText.innerText = "Directe a l'aigua!"; // Water message
            break;
    }

    // Append the text element to the notification div
    newNotificationDiv.appendChild(newText);
    // Append the notification div to the notifications container
    notificationsDiv.appendChild(newNotificationDiv);
    setTimeout(() => {
        newNotificationDiv.classList.add("showNot");
    }, 0); // Asegúrate de añadir la clase inmediatamente

    // Set a timeout to start fading out the notification after 3 seconds
    setTimeout(() => {
        // Gradually change the opacity to 0
        let opacity = 1; // Initial opacity
        const fadeOutInterval = setInterval(() => {
            opacity -= 0.1; // Decrease opacity by 0.1
            newNotificationDiv.style.opacity = opacity; // Set the new opacity

            // If the opacity reaches 0, stop the interval and remove the element
            if (opacity <= 0) {
                clearInterval(fadeOutInterval); // Clear the interval to stop it
                notificationsDiv.removeChild(newNotificationDiv); // Remove the notification from the DOM
            }
        }, 150); // Change opacity every 150 ms

    }, 4000); // Wait 3 seconds before starting to fade out
}

function notificationWarningsAndErrors(typeNotification, msg) {

    // Create a new div element for the notification
    let newNotificationDiv = document.createElement("div");
    // Assign the 'notification' class for styling

    // Create a new paragraph element for the notification text
    let newText = document.createElement("p");
    let typeMessage;
    // Determine the notification message based on the type of notification
    switch (typeNotification) {
        case "error":
            newNotificationDiv.setAttribute("class", "errorNot");
            newText.innerHTML = "<span>" + typeNotification + ":</span> " + msg; // Error message
            break;

        case "success":
            newText.innerHTML = "<span>" + typeNotification + ":</span> " + msg; // Error message
            newNotificationDiv.setAttribute("class", "succesNot");

            break;

        case "warning":
            newNotificationDiv.setAttribute("class", "warningNot");
            newText.innerHTML = "<span>" + typeNotification + ":</span> " + msg; // Error message
            break;

        case "notice":
            newNotificationDiv.setAttribute("class", "noticeNot");
            newText.innerHTML = "<span>" + typeNotification + ":</span> " + msg; // Error message
            break;

    }

    // Append the text element to the notification div
    newNotificationDiv.appendChild(newText);
    // Append the notification div to the notifications container
    notificationsDiv.appendChild(newNotificationDiv);
    setTimeout(() => {
        newNotificationDiv.classList.add("showNot");
    }, 0); // Asegúrate de añadir la clase inmediatamente

    // Set a timeout to start fading out the notification after 3 seconds
    setTimeout(() => {
        // Gradually change the opacity to 0
        let opacity = 1; // Initial opacity
        const fadeOutInterval = setInterval(() => {
            opacity -= 0.1; // Decrease opacity by 0.1
            newNotificationDiv.style.opacity = opacity; // Set the new opacity

            // If the opacity reaches 0, stop the interval and remove the element
            if (opacity <= 0) {
                clearInterval(fadeOutInterval); // Clear the interval to stop it
                notificationsDiv.removeChild(newNotificationDiv); // Remove the notification from the DOM
            }
        }, 150); // Change opacity every 150 ms

    }, 4000); // Wait 3 seconds before starting to fade out
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
    notificationWarningsAndErrors("error", "Es un mensaje de error")
    notificationWarningsAndErrors("warning", "Es un mensaje de warning")
    notificationWarningsAndErrors("notice", "Es un mensaje de notice")
    notificationWarningsAndErrors("success", "Es un mensaje de succes")
    e.target.innerText = stateCell; // Change the button's text to reflect its state
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
