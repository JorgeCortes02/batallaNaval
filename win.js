document.addEventListener("DOMContentLoaded", function () {
    // Mostrar el finalScreen con una animación de entrada
    const finalScreen = document.getElementById('finalScreen');
    finalScreen.classList.add('show');

    // Manejo de eventos para los botones
    document.getElementById('saveRecord').addEventListener('click', function () {
        const nameValue = document.getElementById('name').value;
        if (nameValue) {
            // Lógica para guardar el récord aquí (puedes hacer una solicitud AJAX o redirigir a un script PHP)
            alert('Rècord guardado para: ' + nameValue);
        } else {
            alert('Por favor, introduce tu nombre.');
        }
    });

    document.getElementById('toLanding').addEventListener('click', function () {
        // Redirigir a la página de inicio
        window.location.href = 'landing.php'; // Cambia esto a la ruta de tu landing page
    });
});