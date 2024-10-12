<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="../CSS/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
    <script src="../JS/game.js"></script>
</head>

<body class="page-game">

    <?php

    $horders = [[2], [3], [4], [5]];  // Define an array of ship lengths (2, 3, 4, and 5).
    
    $arrayPosiciones = array();  // Initialize an empty array to hold the positions on the board.
    
    initPosicionArray($arrayPosiciones);
    generateRandomHorders($horders, $arrayPosiciones);

    //Function for init the positionArray(the board of the players).
    function initPosicionArray(&$arrayPosiciones)
    {

        for ($i = 0; $i <= 9; $i++) {
            for ($j = 0; $j <= 9; $j++) {
                $arrayPosiciones[$i][$j] = "^^^";
            }
        }
    }

    //Function for generate the random holders.
    function generateRandomHorders(&$horders, &$arrayPosiciones)
    {
        // Loop through each ship length defined in $horders.
        for ($i = 0; $i < count($horders); $i++) {

            // Randomly decide the orientation.
            $orientation = rand(0, 1);

            // If orientation is horizontal...
            if ($orientation == 0) {

                $freePosition = false;  // Flag to check if a free position is found.
    

                while ($freePosition == false) {
                    // Generate random row and column positions for the ship.
                    $row = rand(0, count($arrayPosiciones) - 1);  // Random row index.
                    // Calculate the column index, ensuring the ship fits within the array.
                    $column = rand(0, count($arrayPosiciones[$row]) - 1 - $horders[$i][0]);

                    $horders[$i][1] = [];  // Initialize the position storage for the ship.
    
                    // Check if the chosen position is free using the function isFreePosH.
                    $freePosition = isFreePosH($row, $column, $arrayPosiciones, $horders[$i][0]);
                }


                if ($freePosition == true) {
                    // Place the ship on the board horizontally.
                    for ($j = 0; $j < $horders[$i][0]; $j++) {
                        // Mark the ship's positions in the array with its length.
                        $arrayPosiciones[$row][$column + $j] = $horders[$i][0];

                    }
                }

                // If the orientation is vertical:
            } else {
                $freePosition = false;  // Reset the flag to check for free position.
    
                // Keep searching for a random position to place the ship until a free position is found.
                while ($freePosition == false) {
                    // Generate random row and column positions for the ship.
    
                    $row = rand(0, count($arrayPosiciones) - 1 - $horders[$i][0]);
                    $column = rand(0, count($arrayPosiciones[$row]) - 1);  // Random column index.
    
                    $horders[$i][1] = [];  // Initialize the position storage for the ship.
    

                    $freePosition = isFreePosV($row, $column, $arrayPosiciones, $horders[$i][0]);
                }

                // If a free position is confirmed...
                if ($freePosition == true) {

                    for ($j = 0; $j < $horders[$i][0]; $j++) {
                        // Mark the ship's positions in the array with its length.
                        $arrayPosiciones[$row + $j][$column] = $horders[$i][0];

                    }
                }
            }
        }
    }
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
    function printTable($arrayPosiciones)
    {
        $char = 65;
        for ($i = 0; $i <= 10; $i++) {
            echo "<tr>";
            for ($j = 0; $j <= 10; $j++) {

                if ($i == 0 && $j == 0) {
                    echo "<td></td>";
                } elseif ($i == 0 && $j != 0) {

                    echo "<th>" . chr($char) . "</th>";

                    $char += 1;


                } elseif ($i != 0 && $j == 0) {


                    echo "<th>$i</th>";

                } else {


                    echo "<td><button class='tableButton' value =" . $arrayPosiciones[$i - 1][$j - 1] . "></button></td>";

                }

            }
            echo "</tr>";
        }
    }

    ?>

    <div class="PrincipalDiv">
        <table>

            <?php

            printTable($arrayPosiciones);

            ?>


        </table>

        <div class="scoreboard">
            <h1>Lost in the Sand</h1>
        </div>


    </div>

    <footer>

        <h3>Desarrollado por Pau Gracia, William Sargisson y Jorge Cortes</h3>

    </footer>

</body>



</html>