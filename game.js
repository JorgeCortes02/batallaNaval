// Array to keep track of selected hordes (ships)
var selectesPlayerHorders = [[0], [0, 0], [0, 0, 0], [0, 0, 0, 0]];
var selectesEnemyHorders = [[0], [0, 0], [0, 0, 0], [0, 0, 0, 0]];

// MODES ACTIVATED
// (get from game.php) --> true para pruebas

// MODES VARIABLES
var playerAmmo = 7; // document.getElementById("playerAmmoTag");
var enemyAmmo = 4; // document.getElementById("enemyAmmoTag");

// Get all buttons with the class "tableButton"
const buttons = document.getElementsByClassName("tableButton");




//Array with the game sounds
const gameSounds = [new Audio('sounds/water1.mp3'), new Audio('sounds/perfect.mp3'), new Audio('sounds/zombie.mp3'), new Audio('sounds/IndianaJonesTheme.mp3'), new Audio("sounds/cañonEnemigo.mp3")];

var nowAttackPlayer = 0;
var cellsPlayerTable = null;

// this will be the map of the player table (will register remaining positions to hit --> td.element / water --> "X" / (touched/sunk) --> "O")
var multidimensionalArrayOfEnemyShots = null;

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {

    // Those are all the cells from the player table with the IA iteracts with  
    cellsPlayerTable = Array.from(document.getElementsByClassName("playerCell"));

    // Generates a multidimensional array to get all cells of player table and generate the IA logic afterwards
    // it uses the cellsPlayerTable elements
    multidimensionalArrayOfEnemyShots = generateMultidimiensionalArrayOfPlayerTableCells(cellsPlayerTable);

    showPlayerHorders(); // Marks horders in player table in gray

    const notificationsDiv = document.getElementById("notificationsDiv");

    // Attach click event listener to each button (only enemy table have buttons)
    for (let buttonGame of buttons) {
        buttonGame.addEventListener("click", turnACell);
    }


    // Get the easterEggButton
    const easterEggShowButton = document.getElementById('easterEggShowButton');
    // Execute the easterEgg event with parameter once:true so it will execute only once if clicked
    easterEggShowButton.addEventListener('click', easterEggEvent, { once: true });

});

// this generates the multidimensional array using the array of all td.elements (cellPlayerTable)
function generateMultidimiensionalArrayOfPlayerTableCells(arrayOfTableCells) {
    let multidimensionalArray = [];
    for (let i = 0; i < arrayOfTableCells.length; i += 10) {
        multidimensionalArray.push(arrayOfTableCells.slice(i, i + 10));
    }
    console.log(multidimensionalArray);
    return multidimensionalArray;
}

function getRandomNumber(long) {
    // Return a random number between 0 and the length of the array
    return Math.floor(Math.random() * long);
}

function animateCellColorChange(actualCell) {
    // Add the class to start the animation
    actualCell.classList.add("cell-color-animation");

    // Remove the class after 2 seconds (duration of the animation)
    setTimeout(function () {
        actualCell.classList.remove("cell-color-animation");
    }, 5000); // 
}

function changeTurn() {
    const tableEnemy = document.getElementsByClassName("enemy_board")[0];
    // Check if it's the enemy's turn (nowAttackPlayer is 1)
    if (nowAttackPlayer === 1) {
        // Change turn to the player
        nowAttackPlayer = 0;
        tableEnemy.removeEventListener("click", showNotification);
        setTimeout(() => {


            changeTurnText("turn0");
            changeBackgorundNotificationColor();
        }, 2000);
        // Activate the player's table for interaction
        activeTable()

    } else {
        // Change turn to the enemy
        nowAttackPlayer = 1;
        // Execute the enemy's turn logic
        enemyTurn();

        setTimeout(() => {
            changeTurnText("turn1");
            changeBackgorundNotificationColor();
            // Aquí es donde registras el evento click para el tablero enemigo
            tableEnemy.addEventListener("click", showNotification);

        }, 3000);

        // Disable the player's table to prevent interaction
        disableTable();
    }
}

// to control de IA position of table
iaSelectedRow = -1;
iaSelectedColumn = -1;
isPromptEnabledForIASelectShotsPosition = false; // prompt used to check if IA have possible positions
possiblePositionsForIAShot = []; // array of positions that IA have to check

