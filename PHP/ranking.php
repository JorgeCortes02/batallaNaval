<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALL OF FAME</title>
    <link rel="stylesheet" href="../CSS/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
</head>

<body class="page-ranking">

    <table>

        <?php

            // LECTURA DEL ARCHIVO Y CARGA EN MEMORIA DE LOS JUGADORES

            $file = fopen("../TXT/ranking.txt", "r");

            $players = [];

            while(!feof($file)) {

                $player = fgets($file);
                $playerSplitted = explode(";", $player);
                $players[]= $playerSplitted;

            }

            fclose($file);

            ob_start();
            var_dump($players);
            $output = ob_get_clean();
            echo '<p>' . htmlspecialchars($output) . '</p>';

            // ORDENACIÓN DEL RANKING

            usort($players, function($a, $b) {
                return $b[1] - $a[1]; // Sort in descending order based on the score
            });
            
            print_r($players);
            
            // PAGINACION

            

            // MUESTRA
        ?>
        
    </table>

</body>

</html>