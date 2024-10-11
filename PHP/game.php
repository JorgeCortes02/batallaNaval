<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="../CSS/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
</head>

<body class="page-game">
    <div class="contenedorPrincipal">
        <table>

            <?php
            $letra = 65;

            $arrayPosiciones = array();

            $ordas = [[2], [3], [4], [5]];
            //rellena las posciones del array con agua. Evitamos que pete.
            for ($i = 0; $i <= 9; $i++) {

                for ($j = 0; $j <= 9; $j++) {
                    $arrayPosiciones[$i][$j] = "^^^";
                }
            }

            for ($i = 0; $i < count($ordas); $i++) {

                $orientation = rand(0, 1);

                //Si la orientacion es horizntal...
                if ($orientation == 0) {

                    $libre = false;

                    //Buscamos de forma aleatoria una posicion para coloar el barco.
                    while ($libre == false) {

                        //Buscamos una posicion aleatoria
                        $row = rand(0, count($arrayPosiciones) - 1);

                        $column = rand(0, count($arrayPosiciones[$row]) - 1 - $ordas[$i][0]);

                        $ordas[$i][1] = [];

                        $libre = isFreePosH($row, $column, $arrayPosiciones, $ordas[$i][0]);


                    }

                    if ($libre == true) {

                        for ($j = 0; $j < $ordas[$i][0]; $j++) {

                            $arrayPosiciones[$row][$column + $j] = $ordas[$i][0];
                            array_push($ordas[$i][1], "$row,($column + $j)");

                        }
                    }

                } else {

                    $libre = false;

                    //Buscamos de forma aleatoria una posicion para coloar el barco.
                    while ($libre == false) {

                        //Buscamos una posicion aleatoria
                        $row = rand(0, count($arrayPosiciones) - 1 - $ordas[$i][0]);

                        $column = rand(0, count($arrayPosiciones[$row]) - 1);

                        $ordas[$i][1] = [];

                        $libre = isFreePosV($row, $column, $arrayPosiciones, $ordas[$i][0]);


                    }

                    if ($libre == true) {

                        for ($j = 0; $j < $ordas[$i][0]; $j++) {
                            $arrayPosiciones[$row + $j][$column] = $ordas[$i][0];
                            array_push($ordas[$i][1], "($row+$j),$column");

                        }
                    }


                }


            }

            for ($i = 0; $i <= 10; $i++) {
                echo "<tr>";
                for ($j = 0; $j <= 10; $j++) {

                    if ($i == 0 && $j == 0) {
                        echo "<td></td>";
                    } elseif ($i == 0 && $j != 0) {

                        echo "<th>" . chr($letra) . "</th>";

                        $letra += 1;


                    } elseif ($i != 0 && $j == 0) {


                        echo "<th>$i</th>";

                    } else {


                        echo "<td><button value =" . $arrayPosiciones[$i - 1][$j - 1] . "></button></td>";

                    }

                }
                echo "</tr>";
            }


            function isFreePosH($row, $column, $arrayPosiciones, $tamañoOrda)
            {

                if ($column != 0 && $column != count($arrayPosiciones[0]) - 1 && $row != 0 && $row != count($arrayPosiciones) - 1) {

                    for ($i = -1; $i <= 1; $i++) {

                        for ($j = -1; $j <= $tamañoOrda; $j++) {

                            if ($j == -1 || $j == $tamañoOrda) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;

                            }

                        }

                    }


                } elseif ($row == 0 && $column == 0) {

                    for ($i = 0; $i <= 1; $i++) {

                        for ($j = 0; $j <= $tamañoOrda; $j++) {

                            if ($j == $tamañoOrda) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }

                } elseif ($row == 0 && $column == count($arrayPosiciones[0]) - 1) {

                    for ($i = 0; $i <= 1; $i++) {

                        for ($j = -1; $j < $tamañoOrda; $j++) {

                            if ($j == -1) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }

                } elseif ($row == count($arrayPosiciones) - 1 && $column == 0) {

                    for ($i = -1; $i < 1; $i++) {

                        for ($j = 0; $j <= $tamañoOrda; $j++) {

                            if ($j == $tamañoOrda) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {
                                return false;
                            }

                        }

                    }

                    $libre = true;
                } elseif ($row == count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {

                    for ($i = -1; $i < 1; $i++) {

                        for ($j = -1; $j < $tamañoOrda; $j++) {

                            if ($j == -1) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }

                    $libre = true;
                } elseif ($row == 0 && $column != count($arrayPosiciones[0]) - 1) {

                    for ($i = 0; $i <= 1; $i++) {

                        for ($j = -1; $j <= $tamañoOrda; $j++) {

                            if ($j == -1 || $j == $tamañoOrda) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }


                } elseif ($row != 0 && $column == 0) {

                    for ($i = -1; $i <= 1; $i++) {

                        for ($j = 0; $j <= $tamañoOrda; $j++) {

                            if ($j == $tamañoOrda) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }


                } elseif ($row == count($arrayPosiciones) - 1 && $column != count($arrayPosiciones[0]) - 1) {

                    for ($i = -1; $i < 1; $i++) {

                        for ($j = -1; $j <= $tamañoOrda; $j++) {

                            if ($j == -1 || $j == $tamañoOrda) {
                                if ($arrayPosiciones[$row][$column + $j] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }


                } elseif ($row != count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {

                    for ($i = -1; $i <= 1; $i++) {

                        for ($j = -1; $j < $tamañoOrda; $j++) {

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

            function isFreePosV($row, $column, $arrayPosiciones, $tamañoOrda)
            {

                if ($column != 0 && $column != count($arrayPosiciones[0]) - 1 && $row != 0 && $row != count($arrayPosiciones) - 1) {

                    for ($i = -1; $i <= $tamañoOrda; $i++) {

                        for ($j = -1; $j <= 1; $j++) {

                            if ($i == -1 || $i == $tamañoOrda) {
                                if ($arrayPosiciones[$row + $i][$column] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;

                            }

                        }

                    }


                } elseif ($row == 0 && $column == 0) {

                    for ($i = 0; $i <= $tamañoOrda; $i++) {

                        for ($j = 0; $j <= 1; $j++) {

                            if ($i == $tamañoOrda) {
                                if ($arrayPosiciones[$row + $i][$column] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }

                } elseif ($row == 0 && $column == count($arrayPosiciones[0]) - 1) {

                    for ($i = 0; $i <= $tamañoOrda; $i++) {

                        for ($j = -1; $j < 1; $j++) {

                            if ($i == $tamañoOrda) {
                                if ($arrayPosiciones[$row + $i][$column] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }

                } elseif ($row == count($arrayPosiciones) - 1 && $column == 0) {

                    for ($i = -1; $i < $tamañoOrda; $i++) {

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

                    $libre = true;
                } elseif ($row == count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {

                    for ($i = -1; $i < $tamañoOrda; $i++) {

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

                    $libre = true;
                } elseif ($row == 0 && $column != count($arrayPosiciones[0]) - 1) {

                    for ($i = 0; $i <= $tamañoOrda; $i++) {

                        for ($j = -1; $j <= 1; $j++) {

                            if ($i == $tamañoOrda) {
                                if ($arrayPosiciones[$row + $i][$column] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }


                } elseif ($row != 0 && $column == 0) {

                    for ($i = -1; $i <= $tamañoOrda; $i++) {

                        for ($j = 0; $j <= 1; $j++) {

                            if ($i == -1 || $i == $tamañoOrda) {
                                if ($arrayPosiciones[$row + $i][$column] != "^^^") {

                                    return false;

                                }

                            } elseif ($arrayPosiciones[$row + $i][$column + $j] != "^^^") {

                                return false;
                            }

                        }

                    }


                } elseif ($row == count($arrayPosiciones) - 1 && $column != count($arrayPosiciones[0]) - 1) {

                    for ($i = -1; $i < $tamañoOrda; $i++) {

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


                } elseif ($row != count($arrayPosiciones) - 1 && $column == count($arrayPosiciones[0]) - 1) {

                    for ($i = -1; $i <= $tamañoOrda; $i++) {

                        for ($j = -1; $j < 1; $j++) {

                            if ($i == -1 || $i == $tamañoOrda) {
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

            ?>
        </table>
        <div class="marcador">
            <h1 class="titulo-principal">Lost in the Sand</h1>
        </div>


    </div>


</body>
<footer>

    <h3>Desarrollado por Pau Gracia, William Sargisson, Jorge Cortes</h3>

</footer>


</html>