// This will update IA selectedRow and selectedColumn
function updateSelectedRowAndSelectedColumnOfEnemyIA(selectedCell, multidimensionalArray) {
    for (let i = 0; i < multidimensionalArray.length; i++) {
        for (let j = 0; j < multidimensionalArray[0].length; j++) {
            if (multidimensionalArray[i][j] === selectedCell) {
                iaSelectedRow = i;
                iaSelectedColumn = j;
            }
        }
    }
}

// This function will return an array of  surrounding positions of a given position (top/bottom/left/right)
// It will return positions that are not off limits (outside multidimensional array)
// it uses the multidimensional array of td.element / "X" / "O" used for IA
function getSurroundings(positionX, positionY) {
    let surroundings = [];
    let maxIndex = multidimensionalArrayOfEnemyShots.length - 1;

    // TOP-LEFT
    if (positionX === 0 && positionY === 0) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY + 1]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX + 1][positionY]);
        // TOP-RIGHT
    } else if (positionX === 0 && positionY === maxIndex) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX + 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY - 1]);
        // BOTTOM-LEFT
    } else if (positionX === maxIndex && positionY === 0) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX - 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY + 1]);
        // BOTTOM-RIGHT
    } else if (positionX === maxIndex && positionY === maxIndex) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX - 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY - 1]);
        // TOP EDGE
    } else if (positionX === 0) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY + 1]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX + 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY - 1]);
        // BOTTOM EDGE
    } else if (positionX === maxIndex) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX - 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY - 1]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY + 1]);
        // LEFT EDGE
    } else if (positionY === 0) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX - 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY + 1]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX + 1][positionY]);
        // RIGHT EDGE
    } else if (positionY === maxIndex) {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX - 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY - 1]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX + 1][positionY]);
        // MIDDLE
    } else {
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX - 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX + 1][positionY]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY - 1]);
        surroundings.push(multidimensionalArrayOfEnemyShots[positionX][positionY + 1]);
    }
    console.log("ALREDEDORES OBTENIDOS")
    console.log(surroundings);
    return surroundings;
}


//After obtaining the surrounding positions, to return only the available positions to use, 
//it deletes X (water) and O (touched/sunk) positions (those have already been selected in previous turns so won't be selectable)
function getValidPositionsForTouch(positionX, positionY) {
    let surroundings = getSurroundings(positionX, positionY);
    return filteredSurroundings = surroundings.filter(element => element !== "X" && element !== "O");
}


