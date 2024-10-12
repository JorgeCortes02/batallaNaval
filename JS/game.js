var selectesHorders = [0, 0, 0, 0];

const buttons = document.getElementsByClassName("tableButton");


document.addEventListener("DOMContentLoaded", function () {
    function turnACell(e) {

        const value = e.target.value;
        stateCell = sumFoundPositions(value);


        // Esperar a que la animación de flip termine antes de cambiar la clase

        e.target.classList.replace("tableButton", "button-disabled");
        e.target.innerText = stateCell; // Cambiar el texto

        if (stateCell === "victory") {
            disableTableIfVictory(buttons);
            generateRankingAndHomeButtons();
        }

    }

    for (let buttonGame of buttons) {

        buttonGame.addEventListener("click", turnACell);
    }




});


function disableTableIfVictory() {
    let buttons1 = Array.from(document.getElementsByClassName("tableButton"));
    for (let buttonGame of buttons1) {

        buttonGame.classList.replace("tableButton", "button-disabled");
    }

}

function generateRankingAndHomeButtons() {

    let contenedorBotonera = document.getElementsByClassName("marcador")[0];

    let newDiv = document.createElement("div");

    newDiv.className = "divButtonsFinalGame";

    let buttonHome = document.createElement("button");

    buttonHome.innerText = "Inicio";

    buttonHome.className = "boton";


    let buttonHall = document.createElement("button");

    buttonHall.innerText = "Hall of Fame";

    buttonHall.className = "boton";

    buttonHome.addEventListener("click", function () {

        window.location.href = "index.php";
    });

    buttonHall.addEventListener("click", function () {

        window.location.href = "ranking.php";
    });
    newDiv.appendChild(buttonHome);
    newDiv.appendChild(buttonHall);

    contenedorBotonera.appendChild(newDiv);
}

function sumFoundPositions(positionString) {

    if (positionString == "2") {

        selectesHorders[0] += 1;

        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {

            return "victory";

        }

        if (selectesHorders[0] == 2) {

            return "sunk";
        } else {
            return "touched";
        }

    }
    else if (positionString == "3") {

        selectesHorders[1] += 1;

        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {

            return "victory";

        }

        if (selectesHorders[1] == 3) {

            return "sunk";
        } else {
            return "touched";
        }

    } else if (positionString == "4") {

        selectesHorders[2] += 1;

        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {

            return "victory";

        }

        if (selectesHorders[2] == 4) {

            return "sunk";
        } else {
            return "touched";
        }

    } else if (positionString == "5") {

        selectesHorders[3] += 1;

        if (selectesHorders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0) === 14) {

            return "victory";

        }

        if (selectesHorders[3] == 5) {
            return "sunk";
        } else {
            return "touched";
        }

    }
    return "water";
}






