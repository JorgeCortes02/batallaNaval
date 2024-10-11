var selectesHorders = [0, 0, 0, 0];

const buttons = document.getElementsByClassName("tableButton");

console.log(buttons);
document.addEventListener("DOMContentLoaded", function () {
    function turnACell(e) {

        const value = e.target.value;
        stateCell = sumFoundPositions(value);


        // Esperar a que la animación de flip termine antes de cambiar la clase

        e.target.classList.replace("tableButton", "button-disabled");
        e.target.innerText = stateCell; // Cambiar el texto


    }

    for (let buttonGame of buttons) {

        buttonGame.addEventListener("click", turnACell);
    }




});


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






