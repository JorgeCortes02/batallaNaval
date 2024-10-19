document.addEventListener("DOMContentLoaded", function () {

    let initGameButton = document.getElementById("toGame");
    let toButton = document.getElementById("toButton");
    //initGameButton.classList.replace("button-disabled", "buttonActive");
    //toGameA.classList.replace("aDisabled", "aActive");

//cambiar de estado el mensaje de error al introducir nombre
    function hideH3() {
        var h3Element = document.querySelector('#longUser h3');
        h3Element.style.visibility = 'hidden';  // Oculta el h3 pero mantiene su espacio
    }
    
    function showH3() {
        var h3Element = document.querySelector('#longUser h3');
        h3Element.style.visibility = 'visible';  // Muestra el h3 nuevamente
    }


    //cambiar de estado el mensaje de nombre obligatorio
    function hideNoNameH3() {
        var h3Element = document.querySelector('#nolongUser h3');
        h3Element.style.visibility = 'hidden';  // Oculta el h3 pero mantiene su espacio
    }
    
    function showNameH3() {
        var h3Element = document.querySelector('#nolongUser h3');
        h3Element.style.visibility = 'visible';  // Muestra el h3 nuevamente
    }

//para ocultar hideH3(); y para llamar showH3();

function openButtonPClassic() {
    var user = document.getElementById("nameIndex").value; // obtener el nombre introducido
    if (user.length === 0) {
        // si imput vacio no mensaje
        hideH3();
        showNameH3()
        initGameClassic.classList.replace("buttonActive", "button-disabled");
        toButton.classList.replace("aActive", "aDisabled");
        initGameClassic.disabled = true;
        toGameA.style.pointerEvents = 'none';
    } else if(user.length>=3 && user.length<=30) {
        hideH3();
        hideNoNameH3()
        initGameButton.classList.replace("button-disabled", "buttonActive");
        toButton.classList.replace("aDisabled", "aActive");
         // Habilita el botón para que sea clickeable
        initGameButton.disabled = false;
        toGame.style.pointerEvents = 'auto';

    }else{
        showH3()
        hideNoNameH3()
         // Desactiva el botón
         initGameButton.classList.replace("buttonActive", "button-disabled");
         toButton.classList.replace("aActive", "aDisabled");
         initGameButton.disabled = true;
         toGame.style.pointerEvents = 'none';

    }
}

 // mirar input en tiempo real
 document.getElementById("nameIndex").addEventListener("input", openButtonPClassic);

  // empezamos con boton desabilitado
  initGameClassic.disabled = true;
  toGameA.style.pointerEvents = 'none';

});


