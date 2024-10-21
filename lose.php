<?php session_start();
if (isset($_SESSION['name']) && isset($_GET['score'])) {

    $name = $_SESSION['name'];
    $score = $_GET['score'];

}
//zona horaria
date_default_timezone_set('Europe/Madrid'); // Cambia 'Europe/Madrid' a la zona horaria que necesites


if (isset($_POST['name'])) {

    $name = $_POST['name'];

}

//zona horaria
date_default_timezone_set('Europe/Madrid'); // Cambia 'Europe/Madrid' a la zona horaria que necesites

// Verificar si se envió el formulario
if (isset($_POST['score']) && isset($_POST['score'])) {

    $score = $_POST['score'];

    $date = date('Y-m-d H:i'); // Formato de fecha y hora


    $openTXT = fopen("ranking.txt", "a");



    if ($openTXT) {


        fwrite($openTXT, $name . ';' . $score . ';' . $date . "\n");//esribimos

        fclose($openTXT); // Cerramos el archivo después de escribir


    }

}

?>

<!DOCTYPE html>

<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lose</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
    <script src="lose.js"></script>
</head>

<body class="page-lose">

    <?php

    // Verifica si el encabezado HTTP_REFERER está establecido
    
    if (
        !isset($_SERVER['HTTP_REFERER']) ||
        (strpos($_SERVER['HTTP_REFERER'], 'game.php') === false && strpos($_SERVER['HTTP_REFERER'], 'win.php') === false)
    ) {
        // Si no es referida desde la página del juego, retorna un 403
        header('HTTP/1.1 403 Forbidden');
        echo " <div id='finalForbiScreen'>

    <h2>403 Forbidden: Has de accedir desde Game</h2>
    
    </div>";

        exit;
    } else {
        // Aquí va el código de la página de victoria o derrota
        echo "
    
   <div id='finalScreen' class='show'>
    <h1>¡Felicitats, has perdut!</h1>
    <img src='../Images/trofeo.jpg' alt='foto trofeo' class='trophy-img'>

    <!-- Formulario para el nombre del jugador -->
    <form id='saveRecordForm' action='lose.php' method='post'>
        <div id='nameInputContainer'>
            <label for='name'>Introdueix el teu nom:</label>
            <input type='text' id='name' name='name' value='$name' required>
        </div>

        <div id='divError'> 
            <p>El nom ha de tenir entre 3 i 30 caràcters.</p>
        </div>

        <!-- Campo oculto para enviar la puntuación -->
        <input type='hidden' name='score' value='$score'>

        <!-- Botón de enviar el formulario -->
        <div id='buttonDiv'>
            <input type='submit' id='saveRecord' class='button' value='Guardar Rècord'>
        </div>
    </form>

    <!-- Botón de volver a la Landing Page (fuera del formulario) -->
    <div id='buttonDiv'>
        <button id='toLanding' class='button'>Volver a la Landing Page</button>
    </div>
</div>";
    }
    ?>
</body>

</html>