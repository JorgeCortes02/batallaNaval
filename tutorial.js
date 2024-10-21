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
    const easterEggShowButton = document.getElementById('easterEggShowButton');
    // Execute the easterEgg event with parameter once:true so it will execute only once if clicked
    easterEggShowButton.addEventListener('click', easterEggEvent, { once: true });

});

function easterEggEvent() {

    // Creation of easter egg div which will contain elements
    const easterEggBox = document.getElementById('easterEggMessageBox');
    easterEggBox.style.display = "flex";

    // Add display: none to easterEggBox to close it
    const easterEggCloseButton = document.getElementById('easterEggCloseButton');
    easterEggCloseButton.addEventListener('click', function () {
        easterEggBox.style.display = "none";
    });

    // Add points to score
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
    stateCell = "victory"//sumFoundPositions(value); // "victory" (for instavictory) This variable will hold the state of the cell (e.g., victory)


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
    let buttonHome = document.getElementById("buttonHome");
    let buttonHall = document.getElementById("buttonHall");
    let buttonSaveRecord = document.getElementById("buttonSaveRecord");
    let buttonDiv = document.getElementById("divButtonsFinalGame");

    // Add an event listener to open the popup for saving record when clicked
    // Muestra los botones
    buttonDiv.style.display = "flex"
    buttonDiv.style.flexDirection = "row"
    buttonHome.style.display = "block";
    buttonHall.style.display = "block";
    buttonSaveRecord.style.display = "block";

    // Añade funcionalidad a los botones

    // Redirige a la página de inicio cuando se hace clic en el botón "Inici"
    buttonHome.addEventListener("click", function () {
        window.location.href = "index.php"; // Redirigir a index.php
    });

    // Redirige a la página del Hall of Fame cuando se hace clic en el botón "Hall of Fame"
    buttonHall.addEventListener("click", function () {
        window.location.href = "ranking.php"; // Redirigir a ranking.php
    });

    // Abre el modal para guardar el récord cuando se hace clic en "Guardar Record"
    buttonSaveRecord.addEventListener("click", function () {
        openModal(); // Llama a la función que abre el modal
    });



}




// Function to track the positions found (hits on the ships)
function sumFoundPositions(positionString) {
    let checkVictoryText = "";
    const elements = positionString.split(",");
    numHorder = elements[1];
    longHorder = elements[0];
    let indexArray = 0;
    let touchOrSunk = "";
    // Check the type of horde based on the positionString value
    switch (longHorder) {
        case "4":
            indexArray = 0;
            selectesHorders[indexArray][parseInt(numHorder)] += 1;
            checkVictoryText = checkVictory();
            if (checkVictoryText == "victory") {
                return checkVictoryText;
            }

            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder));
            return touchOrSunk;
            break;

        case "3":
            indexArray = 1;
            selectesHorders[indexArray][parseInt(numHorder)] += 1;
            checkVictoryText = checkVictory();
            if (checkVictoryText == "victory") {
                return checkVictoryText;
            }

            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder));
            return touchOrSunk;

            break;

        case "2":
            indexArray = 2;
            selectesHorders[indexArray][parseInt(numHorder)] += 1;
            checkVictoryText = checkVictory();
            if (checkVictoryText == "victory") {
                return checkVictoryText;
            }

            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder));
            return touchOrSunk;
            break;

        case "1":
            indexArray = 3;
            selectesHorders[indexArray][parseInt(numHorder)] += 1;
            checkVictoryText = checkVictory();
            if (checkVictoryText == "victory") {
                return checkVictoryText;
            }

            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder));
            return touchOrSunk;
            break;

        default:

            return "water"; // Return "water" if the position is not a hit
    }


}



function checkIfTouchedOrSunk(indexArray, numHorder, longHorder) {

    // Check if the second horde is sunk
    if (selectesHorders[indexArray][numHorder] == longHorder) {
        return "sunk";
    } else {
        return "touched";
    }
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
            // Aquí es donde sincronizamos el puntaje
            // Asumiendo que el puntaje ya se ha calculado y se muestra en pantalla
            const score = parseInt(document.getElementById('scoreDisplay').textContent); // Obtener el puntaje mostrado
            document.getElementById('scoreDisplayText').value = score; // Actualiza el campo oculto


            document.getElementById('myForm').submit(); // Enviar el formulario

        }
        //window.location.href = 'index.php';
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
