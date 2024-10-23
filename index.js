document.addEventListener("DOMContentLoaded", function () {
    const initTutoButton = document.getElementById("initTuto");
    const toTutoA = document.getElementById("toTutoA");

    const combinedForm = document.getElementById("combinedForm");
    const nameForm = document.getElementById("myForm");
    const initGameButton = document.getElementById("initGame");
    const toGameA = document.getElementById("toGameA");
    const preferencesButtom = document.getElementsByClassName("image-button")[0];

    let enabledPreferences = false;
    const checkDiv = document.getElementById("optionsForm");

    preferencesButtom.addEventListener("click", function () {
        enabledPreferences = !enabledPreferences;
        checkDiv.style.display = enabledPreferences ? "flex" : "none";
    });

    const nameInput = document.getElementById('nameIndex');
    const errorDiv = document.getElementById('errorLong');

    // Validación del nombre
    nameInput.addEventListener('input', function () {
        const nameValue = nameInput.value.trim();
        if (nameValue.length < 3 || nameValue.length > 30) {
            errorDiv.style.visibility = 'visible';
            initGameButton.classList.replace("buttonActive", "button-disabled");
            toGameA.classList.replace("aActive", "aDisabled");
        } else {
            errorDiv.style.visibility = 'hidden';
            initGameButton.classList.replace("button-disabled", "buttonActive");
            toGameA.classList.replace("aDisabled", "aActive");
            initTutoButton.classList.replace("button-disabled", "buttonActive");
            toTutoA.classList.replace("aDisabled", "aActive");
        }
    });

    // Al hacer clic en el botón, combinar y enviar los datos
    toGameA.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir la redirección automática del enlace

        const nombreValor = nameInput.value.trim();
        const checkboxes = document.getElementsByName('options');
        let checkboxValues = [];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxValues.push(checkboxes[i].value);
            }
        }

        // Rellenar los campos ocultos del formulario combinado
        combinedForm.elements['name'].value = nombreValor;
        combinedForm.elements['munition'].value = checkboxValues.includes("Option 1") ? true : false;
        combinedForm.elements['armor'].value = checkboxValues.includes("Option 2") ? true : false;
        combinedForm.elements['specialAtack'].value = checkboxValues.includes("Option 3") ? true : false;
        // Enviar el formulario
        combinedForm.submit();
    });

    toTutoA.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir la redirección automática del enlace
        // Enviar el formulario
        nameForm.submit();
    });
});