function enemyTurn() {

    // Set a delay before the enemy turn action begins
    setTimeout(function () {


        // Play the sound of the enemy's cannon firing
        generateSound("canonEnemy");

        // IMPLEMENTATION OF IA LOGIC TO GET POSITION
        if (!isPromptEnabledForIASelectShotsPosition) {

            // If there isn't prompt enabled, will take a random position

            indexOfSelectedCellInArray = getRandomNumber(cellsPlayerTable.length); // Generate a random position on the player's table of cells
            actualCell = cellsPlayerTable[indexOfSelectedCellInArray]; // Get the actual cell at the random position
            // update IA selected row and column (to change value to "X" or "O" in the multidimensional map of shots)
            updateSelectedRowAndSelectedColumnOfEnemyIA(actualCell, multidimensionalArrayOfEnemyShots);

        } else {
            // possiblePositionsForIAShot = maximum will be [top, bottom, left Y right];
            // get one cell in the array of possibilites (generated after touch position from tthe multidimensionalArray)
            randomCellOfPossiblePositions = possiblePositionsForIAShot[getRandomNumber(possiblePositionsForIAShot.length)];
            // delete selected cell from possible position array
            indexOfCellToDeleteInPossiblePositionsForIAShot = possiblePositionsForIAShot.indexOf(randomCellOfPossiblePositions);
            possiblePositionsForIAShot.splice(indexOfCellToDeleteInPossiblePositionsForIAShot, 1);
            // obtain index of cell selected from possible positions in the cellsPlayerTable (to get the index to delete after)
            indexOfSelectedCellInArray = cellsPlayerTable.indexOf(randomCellOfPossiblePositions);
            // Get the actual cell based on index of matching element
            actualCell = cellsPlayerTable[indexOfSelectedCellInArray];
            // update IA selected row and column with the position of the actual cell 
            // (to change value to "X" or "O" in the multidimensional map of shots)
            updateSelectedRowAndSelectedColumnOfEnemyIA(actualCell, multidimensionalArrayOfEnemyShots);
        }


        // Set a delay before starting the animation to change the cell's color
        setTimeout(function () { animateCellColorChange(actualCell); }, 1000);

        // After the color animation finishes, execute the following
        setTimeout(function () {

            // Get the state of the attacked cell (e.g., water, touched, sunk) by checking enemy hordes
            stateCell = sumFoundPositions(actualCell.getAttribute('data-value'), selectesEnemyHorders);
            generateSound(stateCell);

            // Generate a notification based on the state of the cell (e.g., "you hit", "you missed")
            generateNotificationWithAction(stateCell);

            // Play a sound related to the cell's state (e.g., water splash, hit sound)

            // AMMO MANAGEMENT FOR IA 
            if (ammoEnabled) {

                enemyAmmo -= 1; // subtract player ammo each time he selects something
                ammoTag = document.getElementById("enemyAmmoTag");
                ammoTag.innerText = enemyAmmo + " (ENEMY)";


                // if both players have depleted it's ammo (if not, turn will change and the other player will end his ammo)
                if (enemyAmmo <= 0 && playerAmmo <= 0 && stateCell != "victory") { //  checks if last click was victory to give win without comparation 
                    // returns victory or lose comparing how many boats have been sunk
                    stateCell = checkMunitionDepletedToSeeIfWinOrLose(selectesPlayerHorders, selectesEnemyHorders, "enemy");
                }

            }

            // Set a delay to let the player see the result of the enemy's move
            setTimeout(function () {

                // Change the color of the cell based on the result
                if (stateCell === "water") {
                    actualCell.style.background = "blue";  // Missed the target, hit water

                    // change value to water in the map of the player table for IA available shots
                    multidimensionalArrayOfEnemyShots[iaSelectedRow][iaSelectedColumn] = "X";

                    // If there wasn't prompt, everything is the same (random positions to look for new boats)
                    // If there's prompt, then have to check...
                    if (isPromptEnabledForIASelectShotsPosition) {
                        // If there are possible positions to check, nothing changes (will check remanining positions in next turn)
                        if (possiblePositionsForIAShot.length === 0) {
                            // if there are not possible possitions, (len == 0) 
                            // then there isn't prompt and returns to initial state (random position to look for new boats)
                            isPromptEnabledForIASelectShotsPosition = false;
                        }
                    }

                } else if (stateCell === "touched") {
                    actualCell.style.background = "orange";  // Hit a target, but not sunk yet

                    // change value to water in the map of the player table for IA available shots
                    multidimensionalArrayOfEnemyShots[iaSelectedRow][iaSelectedColumn] = "O";

                    // getValidPositionsForTouch will get the nearby positions without those than have been hit (O) or water (X)
                    // so will return array with only available positions to hit eraby the touched positions

                    // If there isn't prompt, then have to generate one, because touched means top/right/left/bottom must be a boat
                    if (!isPromptEnabledForIASelectShotsPosition) {
                        // so it activates prompt
                        isPromptEnabledForIASelectShotsPosition = true;
                        // returns array of possible possitions
                        possiblePositionsForIAShot = getValidPositionsForTouch(iaSelectedRow, iaSelectedColumn)

                    } else {

                        // second hit and following with available position (because first hit won't have activated prompt)
                        // returns array of new possible positions after selected row and column of ia have moved to new position 
                        // (position of selected cell from the array of possible positions given before).
                        possiblePositionsForIAShot = getValidPositionsForTouch(iaSelectedRow, iaSelectedColumn)

                    }

                } else if (stateCell === "sunk") {

                    actualCell.style.background = "red";  // Enemy horde has been sunk

                    // change value to hit in the map of the player table for IA available shots
                    multidimensionalArrayOfEnemyShots[iaSelectedRow][iaSelectedColumn] = "O";
                    // If sunk, return to initial state (IA will check for random positions to look for new hordes)
                    isPromptEnabledForIASelectShotsPosition = false;
                    possiblePositionsForIAShot = [];

                }

                // Remove the cell from the list of available cells after the attack
                cellsPlayerTable.splice(indexOfSelectedCellInArray, 1);

                // Check if the game is over by verifying if the cell's state is "victory"
                if (stateCell === "victory") {

                    window.location.href = "lose.php?score=" + score;  // Redirect to the victory page
                }

                if (stateCell === "gameover") {
                    disableTableIfVictory();
                    window.location.href = "win.php?score=" + score;

                    stopTimer(); // Detener el cronómetro
                }


                // If the enemy hit or sunk a target, continue with the enemy's turn
                if (stateCell == "touched" || stateCell == "sunk") {

                    if (ammoEnabled) {

                        if (enemyAmmo <= 0) {

                            changeTurn();
                        } else { enemyTurn(); }


                    } else { enemyTurn(); }

                } else {

                    if (ammoEnabled) {

                        if (playerAmmo <= 0) {

                            enemyTurn();
                        } else { changeTurn(); }

                    } else { changeTurn(); }


                }
            }, 2000); // Delay to show the result before proceeding

        }, 2000); // Delay before generating the notification and sound

    }, 3000); // Initial delay before starting the enemy's turn
}

