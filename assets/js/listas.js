        // Seleccionamos todos los h3 que tienen la clase "toggle"
        const toggles = document.querySelectorAll('.toggle');

        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Ocultamos todos los otros elementos
                toggles.forEach(t => t.classList.remove('active'));

                // Agregamos la clase activa al elemento clickeado
                toggle.classList.add('active');
            });
        });