<!DOCTYPE html>

<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Win</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">

</head>

<body class="page-index">
    <?php
    // Verifica si el encabezado HTTP_REFERER está establecido
    if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'game.php') === false) {
        // Si no es referida desde la página del juego, retorna un 403
        header('HTTP/1.1 403 Forbidden');
        echo " <div class='main_container yellowBox'>

        <h1>403 Forbidden: Has de accedir desde Game</h1>
        
    </div>
";
        exit;
    }

    // Aquí va el código de la página de victoria o derrota
    echo "¡Felicidades! Has ganado el juego.";
    ?>

    <div class="main_container yellowBox">

        <h1>LOST IN THE SANDS</h1>
        <h1>Felidades has ganado!</h1>
    </div>

</html>