function showNotification() {
    const notification = document.getElementsByClassName('notification')[0];

    // Añadir la clase para mostrar la notificación
    notification.classList.add('showNot');

    // Remover la clase después de que la animación termine (6 segundos en total)
    setTimeout(() => {
        notification.classList.remove('showNot');
    }, 6000); // Tiempo de animación + tiempo visible (5s visible + 1s fade)
}
function showPlayerHorders() {
    // Iterate over each cell in the player's table
    cellsPlayerTable.forEach(element => {
        // If the cell's data-value attribute is not "^^^" (indicating a non-empty cell)
        if (element.getAttribute("data-value") !== "^^^") {
            // Set the cell's background color to gray
            element.style.background = "gray";
        }
    });
}

function easterEggEvent() {

    // Creation of easter egg div which will contain elements
    const easterEggBox = document.getElementById('easterEggMessageBox');
    easterEggBox.style.display = "flex";

    // Add display: none to easterEggBox to close it
    const easterEggCloseButton = document.getElementById('easterEggCloseButton');
    easterEggCloseButton.addEventListener('click', function () {
        easterEggBox.style.display = "none";
    });

    score += 7000;
    updateScoreDisplay(score);

    // Generate sound of the Easter Egg (--> will trigger indiana jones arrayOfSounds[5])
    generateSound("easterEgg");
}



// Variables to store timeout and interval

function generateNotificationWithAction(typeNotification) {
    const paragrafNotification = document.getElementById("notificationParagraf");

    // Remove any previous animation
    // Remover cualquier animación previa (si es que existe)
    paragrafNotification.style.animation = 'none';

    // Check whose turn it is
    switch (nowAttackPlayer) {
        case 0: // Player's turn
            switch (typeNotification) {
                case "victory":
                    paragrafNotification.innerText = "Has guanyat!"; // You have won!
                    break;
                case "sunk":
                    paragrafNotification.innerText = "Has derribat a tota l'horda enemiga. Tornes a atacar!"; // You have sunk the entire enemy horde. You attack again!
                    break;
                case "touched":
                    paragrafNotification.innerText = "Has encertat, una menys! Tornes a atacar!"; // You hit, one less! You attack again!
                    break;
                case "gameover":
                    paragrafNotification.innerText = "Has perdut."; // You have lost.
                    break;
                case "water":

                    paragrafNotification.innerText = "Directe a l’aigua! Més sort la pròxima vegada…"; // Direct hit to the water, better luck next time...
                    break;
            }
            break;

        case 1: // Enemy's turn
            switch (typeNotification) {
                case "victory":
                    paragrafNotification.innerText = "Has perdut!"; // You have lost!
                    break;
                case "sunk":
                    paragrafNotification.innerText = "L’enemic ha eliminat la teva horda! Torna a atacar!"; // The enemy has eliminated your horde! Attack again.
                    break;
                case "touched":
                    paragrafNotification.innerText = "L’enemic ha trobat una de les teves momies! Torna a atacar!"; // The enemy has found one of your mummies! Attack again.
                    break;
                case "water":
                    paragrafNotification.innerText = "Atac enemic directe a l’aigua!"; // Enemy attack goes directly into the water...
                    break;
            }
            break;
    }

    // Forzar reflow para reiniciar la animación
    void paragrafNotification.offsetWidth;

    // Añadir la clase para activar la animación
    paragrafNotification.style.animation = ''; // Reinicia la animación
    paragrafNotification.classList.add("slide-in");
}

