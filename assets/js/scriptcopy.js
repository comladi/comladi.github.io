function showNext(sectionId) {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

function showPage() {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById('finalMessage').classList.remove('hidden');
    document.getElementById('questionnaire').classList.add('hidden');
}

function showDescription(descriptionId) {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById(descriptionId).classList.remove('hidden');
}

function showContactOptions() {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById('contactOptions').classList.remove('hidden');
    setupTelefonoLink(); // Configurar el evento del teléfono cuando se muestra
}

// Configurar el comportamiento del ícono del teléfono
function setupTelefonoLink() {
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const telefonoLink = document.getElementById('telefono-link');
    const qrContainer = document.getElementById('qr-telefono');

    if (!telefonoLink || !qrContainer) {
        console.error('No se encontraron los elementos telefono-link o qr-telefono');
        return;
    }

    telefonoLink.addEventListener('click', function(event) {
        if (!isMobileDevice()) {
            event.preventDefault();
            qrContainer.style.display = 'block';
            console.log('Mostrando QR en dispositivo no móvil');
        } else {
            console.log('Abriendo marcación en móvil');
        }
    });
}

// Nota: Eliminé el código de los bloques porque no parece estar en uso en el HTML actual.
// Si lo necesitas, podemos reincorporarlo después.