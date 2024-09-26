// Seleccionamos todos los h3 que tienen la clase "toggle"
const toggles = document.querySelectorAll('.toggle');

toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        // Verificamos si el elemento ya tiene la clase activa
        const isActive = toggle.classList.contains('active');

        // Ocultamos todos los otros elementos
        toggles.forEach(t => {
            t.classList.remove('active');
            // Cambiamos el ícono a su estado inicial (chevron hacia abajo)
            const icon = t.querySelector('.icon');
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });

        // Si no estaba activo, lo activamos y cambiamos el ícono a chevron up
        if (!isActive) {
            toggle.classList.add('active');
            const icon = toggle.querySelector('.icon');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }
    });
});
