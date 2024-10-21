<!DOCTYPE html>

<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Win</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">

</head>

<body class="page-win">
    <?php
    //COMENTADO PARA PRUEVAS
    // Verifica si el encabezado HTTP_REFERER está establecido
   /* if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'game.php') === false) {
        // Si no es referida desde la página del juego, retorna un 403
        header('HTTP/1.1 403 Forbidden');
        echo " <div class='main_container yellowBox'>

        <h1>403 Forbidden: Has de accedir desde Game</h1>
        
    </div>
";
        exit;
    }*/

    // Aquí va el código de la página de victoria o derrota
    //echo "¡Felicidades! Has ganado el juego.";
    ?>

    <div class="main_container-victory">

        <h1>Victoria!</h1>
        <p>Les teves grans dots tàctiques i la teva extraordinària capacitat de lideratge ens han conduït al més gran dels èxits. 
        El faraó està profundament orgullós de tu i et recompensarà amb la més gran de les fortunes imaginables. 
        Ara, et confia la missió sagrada de protegir el seu poble de qualsevol maledicció que pugui venir en el futur, 
        perquè el regne perduri en la prosperitat i la glòria eterna.</p>
    </div>

</html>