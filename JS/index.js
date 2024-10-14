document.addEventListener("DOMContentLoaded", function () {


    let initGameButton = document.getElementById("initGame");

    let goToHallButton = document.getElementById("goToHall");

    initGameButton.classList.replace("button-disabled", "buttonActive");

    initGameButton.addEventListener("click", function () {

        window.location.href = "game.php";
    });
    goToHallButton.addEventListener("click", function () {

        window.location.href = "ranking.php";
    });

});