function changeBackgorundNotificationColor() {
    const divNoti = document.getElementById("notificationContainer");
    if (nowAttackPlayer == 0) {

        if (divNoti.classList.contains("divNotiEnemy")) {

            divNoti.classList.replace("divNotiEnemy", "divNotiPlayer")

        }

    } else {
        if (divNoti.classList.contains("divNotiPlayer")) {

            divNoti.classList.replace("divNotiPlayer", "divNotiEnemy")
        }

    }


}

function changeTurnText(turn) {
    const turnNotification = document.getElementById("turn");

    // Remove the 'show' class to reset opacity
    turnNotification.classList.remove('show');

    // Trigger reflow to reset the animation
    void turnNotification.offsetWidth;

    // Change the text and classes based on the turn
    switch (turn) {
        case "turn0":
            turnNotification.innerText = "És el teu torn! Sort, camarada!"; // It is your turn, good luck comrade!
            turnNotification.classList.replace("notificationEnemyTurn", "notificationPlayerTurn"); // Replace classes for styling
            fadeIn(turnNotification); // Start the fade-in animation
            break;

        case "turn1":
            turnNotification.innerText = "És el torn de l’enemic! A cobert!"; // It is the enemy's turn, take cover!
            turnNotification.classList.replace("notificationPlayerTurn", "notificationEnemyTurn"); // Replace classes for styling
            fadeIn(turnNotification); // Start the fade-in animation
            break;
    }

    // Add the 'show' class to trigger the CSS transition
    fadeIn(turnNotification); // Start the fade-in animation
}

