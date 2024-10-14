// Array to keep track of selected hordes (ships)
var selectesHorders = [0, 0, 0, 0];

// Get all buttons with the class "tableButton"
const buttons = document.getElementsByClassName("tableButton");

//Array with the game sounds
const gameSounds = [new Audio('../Sounds/water1.mp3'), new Audio('../Sounds/victory.mp3'), new Audio('../Sounds/perfect.mp3'), new Audio('../Sounds/gameover.mp3')];


// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {

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

    // Attach click event listener to each button
    for (let buttonGame of buttons) {
        buttonGame.addEventListener("click", turnACell);
    }
});

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

            gameSounds[2].play();
            break;

        case "gameover":
            gameSounds[3].play();
            break;

        case "water":
            gameSounds[0].play();
            break;
    }

}








//------------------------------------------------------------------------------------------------------------------------------------------------------
//pau



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
window.onload = function() {
    startTime = new Date().getTime(); // Tiempo de inicio
    timerInterval = setInterval(function() {
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


// Para ver el tiempo transcurrido, puedes usar la consola
setInterval(() => {
    console.log("Tiempo transcurrido en segundos: " + getElapsedTimeInSeconds());
}, 5000); // Muestra el tiempo cada 5 segundos




// Detener cronómetro cuando la página se cierra o se cambia de pestaña
window.onbeforeunload = function() {
    clearInterval(timerInterval);
};



// funcion para actualizar el marcador con la nueva cifra
function updateScoreDisplay(newScore) {
    //document.getElementById("scoreDisplay").textContent = newScore;
    document.getElementById("scoreDisplay").textContent = String(newScore).padStart(5, '0');//el numero siempre tendra 5 cifras
}


//funcion para carcular puntuacion
function getScore(currentScore, message) {
    let score = currentScore;
    let time = getElapsedTimeInSeconds()
    let counter =0;

    if (message === 'water'){
        if(time <= 300){
            score -=4
            counter = 0

        }else{
            score -=2
            
        }
        counter = 0; // Reiniciar combo en caso de fallo
    }else if(message === 'touched'){
        counter++;
        if(time <= 300){
            if(counter !=0){
                score +=30*counter
            }else{
                score +=30
            }
        }else{
            if(counter !=0){
                score +=20*counter
            }else{
                score +=20
            }
        }
    }else if(message === "sunken"){
        if(time <= 300){
            score +=1000
          
        }else{
            score +=100
        }
    }else if(message === "victory"){
        if(time <= 600){
            score +=5000
        }
       
    }

    return Math.max(0, score);
}


// Función para mostrar el botón

function showButtom() {
    document.getElementById("openWindows").style.display = "block"; // cambiamos el display para hacer visible el boton
}





//para pruebas de funcion 
score = getScore(score, 'touched');  // El jugador toca algo
updateScoreDisplay(score); 
score = getScore(score, 'water');    // El jugador falla
updateScoreDisplay(score); 
score = getScore(score, 'sunken');   // El jugador hunde una nave
updateScoreDisplay(score); 

console.log("Puntaje actual:", score); // Ver el puntaje actualizado



// Obtener elementos del DOM
var modal = document.getElementById("popup");
var ow = document.getElementById("openWindows");
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón, se abre el modal
ow.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en la "X", se cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del contenido del modal, se cierra también
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//pasar los datos al php para el txt
// Añadir el listener para el envío del formulario
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    const name = document.getElementById('name').value; // Captura el nombre ingresado por el usuario
    const score = parseInt(document.getElementById('scoreDisplay').textContent); // Obtener el puntaje del marcador

    // Suponiendo que `longNameMessage` es el ID del elemento que muestra el mensaje de error
    const longNameMessage = document.getElementById('longName'); // Debes asegurarte de que este elemento exista
    
    // Limpiar el mensaje anterior
    longNameMessage.style.display = 'none';

    // Validar longitud del nombre
    if (name.length < 3 || name.length > 14) { // Cambié 'nameInput' a 'name'
        longNameMessage.textContent = "El nom ha de tenir entre 3 i 14 caràcters.";
        longNameMessage.style.display = 'block'; // Mostrar el mensaje
    } else {
        // Crear un objeto FormData para enviar el nombre y score al PHP
        const formData = new FormData();
        formData.append('name', name);
        formData.append('score', score); // Enviar el score capturado

        // Enviar los datos a PHP mediante fetch
        fetch('game.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Respuesta del servidor:', data); // Ver la respuesta del servidor
            // Opcional: puedes mostrar un mensaje en pantalla de que se ha guardado correctamente
            //alert('Score guardado correctamente'); // Mensaje de éxito
            // Aquí asumo que quieres cerrar el modal
            document.getElementById("popup").style.display = "none"; // Cierra el modal después de guardar
        })
        .catch(error => {
            console.error('Error al guardar el score:', error);
        });
    }
});

  // Cerrar el modal y limpiar los campos
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('popup').style.display = "none"; // Cierra el modal
    clearForm(); // Limpia el formulario
});

function clearForm() {
    document.getElementById('myForm').reset(); // Limpia todos los campos del formulario
    const longNameMessage = document.getElementById('longName');
    longNameMessage.style.display = 'none'; // Oculta el mensaje de error
}
