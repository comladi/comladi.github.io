function showNext(sectionId) {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

function showPage() {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById('finalMessage').classList.remove('hidden');
    document.getElementById('questionnaire').classList.add('hidden'); // Ocultar el formulario
}

function showContactOptions() {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById('contactOptions').classList.remove('hidden');
}

function showDescription(descriptionId) {
    const elements = document.querySelectorAll('#questionnaire > div');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById(descriptionId).classList.remove('hidden');
}




        const blocks = document.querySelectorAll('.block');
        let currentBlock = 0;

        // Función para mostrar el bloque actual
        function showBlock(index) {
            blocks.forEach((block, i) => {
                block.classList.remove('visible');
                block.style.display = 'none'; // Oculta todos los bloques
                if (i === index) {
                    block.classList.add('visible');
                    block.style.display = 'block'; // Muestra el bloque actual
                }
            });
        }

        // Función para calcular el tiempo de lectura
        function calculateReadingTime(text) {
            const words = text.split(' ').length;
            const readingTimeInMinutes = Math.ceil(words / 300); // 300 palabras por minuto
            return readingTimeInMinutes * 2500; // Tiempo en milisegundos
        }

        // Función para manejar la presentación
        function startPresentation() {
            const blockText = blocks[currentBlock].innerText; // Texto del bloque actual
            const readingTime = calculateReadingTime(blockText);
            showBlock(currentBlock); // Muestra el bloque actual

            setTimeout(() => {
                currentBlock = (currentBlock + 1) % blocks.length; // Mueve al siguiente bloque
                startPresentation();
            }, readingTime + 1000); // Añadir un pequeño margen para la transición
        }

        // Iniciar la presentación
        startPresentation();