document.addEventListener("DOMContentLoaded", function () {

    let initTutoButton = document.getElementById("initTuto");
    let toTutoA = document.getElementById("toTutoA");
    initTutoButton.classList.replace("button-disabled", "buttonActive");
    toTutoA.classList.replace("aDisabled", "aActive");


    let initGameButton = document.getElementById("initGame");
    let toGameA = document.getElementById("toGameA");


    const nameInput = document.getElementById('nameIndex');
    errorDiv = document.getElementById('errorLong');
    // Añadir el eventListener para el evento 'blur'
    nameInput.addEventListener('input', function () {
        const nameValue = nameInput.value.trim();

        // Validar la longitud del nombre
        if (nameValue.length < 3 || nameValue.length > 30) {
            errorDiv.style.visibility = 'visible'; // Mostrar el mensaje de error
            initGameButton.classList.replace("buttonActive", "button-disabled");
            toGameA.classList.replace("aActive", "aDisabled");
        } else {
            errorDiv.style.visibility = 'hidden'; // Mostrar el mensaje de error
            initGameButton.classList.replace("button-disabled", "buttonActive");
            toGameA.classList.replace("aDisabled", "aActive");
        }
    });

});

