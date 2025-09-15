// Inicialización de Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#00ccff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 1, direction: "none", random: true }
    },
    interactivity: {
        events: { onhover: { enable: false }, onclick: { enable: false } }
    }
});

// Función para transición suave
function skipWelcome() {
    const welcomeSection = document.getElementById('welcome-section');
    welcomeSection.classList.add('hidden');
    setTimeout(() => {
        welcomeSection.style.display = 'none';
        document.querySelector('.navbar').style.display = 'block';
        document.getElementById('content-container').style.display = 'block';
        document.querySelector('.footer').style.display = 'block';
    }, 1000);
}

// Transición después de 12 segundos
setTimeout(skipWelcome, 12000);

// JavaScript del contenido principal
function showContent(sectionId) {
    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });
    const selectedContent = document.getElementById(`${sectionId}-content`);
    selectedContent.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}` || (sectionId === 'curso-101' && link.getAttribute('href') === '#cursos')) {
            link.classList.add('active');
        }
    });
    document.querySelector('.nav-links').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (sectionId === 'curso-101') {
        currentSlideCurso = 0;
        updateCarouselCurso();
    } else if (sectionId === 'sobre-nosotros') {
        currentSlideSobre = 0;
        updateCarouselSobre();
    } else if (sectionId === 'razones') {
        currentSlideRazones = 0;
        updateCarouselRazones();
    } else if (sectionId === 'presentacion') {
        currentSlidePresentacion = 0;
        updateCarouselPresentacion();
    } else if (sectionId === 'aprende') {
        resetQuestionnaire();
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

let currentSlideCurso = 0;
const slidesCurso = document.querySelectorAll('#carousel-inner-curso .module');
const totalSlidesCurso = slidesCurso.length;
const carouselInnerCurso = document.getElementById('carousel-inner-curso');
const dotsCurso = document.querySelectorAll('#carousel-dots-curso .carousel-dot');
const prevButtonCurso = document.getElementById('prev-button-curso');
const nextButtonCurso = document.getElementById('next-button-curso');
const backButtonCurso = document.getElementById('back-button-curso');

function updateCarouselCurso() {
    carouselInnerCurso.style.transform = `translateX(-${currentSlideCurso * 100}%)`;
    dotsCurso.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideCurso);
    });
    prevButtonCurso.classList.toggle('hidden', currentSlideCurso === 0);
    nextButtonCurso.classList.toggle('hidden', currentSlideCurso === totalSlidesCurso - 1);
    backButtonCurso.classList.toggle('hidden', currentSlideCurso !== totalSlidesCurso - 1);
}

function moveSlideCurso(direction) {
    currentSlideCurso = (currentSlideCurso + direction + totalSlidesCurso) % totalSlidesCurso;
    updateCarouselCurso();
}

function goToSlideCurso(index) {
    currentSlideCurso = index;
    updateCarouselCurso();
}

let currentSlideSobre = 0;
const slidesSobre = document.querySelectorAll('#carousel-inner-sobre .module');
const totalSlidesSobre = slidesSobre.length;
const carouselInnerSobre = document.getElementById('carousel-inner-sobre');
const dotsSobre = document.querySelectorAll('#carousel-dots-sobre .carousel-dot');
const prevButtonSobre = document.getElementById('prev-button-sobre');
const nextButtonSobre = document.getElementById('next-button-sobre');
const backButtonSobre = document.getElementById('back-button-sobre');

function updateCarouselSobre() {
    carouselInnerSobre.style.transform = `translateX(-${currentSlideSobre * 100}%)`;
    dotsSobre.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideSobre);
    });
    prevButtonSobre.classList.toggle('hidden', currentSlideSobre === 0);
    nextButtonSobre.classList.toggle('hidden', currentSlideSobre === totalSlidesSobre - 1);
    backButtonSobre.classList.toggle('hidden', currentSlideSobre !== totalSlidesSobre - 1);
}

function moveSlideSobre(direction) {
    currentSlideSobre = (currentSlideSobre + direction + totalSlidesSobre) % totalSlidesSobre;
    updateCarouselSobre();
}

function goToSlideSobre(index) {
    currentSlideSobre = index;
    updateCarouselSobre();
}

let currentSlideRazones = 0;
const slidesRazones = document.querySelectorAll('#carousel-inner-razones .module');
const totalSlidesRazones = slidesRazones.length;
const carouselInnerRazones = document.getElementById('carousel-inner-razones');
const dotsRazones = document.querySelectorAll('#carousel-dots-razones .carousel-dot');
const prevButtonRazones = document.getElementById('prev-button-razones');
const nextButtonRazones = document.getElementById('next-button-razones');
const backButtonRazones = document.getElementById('back-button-razones');

function updateCarouselRazones() {
    carouselInnerRazones.style.transform = `translateX(-${currentSlideRazones * 100}%)`;
    dotsRazones.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideRazones);
    });
    prevButtonRazones.classList.toggle('hidden', currentSlideRazones === 0);
    nextButtonRazones.classList.toggle('hidden', currentSlideRazones === totalSlidesRazones - 1);
    backButtonRazones.classList.toggle('hidden', currentSlideRazones !== totalSlidesRazones - 1);
}

function moveSlideRazones(direction) {
    currentSlideRazones = (currentSlideRazones + direction + totalSlidesRazones) % totalSlidesRazones;
    updateCarouselRazones();
}

function goToSlideRazones(index) {
    currentSlideRazones = index;
    updateCarouselRazones();
}

let currentSlidePresentacion = 0;
const slidesPresentacion = document.querySelectorAll('#carousel-inner-presentacion .module');
const totalSlidesPresentacion = slidesPresentacion.length;
const carouselInnerPresentacion = document.getElementById('carousel-inner-presentacion');
const dotsPresentacion = document.querySelectorAll('#carousel-dots-presentacion .carousel-dot');
const prevButtonPresentacion = document.getElementById('prev-button-presentacion');
const nextButtonPresentacion = document.getElementById('next-button-presentacion');
const backButtonPresentacion = document.getElementById('back-button-presentacion');

function updateCarouselPresentacion() {
    carouselInnerPresentacion.style.transform = `translateX(-${currentSlidePresentacion * 100}%)`;
    dotsPresentacion.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlidePresentacion);
    });
    prevButtonPresentacion.classList.toggle('hidden', currentSlidePresentacion === 0);
    nextButtonPresentacion.classList.toggle('hidden', currentSlidePresentacion === totalSlidesPresentacion - 1);
    backButtonPresentacion.classList.toggle('hidden', currentSlidePresentacion !== totalSlidesPresentacion - 1);
}

function moveSlidePresentacion(direction) {
    currentSlidePresentacion = (currentSlidePresentacion + direction + totalSlidesPresentacion) % totalSlidesPresentacion;
    updateCarouselPresentacion();
}

function goToSlidePresentacion(index) {
    currentSlidePresentacion = index;
    updateCarouselPresentacion();
}

const totalQuestions = 8;
let currentQuestion = 1;

function showNext(nextId) {
    document.querySelectorAll('#questionnaire div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(nextId).classList.remove('hidden');
    currentQuestion = parseInt(nextId.replace('q', '')) || currentQuestion + 1;
    updateProgressBar();
}

function showDescription(descId) {
    document.querySelectorAll('#questionnaire div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(descId).classList.remove('hidden');
    updateProgressBar();
}

function showContactOptions() {
    document.querySelectorAll('#questionnaire div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById('contactOptions').classList.remove('hidden');
    currentQuestion = totalQuestions;
    updateProgressBar();
}

function showPage() {
    document.getElementById('finalMessageModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('finalMessageModal').style.display = 'none';
    showContent('contacto');
}

function resetQuestionnaire() {
    document.querySelectorAll('#questionnaire div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById('q1').classList.remove('hidden');
    document.querySelectorAll('#questionnaire input').forEach(input => {
        input.checked = false;
    });
    currentQuestion = 1;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progress}%`;
}

document.getElementById('telefono-link').addEventListener('click', (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const qrDiv = document.getElementById('qr-telefono');
    if (!isMobile) {
        e.preventDefault();
        qrDiv.style.display = qrDiv.style.display === 'none' ? 'block' : 'none';
    }
});

document.getElementById('telefono-link-contacto').addEventListener('click', (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const qrDiv = document.getElementById('qr-telefono-contacto');
    if (!isMobile) {
        e.preventDefault();
        qrDiv.style.display = qrDiv.style.display === 'none' ? 'block' : 'none';
    }
});

function toggleCryptoText() {
    const toggle = document.querySelector('.crypto-toggle');
    toggle.classList.toggle('active');
}

// Estado inicial de la página
document.querySelector('.navbar').style.display = 'none';
document.getElementById('content-container').style.display = 'none';
document.querySelector('.footer').style.display = 'none';