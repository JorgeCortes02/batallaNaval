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
        <form id="combinedForm" action="game.php" method="POST" style="display:none;">
            <input type="hidden" name="name">
            <input type="hidden" name="munition">
            <input type="hidden" name="armor">
            <input type="hidden" name="specialAtack">
        </form>

        <div id="options">
            <h1>LOST IN THE SANDS</h1>
            <button class="image-button">
                <img src="images/icons8-gears-50.png" alt="Gears Icon">

            </button>
        </div>
        <form id="optionsForm">
            <div id="checkboxes">
                <h3>Selecciona opcions:</h3>
                <label>
                    <input type="checkbox" name="options" value="Option 1"> Munició Limitada
                </label><br>
                <label>
                    <input type="checkbox" name="options" value="Option 2" disabled> Acoirassats
                </label><br>
                <label>
                    <input type="checkbox" name="options" value="Option 3" disabled> Atac Especial
                </label><br>
            </div>
        </form>
        <p>Endinsa't en el fascinant món de l'antic Egipte en aquest emocionant joc de batalla naval!
            Enmig de les misterioses dunes del desert i sota el sol abrasador, hauràs de comandar la teva pròpia flota
            per enfrontar-te
            a un exèrcit de mòmies malèvoles que han despertat de les seves tombes.</p>
        <p>El teu objectiu és trobar i destruir les hordes de mòmies seleccionant les diferents posicions en què es
            trobaran.
            L'estratègia, la punteria i una mica de sort seran les teves millors aliades en aquesta aventura.
            Dispara amb precisió per aconseguir la victòria!</p>

        <form id="myForm" method="POST" action="game.php">
            <div id="nameRecord">
                <label for="name">Allista't! Com et dius (Només per partida classica.):</label>
                <input type="text" id="nameIndex" name="name" value="" required>
            </div>
            <div id="longUser">
                <h3 id="errorLong">El jugador ha de tenir entre 3 i 30 caràcters.</h3>
            </div>

        </form>

        <div class="button_container">
            <a id="toTutoA" class="aDisabled" href="tutorial.php"><button id="initTuto"
                    class="button-disabled">Tutorial</button></a>
            <a id="toGameA" class="aDisabled" href="game.php"><button id="initGame" class="button-disabled">Partida
                    Classica</button></a>
            <a class="aActive" href="ranking.php"><button id="goToHall" class="buttonActive">HALL OF FAME</button></a>
        </div>
    </div>

</html>