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

//para pruebas de funcion 



score = getScore(score, 'touched');  // El jugador toca algo
updateScoreDisplay(score); 
score = getScore(score, 'water');    // El jugador falla
updateScoreDisplay(score); 
score = getScore(score, 'sunken');   // El jugador hunde una nave
updateScoreDisplay(score); 

console.log("Puntaje actual:", score); // Ver el puntaje actualizado
