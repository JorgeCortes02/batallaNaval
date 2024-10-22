document.addEventListener("DOMContentLoaded", function () {

    let initTutoButton = document.getElementById("initTuto");
    let toTutoA = document.getElementById("toTutoA");
    initTutoButton.classList.replace("button-disabled", "buttonActive");
    toTutoA.classList.replace("aDisabled", "aActive");
    const combinedForm = document.getElementById("combinedForm");

    let initGameButton = document.getElementById("initGame");
    let toGameA = document.getElementById("toGameA");
    let preferencesButtom = document.getElementsByClassName("image-button")[0];
    let enabledPrefecences = false;

    let checkDiv = this.getElementById("optionsForm");

    preferencesButtom.addEventListener("click", function () {

        if (enabledPrefecences === false) {
            enabledPrefecences = true;
            checkDiv.style.display = "flex";
        } else {
            enabledPrefecences = false;
            checkDiv.style.display = "none";
        }
    });

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


    // Al hacer clic en el botón externo, combinar y enviar los datos
    toGameA.addEventListener('click', function () {
        const nombreValor = nombreInput.value.trim();
        const checkboxes = document.getElementsByName('options'); // Usar getElementsByName
        let checkboxValues = [];

        // Recorre los checkboxes para recoger los valores seleccionados
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxValues.push(checkboxes[i].value);
            }
        }


        // Rellenar los campos ocultos del formulario combinado
        // Rellenar los campos ocultos del formulario combinado
        combinedForm.elements['nombre'].value = nombreValor;
        combinedForm.elements['munition'].value = checkboxValues.includes("Option 1") ? "true" : "false"; // Devuelve true o false
        combinedForm.elements['armor'].value = checkboxValues.includes("Option 2") ? "true" : "false"; // Devuelve true o false
        combinedForm.elements['specialAtack'].value = checkboxValues.includes("Option 3") ? "true" : "false"; // Devuelve true o false


        // Enviar el formulario combinado
        combinedForm.submit();
    });
});

