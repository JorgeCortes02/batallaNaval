<?php
session_start();

$_SESSION["name"] = "name"

?>



<!DOCTYPE html>

<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main page</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
    <script src="index.js"></script>
</head>

<body class="page-index">

    

    <div class="main_container yellowBox">
        
        <noscript>
            <div class="warning">
                Atenció: El JavaScript està deshabilitat al teu navegador. Si us plau, habilita el JavaScript per poder
                jugar.
            </div>
        </noscript>
        <div id="option">
            <label id="titleCheckbox">Opcions:</label>
            <label><input type="checkbox" id="ammoEnabled" value="limited-Munition" onchange="checkOnlyOne(this)">Munició limitada</label>
            <label><input type="checkbox" id="box2" value="battleships" onchange="checkOnlyOne(this)"disabled>Vaixells acoirassats</label><!--opciones desabilitadas-->
            <label><input type="checkbox" id="box3" value="special-attacks" onchange="checkOnlyOne(this)"disabled>Atacs especials</label>
        </div>
        <h1>LOST IN THE SANDS</h1>
        <p>Endinsa't en el fascinant món de l'antic Egipte en aquest emocionant joc de batalla naval!
            Enmig de les misterioses dunes del desert i sota el sol abrasador, hauràs de comandar la teva pròpia flota
            per enfrontar-te
            a un exèrcit de mòmies malèvoles que han despertat de les seves tombes.</p>
        <p>El teu objectiu és trobar i destruir les hordes de mòmies seleccionant les diferents posicions en què es
            trobaran.
            L'estratègia, la punteria i una mica de sort seran les teves millors aliades en aquesta aventura.
            Dispara amb precisió per aconseguir la victòria!</p>
        
        <div class="button_container">

            
                <form id="myForm" method="POST" action="game.php">
                    <div id="nameRecord">
                        <label for="name">Allista't, com et dius:</label>
                        <input type="text" id="nameIndex" name="name" value="" required>
                    </div>
                    <div id="longUser">
                        <h3>El jugador ha de tenir entre 3 i 30 caràcters.</h3>
                    </div>
                    <div id="nolongUser">
                        <h3>Es obligatori escriure un nom.</h3>
                    </div>
                    <div id="buttonPlay">
                        <button id="toButton" class="buttonActive" type="button" onclick="location.href='tutorial.php';">TUTORIAL OF GAME</button>
                        <button id="toGame" class="button-disabled" type="submit">PARTIDA CLÀSICA</button>
                       
                        <button id="toButton2" class="buttonActive" type="button" onclick="location.href='ranking.php';">HALL OF FAME</button>
                    </div>
                </form>
                        
            

            <!--<a id="toGameA" class="aDisabled" href="game.php"><button id="initGame" class="button-disabled">PARTIDA CLÀSICA</button></a>-->
            

        </div>
    </div>

</html>