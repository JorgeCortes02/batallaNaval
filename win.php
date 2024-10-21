<?php session_start();
if (isset($_SESSION['name'])) {

    $name = $_SESSION['name'];

} else {

    $name = "Introduce tu nombre.";

}


?>

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



    // Aquí va el código de la página de victoria o derrota
    echo "<div class='main_container yellowBox'>

            <h1>LOST IN THE SANDS</h1>
            <h1>Felidades has ganado!</h1>
            <div id='nameRecord'>
                        <label for='name'>Allista't, com et dius:</label>
                        <input type='text' id='nameIndex' name='name' value='$name' required>
                    </div>
                    <div id='longUser'>
                        <h3>El jugador ha de tenir entre 3 i 30 caràcters.</h3>
                    </div>
                    <div id='buttonPlay'>
                    
                    <button id='saveRecord' class='button-disabled' type='submit'>Guardar record</button>

                    <button id='toButton2' class='buttonActive' type='button' >Index</button>
                </div>
            </div>";

    ?>


</html>