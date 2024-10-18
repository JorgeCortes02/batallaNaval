<?php

//zona horaria
date_default_timezone_set('Europe/Madrid'); // Cambia 'Europe/Madrid' a la zona horaria que necesites


// Inicializamos la variable por defecto para evitar errores.
$name = "";

// Verificar si se envió el formulario
if (isset($_POST['name']) && isset($_POST['score'])) {
    $name = $_POST['name'];
    $score = $_POST['score'];

    // Validación del nombre
    if (strlen($name) < 3 || strlen($name) > 30) {

        echo "El nombre debe tener entre 3 y 30 caracteres.";
        exit; // Detener la ejecución del script
    }

    $date = date('Y-m-d H:i'); // Formato de fecha y hora



    $openTXT = fopen("ranking.txt", "a");



    if ($openTXT) {


        fwrite($openTXT, $name . ';' . $score . ';' . $date . "\n");//esribimos

        fclose($openTXT); // Cerramos el archivo después de escribir

    } else {
        echo "";
    }

}


?>

<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
    <script src="game.js"></script>
</head>

<body class="page-game">

    <?php

    $horders = [[1, 4], [2, 3], [3, 2], [4, 1]];  // Define an array of ship lengths (2, 3, 4, and 5).
    
    $arrayPosicionsPlayer = array();  // Initialize an empty array to hold the positions on the player's board.
    $arrayPosicionsEnemy = array();   // Initialize an empty array to hold the positions on the enemy's board.
    
    // Initialize the player's board by setting all positions to the default value.
    initPosicionArray($arrayPosicionsPlayer);
    // Generate random positions for the player's ships based on the $horders array.
    generateRandomHorders($horders, $arrayPosicionsPlayer);

    // Initialize the enemy's board by setting all positions to the default value.
    initPosicionArray($arrayPosicionsEnemy);
    // Generate random positions for the enemy's ships based on the $horders array.
    generateRandomHorders($horders, $arrayPosicionsEnemy);

    // Function to initialize the positions array (representing the player's or enemy's board).
    function initPosicionArray(&$arrayPosiciones)
    {
        // Loop through a 10x10 grid (board)
        for ($i = 0; $i <= 9; $i++) {
            for ($j = 0; $j <= 9; $j++) {
                // Set each position on the board to the default value "^^^" (indicating an empty or unhit position).
                $arrayPosiciones[$i][$j] = "^^^";
            }
        }
    }
    //Function for generate the random holders.
    function generateRandomHorders(&$horders, &$arrayPosiciones)
    {
        foreach ($horders as $horder) {
            $countHorder = 0;
            // Loop through each ship length defined in $horders.
            for ($i = 0; $i < $horder[0]; $i++) {

                // Randomly decide the orientation.
                $orientation = rand(0, 1);

                // If orientation is horizontal...
                if ($orientation == 0) {

                    $freePosition = false;  // Flag to check if a free position is found.
    

                    while ($freePosition == false) {
                        // Generate random row and column positions for the ship.
                        $row = rand(0, count($arrayPosiciones) - 1);  // Random row index.
                        // Calculate the column index, ensuring the ship fits within the array.
                        $column = rand(0, count($arrayPosiciones[$row]) - 1 - $horder[1]);

                        // Initialize the position storage for the ship.
    
                        // Check if the chosen position is free using the function isFreePosH.
                        $freePosition = isFreePosH($row, $column, $arrayPosiciones, $horder[1]);
                    }


                    if ($freePosition == true) {
                        // Place the ship on the board horizontally.
                        for ($j = 0; $j < $horder[1]; $j++) {
                            // Mark the ship's positions in the array with its length.
                            $arrayPosiciones[$row][$column + $j] = "$horder[1],$countHorder";

                        }
                    }

                    // If the orientation is vertical:
                } else {
                    $freePosition = false;  // Reset the flag to check for free position.
    
                    // Keep searching for a random position to place the ship until a free position is found.
                    while ($freePosition == false) {
                        // Generate random row and column positions for the ship.
    
                        $row = rand(0, count($arrayPosiciones) - 1 - $horder[1]);
                        $column = rand(0, count($arrayPosiciones[$row]) - 1);  // Random column index.
    
                        // Initialize the position storage for the ship.
    
                        $freePosition = isFreePosV($row, $column, $arrayPosiciones, $horder[1]);
                    }

                    // If a free position is confirmed...
                    if ($freePosition == true) {

                        for ($j = 0; $j < $horder[1]; $j++) {
                            // Mark the ship's positions in the array with its length.
                            $arrayPosiciones[$row + $j][$column] = "$horder[1],$countHorder";

                        }
                    }
                }

                $countHorder += 1;
            }
        }
    }
    // Función para verificar si una posición es válida (sin tocar otros barcos)
    function isFreePosH($row, $column, $arrayPosiciones, $horderCount)
    {
        // Check if the position is not on the edges 
        if ($column != 0 && $column != count($arrayPosiciones[0]) - 1 && $row != 0 && $row != count($arrayPosiciones) - 1) {
            // Iterate over the surrounding cells (above, below, left, right)
            for ($i = -1; $i <= 1; $i++) {

                for ($j = -1; $j <= $horderCount; $j++) {

                    // For the cells just before the start of the ship and just after the end
                    if ($j == -1 || $j == $horderCount) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                            return false;
                        }

                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Top-left corner check
        } elseif ($row == 0 && $column == 0) {
            // Only checks the bottom-right surrounding area
            for ($i = 0; $i <= 1; $i++) {
                for ($j = 0; $j <= $horderCount; $j++) {
                    if ($j == $horderCount) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Top-right corner check
        } elseif ($row == 0 && $column == count($arrayPosiciones[0]) - 1) {
            // Only checks the bottom-left surrounding area
            for ($i = 0; $i <= 1; $i++) {
                for ($j = -1; $j < $horderCount; $j++) {
                    if ($j == -1) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Bottom-left corner check
        } elseif ($row == count($arrayPosiciones) - 1 && $column == 0) {
            // Only checks the top-right surrounding area
            for ($i = -1; $i < 1; $i++) {
                for ($j = 0; $j <= $horderCount; $j++) {
                    if ($j == $horderCount) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Bottom-right corner check
        } elseif ($row == count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {
            // Only checks the top-left surrounding area
            for ($i = -1; $i < 1; $i++) {
                for ($j = -1; $j < $horderCount; $j++) {
                    if ($j == -1) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Top row, not on the corners
        } elseif ($row == 0 && $column != count($arrayPosiciones[0]) - 1) {
            // Check left, right, and bottom surrounding cells
            for ($i = 0; $i <= 1; $i++) {
                for ($j = -1; $j <= $horderCount; $j++) {
                    if ($j == -1 || $j == $horderCount) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Left column, not on the corners
        } elseif ($row != 0 && $column == 0) {
            // Check top, bottom, and right surrounding cells
            for ($i = -1; $i <= 1; $i++) {
                for ($j = 0; $j <= $horderCount; $j++) {
                    if ($j == $horderCount) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Bottom row, not on the corners
        } elseif ($row == count($arrayPosiciones) - 1 && $column != count($arrayPosiciones[0]) - 1) {
            // Check left, right, and top surrounding cells
            for ($i = -1; $i < 1; $i++) {
                for ($j = -1; $j <= $horderCount; $j++) {
                    if ($j == -1 || $j == $horderCount) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Right column, not on the corners
        } elseif ($row != count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {
            // Check top, bottom, and left surrounding cells
            for ($i = -1; $i <= 1; $i++) {
                for ($j = -1; $j < $horderCount; $j++) {
                    if ($j == -1) {
                        if ($arrayPosiciones[$row][$column + $j] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function isFreePosV($row, $column, $arrayPosiciones, $horderCount)
    {
        // Check if the position is not on the edges (top, bottom, left, right)
        if ($column != 0 && $column != count($arrayPosiciones[0]) - 1 && $row != 0 && $row != count($arrayPosiciones) - 1) {

            // Iterate over the cells vertically (based on the ship length) and horizontally for adjacent cells
            for ($i = -1; $i <= $horderCount; $i++) {

                for ($j = -1; $j <= 1; $j++) {  // Checks horizontally around the ship
    
                    // For the cells just before the start of the ship and just after the end
                    if ($i == -1 || $i == $horderCount) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {

                            return false;
                        }
                        // For the cells within the ship's area (including adjacent horizontal cells)
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Top-left corner check
        } elseif ($row == 0 && $column == 0) {
            // Only checks the right and bottom surrounding area
            for ($i = 0; $i <= $horderCount; $i++) {

                for ($j = 0; $j <= 1; $j++) {

                    if ($i == $horderCount) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Top-right corner check
        } elseif ($row == 0 && $column == count($arrayPosiciones[0]) - 1) {
            // Only checks the left and bottom surrounding area
            for ($i = 0; $i <= $horderCount; $i++) {

                for ($j = -1; $j < 1; $j++) {

                    if ($i == $horderCount) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
            // Bottom-left corner check
        } elseif ($row == count($arrayPosiciones) - 1 && $column == 0) {
            // Only checks the right and top surrounding area
            for ($i = -1; $i < $horderCount; $i++) {

                for ($j = 0; $j <= 1; $j++) {

                    if ($i == -1) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }

            // Bottom-right corner check
        } elseif ($row == count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {
            // Only checks the left and top surrounding area
            for ($i = -1; $i < $horderCount; $i++) {

                for ($j = -1; $j < 1; $j++) {

                    if ($i == -1) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }

            // Top row, not in the corners
        } elseif ($row == 0 && $column != count($arrayPosiciones[0]) - 1) {
            // Check the left, right, and bottom surrounding area
            for ($i = 0; $i <= $horderCount; $i++) {

                for ($j = -1; $j <= 1; $j++) {

                    if ($i == $horderCount) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }

            // Left column, not in the corners
        } elseif ($row != 0 && $column == 0) {
            // Check the top, right, and bottom surrounding area
            for ($i = -1; $i <= $horderCount; $i++) {

                for ($j = 0; $j <= 1; $j++) {

                    if ($i == -1 || $i == $horderCount) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }

            // Bottom row, not in the corners
        } elseif ($row == count($arrayPosiciones) - 1 && $column != count($arrayPosiciones[0]) - 1) {
            // Check left, right, and top surrounding area
            for ($i = -1; $i < $horderCount; $i++) {

                for ($j = -1; $j <= 1; $j++) {

                    if ($i == -1) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }

            // Right column, not in the corners
        } elseif ($row != count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {
            // Check top, left, and bottom surrounding area
            for ($i = -1; $i <= $horderCount; $i++) {

                for ($j = -1; $j < 1; $j++) {

                    if ($i == -1 || $i == $horderCount) {
                        if ($arrayPosiciones[$row + $i][$column] != "^^^") {
                            return false;
                        }
                    } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    function printEnemyTable($arrayPosiciones)
    {
        // Variable to store the starting character (A) for column labels
        $char = 65;

        // Loop to generate the rows of the table (i represents rows)
        for ($i = 0; $i <= 10; $i++) {
            echo "<tr>";

            // Nested loop to generate the cells of each row (j represents columns)
            for ($j = 0; $j <= 10; $j++) {

                // First cell in the top-left corner (i=0, j=0) contains a hidden "easter egg" butto
                // Top-left corner cell (i=0, j=0) is empty
                if ($i == 0 && $j == 0) {
                    echo "<td><button id='easterEggShowButton'></button></td>";
                }
                // Top row (i=0) labels the columns with letters (A, B, C, ...)
                elseif ($i == 0 && $j != 0) {

                    echo "<th>" . chr($char) . "</th>";
                    $char += 1;  // Move to the next letter
                } elseif ($i == 0 && $j != 0) {


                    echo "<th>" . chr($char) . "</th>";
                    $char += 1;  // Move to the next letter
                }
                // First column (j=0) labels the rows with numbers (1, 2, 3, ...)
                elseif ($i != 0 && $j == 0) {
                    echo "<th>$i</th>";
                }
                // The remaining cells represent the enemy's board
                else {
                    // Each button has a value from the $arrayPosiciones corresponding to the enemy's positions
                    echo "<td><button class='tableButton' value =" . $arrayPosiciones[$i - 1][$j - 1] . "></button></td>";
                }

            }
            echo "</tr>";
        }
    }

    function printPlayerTable($arrayPosiciones)
    {
        // Variable to store the starting character (A) for column labels
        $char = 65;

        // Loop to generate the rows of the table (i represents rows)
        for ($i = 0; $i <= 10; $i++) {
            echo "<tr>";

            // Nested loop to generate the cells of each row (j represents columns)
            for ($j = 0; $j <= 10; $j++) {

                // Top-left corner cell (i=0, j=0) is empty
                if ($i == 0 && $j == 0) {
                    echo "<td></td>";
                }
                // Top row (i=0) labels the columns with letters (A, B, C, ...)
                elseif ($i == 0 && $j != 0) {
                    echo "<th>" . chr($char) . "</th>";
                    $char += 1;  // Move to the next letter
                }
                // First column (j=0) labels the rows with numbers (1, 2, 3, ...)
                elseif ($i != 0 && $j == 0) {
                    echo "<th>$i</th>";
                }
                // The remaining cells represent the player's board
                else {
                    // Each cell contains a position from the $arrayPosiciones, with a 'data-value' attribute for the ship positions
                    echo "<td class='playerCell' data-value='" . $arrayPosiciones[$i - 1][$j - 1] . "'></td>";
                }

            }
            echo "</tr>";
        }
    }

    ?>
    <noscript>
        <div class="warning">
            Atenció: El JavaScript està deshabilitat al teu navegador. Si us plau, habilita el JavaScript per poder
            jugar.
        </div>
    </noscript>

    <div id="easterEggMessageBox">
        <div class="easterEggMessageBoxTextWrapper">
            <p>Enhorabona!</p>
            <p>Has trobat l'arca perduda.</p>
            <button id="easterEggCloseButton">Tancar</button>
        </div>
    </div>

    <div id="notificationsDiv">
        <div class="notification" id="victoryNotification">Has guanyat!</div>
        <div class="notification" id="sunkNotification">Has eliminat tota l'horda!</div>
        <div class="notification" id="touchedNotification">Has eliminat un enemic!</div>
        <div class="notification" id="gameoverNotification">Has perdut!</div>
        <div class="notification" id="waterNotification">Directe a l'aigua!</div>
    </div>

    <div class="PrincipalDiv">
        <table>

            <?php

            printEnemyTable($arrayPosicionsPlayer);

            ?>


        </table>
        <table>

            <?php

            printPlayerTable($arrayPosicionsEnemy);

            ?>


        </table>




    </div>


</body>



</html>