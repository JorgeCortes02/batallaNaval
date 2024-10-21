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
    <script src="index.js"></script>
</head>

<body class="page-index">

    <?php



    // Aquí va el código de la página de victoria o derrota
    echo "
    
    <div id='finalScreen' class='show'>
    <h1>¡Felicidades, has ganado!</h1>
   <img src='../Images/trofeo.jpg' alt='foto trofeo'>
    <div id='nameInputContainer'>
        <label for='name'>Introduce tu nombre:</label>
        <input type='text' id='name' name='name' value='' required>
    </div>
    <div id ='buttonDiv'>
        <button id='saveRecord' class='buttonActive'>Guardar Rècord</button>
        <button id='toLanding' class='buttonActive'>Volver a la Landing Page</button>
    </div>
</div>";

    ?>


</html>