// Función para aumentar la opacidad gradualmente
function fadeIn(element) {
    let opacity = 0;
    const interval = setInterval(() => {
        opacity += 0.05; // Aumenta la opacidad gradualmente
        element.style.opacity = opacity;

        if (opacity >= 1) { // Detener el intervalo cuando la opacidad llega a 1
            clearInterval(interval);
        }
    }, 20); // Controla la velocidad de la transición (aquí se actualiza cada 50ms)
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

function disableTable() {
    // Convert the HTMLCollection to an array for easier manipulation
    let buttons1 = Array.from(document.getElementsByClassName("tableButton"));
    for (let buttonGame of buttons1) {
        // Change each button's class to "button-disabled"
        buttonGame.classList.add("disabledIfSound");
    }
    const easterEggButton = document.getElementById('easterEggButton');
    if (easterEggButton) {
        easterEggButton.disabled = true; // Disable the button
    }
}

function activeTable() {
    // Convert the HTMLCollection to an array for easier manipulation
    let buttons1 = Array.from(document.getElementsByClassName("tableButton"));
    for (let buttonGame of buttons1) {
        // Change each button's class to "button-disabled"
        buttonGame.classList.remove("disabledIfSound")

    }
    const easterEggButton = document.getElementById('easterEggButton');
    if (easterEggButton) {
        easterEggButton.disabled = false; // Disable the button
    }
}




function countSunkHordes(touchedHordes) {

    counterOfSunkHordes = 0;

    // Iterate selectesPlayerHorders - selectesEnemyHorders to check if hordes are sunk (== 4,3,2,1)
    for (let i = 0; i < touchedHordes.length; i++) {
        // console.log(touchedHordes[i])
        for (let j = 0; j < touchedHordes[i].length; j++) {
            // console.log(touchedHordes[i][j])
            if (i == 0) {
                if (touchedHordes[i][j] == 4) {
                    counterOfSunkHordes += 1;
                    // console.log("ADDED TO COUNT");
                }
            } else if (i == 1) {
                if (touchedHordes[i][j] == 3) {
                    counterOfSunkHordes += 1;
                    // console.log("ADDED TO COUNT");
                }
            } else if (i == 2) {
                if (touchedHordes[i][j] == 2) {
                    counterOfSunkHordes += 1;
                    // console.log("ADDED TO COUNT");
                }
            } else if (i == 3) {
                if (touchedHordes[i][j] == 1) {
                    counterOfSunkHordes += 1;
                    // console.log("ADDED TO COUNT");
                }
            }
        }
    }
    return counterOfSunkHordes;
}

function checkMunitionDepletedToSeeIfWinOrLose(playerHordes, enemyHordes, turn) {
    // Count how many hordes have been defeated by player and enemy side
    // Turn is "player" or "enemy", cause results will be inverted depending who has the turn
    playerSunkHorderCount = countSunkHordes(playerHordes);
    enemySunkHorderCount = countSunkHordes(enemyHordes);

    if (playerSunkHorderCount > enemySunkHorderCount) { // player sank more hordes
        if (turn === "player") {
            return "victory";
        } else {
            return "gameover";
        }
    } else if (playerSunkHorderCount === enemySunkHorderCount) { // Draw in sunk hordes

        // Sum values of player touched vs IA touched. Highest wins (draw --> victory for IA). 
        sumOfTouchedPlayerPositions = playerHordes.flat().reduce((acc, val) => acc + val, 0);
        sumOfTouchedEnemyPositions = enemyHordes.flat().reduce((acc, val) => acc + val, 0);
        if (turn === "player") {
            if (sumOfTouchedPlayerPositions > sumOfTouchedEnemyPositions) { // player touched more hordes
                return "victory";
            } else if (sumOfTouchedPlayerPositions === sumOfTouchedEnemyPositions) { // draw in touched positions
                return "gameover";
            } else { // IA touched more hordes
                return "gameover";
            }
        } else {
            if (sumOfTouchedPlayerPositions > sumOfTouchedEnemyPositions) { // player touched more hordes
                return "gameover";
            } else if (sumOfTouchedPlayerPositions === sumOfTouchedEnemyPositions) { // draw in touched positions
                return "victory";
            } else { // IA touched more hordes
                return "victory";
            }
        }
    } else {  // IA sank more hordes
        if (turn === "player") {
            return "gameover";
        } else {
            return "victory";
        }
    }
}

var countFirtsPlayerAttack = 0;

// Function to handle cell click events
function turnACell(e) {

    if (countFirtsPlayerAttack == 0) {

        changeTurnText("turn0");
        countFirtsPlayerAttack += 1;

    }
    const value = e.target.value; // Get the value of the clicked button

    disableTable();

    stateCell = sumFoundPositions(value, selectesPlayerHorders); // "victory" (for instavictory) This variable will hold the state of the cell (e.g., victory)

    // Change the class from "tableButton" to "button-disabled"
    e.target.classList.replace("tableButton", "button-disabled");
    generateSound(stateCell);
    generateNotificationWithAction(stateCell);

    e.target.innerText = stateCell;

    //If the position is diferent to water, print the position in table with red background
    if (stateCell !== "water") {

        e.target.classList.add("touch");
    } // Change the button's text to reflect its state

    // Calcula el nuevo puntaje basándose en el estado del juego
    score = getScore(score, stateCell);
    updateScoreDisplay(score); // Actualiza el marcador en la pantalla
    // If the state is "victory", disable all buttons and generate new buttons

    // AMMO MANAGEMENT 
    // (after all visual effects from selecting the button)
    // have to check if option is activated 
    if (ammoEnabled) {

        playerAmmo -= 1; // subtract player ammo each time he selects something
        ammoTag = document.getElementById("playerAmmoTag");
        ammoTag.innerText = playerAmmo + " (PLAYER)";

        if (enemyAmmo <= 0 && playerAmmo <= 0 && stateCell != "victory") { //  checks if last click was victory to give win without comparation
            // returns victory or lose comparing how many boats have been sunk
            stateCell = checkMunitionDepletedToSeeIfWinOrLose(selectesPlayerHorders, selectesEnemyHorders, "player");
        }
    }

    if (stateCell === "victory") {
        disableTableIfVictory();
        window.location.href = "win.php?score=" + score;

        stopTimer(); // Detener el cronómetro
    }
    if (stateCell === "gameover") {
        disableTableIfVictory();
        window.location.href = "lose.php?score=" + score;

        stopTimer(); // Detener el cronómetro
    }
    if (stateCell !== "touched" && stateCell !== "sunk") {
        if (ammoEnabled) {

            if (enemyAmmo <= 0) {

                activeTable();
            } else { changeTurn(); }

        } else { changeTurn(); }


    } else {
        if (ammoEnabled) {

            if (playerAmmo <= 0) {

                changeTurn();
            } else { activeTable(); }

        } else { activeTable(); }

    }
}

// Function to track the positions found (hits on the ships)
function sumFoundPositions(positionString, selectesHorders) {
    let checkVictoryText = "";

    // Split the positionString by comma to separate values
    const elements = positionString.split(",");
    console.log(elements);
    numHorder = elements[1];  // Extract the number of the horde
    longHorder = elements[0];  // Extract the length of the horde
    let indexArray = 0;
    let touchOrSunk = "";

    // Check the type of horde based on the positionString value
    switch (longHorder) {
        case "4":


            indexArray = 0;  // Assign the index for horde of length 4
            selectesHorders[indexArray][parseInt(numHorder)] += 1;  // Update the position found
            checkVictoryText = checkVictory(selectesHorders);  // Check for victory after updating
            if (checkVictoryText == "victory") {
                return checkVictoryText;  // Return if victory condition is met
            }

            // Check if the horde is touched or sunk
            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder), selectesHorders);
            return touchOrSunk;  // Return whether the horde is touched or sunk
            break;

        case "3":

            indexArray = 1;  // Assign the index for horde of length 3
            selectesHorders[indexArray][parseInt(numHorder)] += 1;  // Update the position found
            checkVictoryText = checkVictory(selectesHorders);  // Check for victory after updating
            if (checkVictoryText == "victory") {
                return checkVictoryText;  // Return if victory condition is met
            }

            // Check if the horde is touched or sunk
            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder), selectesHorders);
            return touchOrSunk;  // Return whether the horde is touched or sunk
            break;

        case "2":

            indexArray = 2;  // Assign the index for horde of length 2
            selectesHorders[indexArray][parseInt(numHorder)] += 1;  // Update the position found
            checkVictoryText = checkVictory(selectesHorders);  // Check for victory after updating
            if (checkVictoryText == "victory") {
                return checkVictoryText;  // Return if victory condition is met
            }

            // Check if the horde is touched or sunk
            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder), selectesHorders);
            return touchOrSunk;  // Return whether the horde is touched or sunk
            break;

        case "1":

            indexArray = 3;  // Assign the index for horde of length 1
            selectesHorders[indexArray][parseInt(numHorder)] += 1;  // Update the position found
            checkVictoryText = checkVictory(selectesHorders);  // Check for victory after updating
            if (checkVictoryText == "victory") {
                return checkVictoryText;  // Return if victory condition is met
            }

            // Check if the horde is touched or sunk
            touchOrSunk = checkIfTouchedOrSunk(indexArray, parseInt(numHorder), parseInt(longHorder), selectesHorders);
            return touchOrSunk;  // Return whether the horde is touched or sunk
            break;

        default:
            return "water"; // Return "water" if the position is not a hit
    }
}



// count of sunk horders to check after munition depleted

function checkVictory(selectesHorders) {

    // Check if all positions have been found
    if (selectesHorders.reduce((accumulator, currentArray) => {
        // Sumar los elementos dentro del array actual
        return accumulator + currentArray.reduce((innerAcc, currentValue) => innerAcc + currentValue, 0);
    }, 0) === 20) {
        return "victory";
    }
}

function checkIfTouchedOrSunk(indexArray, numHorder, longHorder, selectesHorders) {

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

        case "water":
            gameSounds[0].play();
            break;


        case "sunk":

            gameSounds[1].play();
            break;
        case "touched":

            gameSounds[2].play();
            break;


        case "easterEgg":
            gameSounds[3].play();
            break;

        case "canonEnemy":
            gameSounds[4].play();
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
        } else {
            score += 2500
        }

    }

    return Math.max(0, score);
}




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

