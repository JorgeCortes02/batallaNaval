<!DOCTYPE html>

<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main page</title>
    <link rel="stylesheet" type="text/css" href="../CSS/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
    <script src="../JS/index.js"></script>
</head>

<body class="page-index">


    <div class="main_container yellowBox">
        <noscript>
            <div class="warning">
                Atenció: El JavaScript està deshabilitat al teu navegador. Si us plau, habilita el JavaScript per poder
                jugar.
            </div>
        </noscript>
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
            <a id="toGameA" class="aDisabled" href="game.php"><button id="initGame" class="button-disabled">PARTIDA
                    CLÀSICA</button></a>
            <a class="aActive" href="ranking.php"><button id="goToHall" class="buttonActive">HALL OF FAME</button></a>
        </div>
    </div>

</html>