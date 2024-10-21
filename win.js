const gameSounds = [new Audio('sounds/victory.mp3')];


document.addEventListener("DOMContentLoaded", function () {
    // Mostrar el finalScreen con una animación de entrada
    const finalScreen = document.getElementById('finalScreen');
    finalScreen.classList.add('show');
    gameSounds[0].volume = 0; // Silenciar
    gameSounds[0].play().then(() => {
        gameSounds[0].volume = 1; // Aumentar el volumen después de que el audio comienza
    }).catch(error => {
        console.error('No se pudo reproducir el sonido automáticamente:', error);
    });
    // Obtener elementos necesarios
    const nameInput = document.getElementById('name');
    const errorDiv = document.getElementById('divError');
    const form = document.getElementById('saveRecordForm');
    const toLandingButton = document.getElementById('toLanding');
    const submitButton = document.getElementById('saveRecord'); // Obtener el botón de enviar

    // Reiniciar la visibilidad del mensaje de error y habilitar el botón de envío
    errorDiv.style.display = 'none';
    submitButton.disabled = false; // Asegurarse de que el botón está habilitado al cargar la página

    // Función para validar la longitud del nombre
    function validateName() {
        const nameValue = nameInput.value.trim();

        // Validar la longitud del nombre
        if (nameValue.length < 3 || nameValue.length > 30) {
            errorDiv.style.display = 'block'; // Mostrar el mensaje de error
            submitButton.disabled = true; // Deshabilitar el botón de envío
        } else {
            errorDiv.style.display = 'none'; // Ocultar el mensaje de error si es válido
            submitButton.disabled = false; // Habilitar el botón de envío si es válido
        }
    }

    // Agregar evento blur al input para verificar la longitud
    nameInput.addEventListener('blur', validateName);

    // Agregar evento input para verificar en tiempo real mientras se escribe
    nameInput.addEventListener('input', validateName);

    // Agregar evento submit al formulario
    form.addEventListener('submit', function (event) {
        const nameValue = nameInput.value.trim();

        // Validar la longitud del nombre antes de enviar
        if (nameValue.length < 3 || nameValue.length > 30) {
            event.preventDefault(); // Evitar el envío del formulario si no es válido
            errorDiv.style.display = 'block'; // Mostrar el mensaje de error
        } else {
            submitButton.disabled = true; // Deshabilitar el botón para prevenir doble envío
        }
    });

    // Manejo de eventos para el botón de volver a la Landing Page
    toLandingButton.addEventListener('click', function () {
        // Redirigir a la página de inicio
        window.location.href = 'landing.php'; // Cambia esto a la ruta de tu landing page
    });

    // Manejo de errores para el audio
    gameSounds[0].addEventListener('error', function (e) {
        console.error('Error al cargar el audio:', e);
    });

    // Opcional: establecer el volumen
    gameSounds[0].volume = 1.0; // Volumen completo
});