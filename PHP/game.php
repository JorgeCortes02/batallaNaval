<?php
session_start();


// Inicializamos la variable por defecto para evitar errores.
$name = "";

// Verificar si se envió el formulario
if (isset($_POST['name']) && isset($_POST['score'])) {
    $name = $_POST['name'];
    $score = $_POST['score'];

     // Validación del nombre
     if (strlen($name) < 3 || strlen($name) > 14) {
        
        echo "El nombre debe tener entre 3 y 14 caracteres.";
        exit; // Detener la ejecución del script
    }

    $date = date('Y-m-d H:i'); // Formato de fecha y hora

    $newTXT = "ranking.txt";

    $openTXT = fopen($newTXT, "a");



    if ($openTXT) {
    

    fwrite($openTXT, $name . ';' . $score . ';' . $date . "\n");//esribimos

    fclose($openTXT); // Cerramos el archivo después de escribir

    } else {
        echo "";
    }

}


?>




<!DOCTYPE html>
<html lang="es">

<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Liberation+Sans:wght@400;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="../CSS/styles.css">
    <title>Games</title>
</head>

<body>
<div id="time">

<time id="chronometer" datetime="clock">00:00:00</time>

</div>

<div id="marker">

<p id="scoreDisplay">00000</p>


</div>

<div id="recordButton">

    <button id="openWindows">Guardar Record</button>

</div>

<div id="popup" class="modal">
    <div class="windowsForm">
        <span class="close">&times;</span>
   
        <form id="myForm" method="POST" action="game.php">
            <label for="name">Introdueix el Nom:</label><br>
            <input type="text" id="name" name="name" value="" required><br><br>
             <!-- Contenedor para mensajes de largo nombre -->
             <div id="longName"></div><br>
            <button type="submit">Guardar</button>
        </form>
    </div>

</div>


<script src="../JS/time.js"></script>

</body>

</html>





