/**
 * ==========================================================================
 * CURSOCRIPTO - PREMIUM INTERACTION CONTROLLER (SCRIPTS)
 * Developed by a Senior Software Engineer with 45+ years of experience.
 * - Perfectly compatible with inline onclick/onchange HTML handlers
 * - Integrated mobile touch swipe support (left/right) for all carousels
 * - Solves display-blocking welcome bug on subpages (aviso.html / creditos.html)
 * ==========================================================================
 */

"use strict";

// --- Safe Initialization of Particles.js ---
function initParticles() {
    if (typeof particlesJS !== "undefined") {
        try {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: "#00ccff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out" }
                },
                interactivity: {
                    events: { onhover: { enable: false }, onclick: { enable: false } }
                },
                retina_detect: true
            });
        } catch (err) {
            console.warn("Particles.js failed to initialize gracefully:", err);
        }
    }
}

// --- Page State Variables for Carousel Controls ---
let currentSlideCurso = 0;
let currentSlideSobre = 0;
let currentSlideRazones = 0;
let currentSlidePresentacion = 0;

function updateCarousel(idPrefix, currentSlide) {
    const inner = document.getElementById(`carousel-inner-${idPrefix}`);
    if (!inner) return;

    // Apply clean hardware-accelerated transform
    inner.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Sync bullet indicators state
    const dots = document.querySelectorAll(`#carousel-dots-${idPrefix} .carousel-dot`);
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });

    // Handle boundary button visibilities
    const prev = document.getElementById(`prev-button-${idPrefix}`);
    const next = document.getElementById(`next-button-${idPrefix}`);
    const back = document.getElementById(`back-button-${idPrefix}`);
    const slides = inner.querySelectorAll(".module");
    const totalSlides = slides.length;

    if (prev) prev.classList.toggle("hidden", currentSlide === 0);
    if (next) next.classList.toggle("hidden", currentSlide === totalSlides - 1);
    if (back) back.classList.toggle("hidden", currentSlide !== totalSlides - 1);
}

// --- Individual Slide Control Actions ---
function moveSlideCurso(direction) {
    const slides = document.querySelectorAll("#carousel-inner-curso .module");
    const total = slides.length;
    currentSlideCurso = (currentSlideCurso + direction + total) % total;
    updateCarousel("curso", currentSlideCurso);
}
function goToSlideCurso(index) {
    currentSlideCurso = index;
    updateCarousel("curso", currentSlideCurso);
}

function moveSlideSobre(direction) {
    const slides = document.querySelectorAll("#carousel-inner-sobre .module");
    const total = slides.length;
    currentSlideSobre = (currentSlideSobre + direction + total) % total;
    updateCarousel("sobre", currentSlideSobre);
}
function goToSlideSobre(index) {
    currentSlideSobre = index;
    updateCarousel("sobre", currentSlideSobre);
}

function moveSlideRazones(direction) {
    const slides = document.querySelectorAll("#carousel-inner-razones .module");
    const total = slides.length;
    currentSlideRazones = (currentSlideRazones + direction + total) % total;
    updateCarousel("razones", currentSlideRazones);
}
function goToSlideRazones(index) {
    currentSlideRazones = index;
    updateCarousel("razones", currentSlideRazones);
}

function moveSlidePresentacion(direction) {
    const slides = document.querySelectorAll("#carousel-inner-presentacion .module");
    const total = slides.length;
    currentSlidePresentacion = (currentSlidePresentacion + direction + total) % total;
    updateCarousel("presentacion", currentSlidePresentacion);
}
function goToSlidePresentacion(index) {
    currentSlidePresentacion = index;
    updateCarousel("presentacion", currentSlidePresentacion);
}

// --- Welcome Transition Controller ---
function skipWelcome() {
    const welcomeSection = document.getElementById('welcome-section');
    if (!welcomeSection) return;

    welcomeSection.classList.add('hidden');
    setTimeout(() => {
        welcomeSection.style.display = 'none';

        const navbar = document.querySelector('.navbar');
        const contentContainer = document.getElementById('content-container');
        const footer = document.querySelector('.footer');

        if (navbar) navbar.style.display = 'block';
        if (contentContainer) contentContainer.style.display = 'block';
        if (footer) footer.style.display = 'block';
    }, 1000);
}

// Auto skip welcome trigger timer after 12 seconds
const welcomeTimer = setTimeout(skipWelcome, 12000);

// --- Content View Router & Navigator ---
function showContent(sectionId) {
    // Deactivate all section views
    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });

    // Activate selected content view
    const selectedContent = document.getElementById(`${sectionId}-content`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Sync active state classes across all navigation elements
    document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${sectionId}` || (sectionId === 'curso-101' && href === '#cursos')) {
            link.classList.add('active');
        }
    });

    // Close drawers on selection
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.classList.remove('active');
    }

    // Instant top-anchor page scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Instantly reset slider tracking offsets for active slides
    if (sectionId === 'curso-101') {
        currentSlideCurso = 0;
        updateCarousel("curso", 0);
    } else if (sectionId === 'sobre-nosotros') {
        currentSlideSobre = 0;
        updateCarousel("sobre", 0);
    } else if (sectionId === 'razones') {
        currentSlideRazones = 0;
        updateCarousel("razones", 0);
    } else if (sectionId === 'presentacion') {
        currentSlidePresentacion = 0;
        updateCarousel("presentacion", 0);
    } else if (sectionId === 'aprende') {
        resetQuestionnaire();
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks) navLinks.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

// --- Interactive Questionnaire System (Aprende) ---
const totalQuestions = 8;
let currentQuestion = 1;

function updateProgressBar() {
    const fill = document.getElementById('progress-bar-fill');
    if (fill) {
        const progress = (currentQuestion / totalQuestions) * 100;
        fill.style.width = `${progress}%`;
    }
}

function showNext(nextId) {
    // 450ms tactile delay lets the user see their gorgeous highlighted radio selection
    setTimeout(() => {
        const activeDiv = Array.from(document.querySelectorAll('#questionnaire > div')).find(div => !div.classList.contains('hidden'));
        if (activeDiv) {
            activeDiv.classList.add('slide-out-fade');
            setTimeout(() => {
                activeDiv.classList.add('hidden');
                activeDiv.classList.remove('slide-out-fade');
                
                const target = document.getElementById(nextId);
                if (target) {
                    target.classList.remove('hidden');
                    target.classList.add('slide-in-fade');
                    setTimeout(() => target.classList.remove('slide-in-fade'), 500);
                }
                const num = parseInt(nextId.replace('q', ''));
                currentQuestion = isNaN(num) ? currentQuestion + 1 : num;
                updateProgressBar();
            }, 350);
        } else {
            const target = document.getElementById(nextId);
            if (target) {
                target.classList.remove('hidden');
            }
            const num = parseInt(nextId.replace('q', ''));
            currentQuestion = isNaN(num) ? currentQuestion + 1 : num;
            updateProgressBar();
        }
    }, 450);
}

function showDescription(descId) {
    setTimeout(() => {
        const activeDiv = Array.from(document.querySelectorAll('#questionnaire > div')).find(div => !div.classList.contains('hidden'));
        if (activeDiv) {
            activeDiv.classList.add('slide-out-fade');
            setTimeout(() => {
                activeDiv.classList.add('hidden');
                activeDiv.classList.remove('slide-out-fade');
                
                const target = document.getElementById(descId);
                if (target) {
                    target.classList.remove('hidden');
                    target.classList.add('slide-in-fade');
                    setTimeout(() => target.classList.remove('slide-in-fade'), 500);
                }
                updateProgressBar();
            }, 350);
        } else {
            const target = document.getElementById(descId);
            if (target) {
                target.classList.remove('hidden');
            }
            updateProgressBar();
        }
    }, 450);
}

function showContactOptions() {
    setTimeout(() => {
        const activeDiv = Array.from(document.querySelectorAll('#questionnaire > div')).find(div => !div.classList.contains('hidden'));
        if (activeDiv) {
            activeDiv.classList.add('slide-out-fade');
            setTimeout(() => {
                activeDiv.classList.add('hidden');
                activeDiv.classList.remove('slide-out-fade');
                
                const target = document.getElementById('contactOptions');
                if (target) {
                    target.classList.remove('hidden');
                    target.classList.add('slide-in-fade');
                    setTimeout(() => target.classList.remove('slide-in-fade'), 500);
                }
                currentQuestion = totalQuestions;
                updateProgressBar();
            }, 350);
        } else {
            const target = document.getElementById('contactOptions');
            if (target) {
                target.classList.remove('hidden');
            }
            currentQuestion = totalQuestions;
            updateProgressBar();
        }
    }, 450);
}

function showPage() {
    setTimeout(() => {
        const modal = document.getElementById('finalMessageModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }, 450);
}

function closeModal() {
    const modal = document.getElementById('finalMessageModal');
    if (modal) {
        modal.style.display = 'none';
    }
    showContent('contacto');
}

function resetQuestionnaire() {
    document.querySelectorAll('#questionnaire > div').forEach(div => {
        div.classList.add('hidden');
        div.classList.remove('slide-out-fade', 'slide-in-fade');
    });
    const q1 = document.getElementById('q1');
    if (q1) {
        q1.classList.remove('hidden');
    }

    document.querySelectorAll('#questionnaire input').forEach(input => {
        input.checked = false;
    });
    currentQuestion = 1;
    updateProgressBar();
}

// --- UI Interaction Toggles ---
function toggleCryptoText() {
    const toggle = document.querySelector('.crypto-toggle');
    if (toggle) toggle.classList.toggle('active');
}

function initQRHandlers() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const setupQR = (linkId, qrId) => {
        const link = document.getElementById(linkId);
        const qr = document.getElementById(qrId);
        if (link && qr) {
            link.addEventListener('click', (e) => {
                if (!isMobile) {
                    e.preventDefault();
                    const isClosed = qr.style.display === 'none' || qr.style.display === '';
                    qr.style.display = isClosed ? 'block' : 'none';
                }
            });
        }
    };

    setupQR('telefono-link', 'qr-telefono');
    setupQR('telefono-link-contacto', 'qr-telefono-contacto');
}

// --- Swiping Interactions for Touch Screens ---
function initSwipeSupport() {
    const setupSwipe = (innerId, moveFn) => {
        const inner = document.getElementById(innerId);
        if (!inner) return;

        let startX = 0;
        let dist = 0;

        inner.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            dist = 0;
        }, { passive: true });

        inner.addEventListener('touchmove', (e) => {
            dist = startX - e.touches[0].clientX;
        }, { passive: true });

        inner.addEventListener('touchend', () => {
            if (Math.abs(dist) > 50) {
                if (dist > 0) {
                    moveFn(1); // Swiped Left -> Next Slide
                } else {
                    moveFn(-1); // Swiped Right -> Previous Slide
                }
            }
            startX = 0;
            dist = 0;
        });
    };

    setupSwipe('carousel-inner-curso', moveSlideCurso);
    setupSwipe('carousel-inner-sobre', moveSlideSobre);
    setupSwipe('carousel-inner-razones', moveSlideRazones);
    setupSwipe('carousel-inner-presentacion', moveSlidePresentacion);
}

// --- Live Financial Indicators & Cloudflare Worker Integration ---
// Configura la URL de tu Cloudflare Worker en index.html o directamente aquí:
// Ejemplo: "https://cloudflare-worker.tu-subdominio.workers.dev"
const CLOUDFLARE_WORKER_URL = (typeof window !== "undefined" && window.CLOUDFLARE_WORKER_URL) ? window.CLOUDFLARE_WORKER_URL : "https://cloudflare-worker.curso-cripto.workers.dev";

function initMarketDashboardSimulation() {
    const dataConfig = {
        usd: { decimals: 2, unit: " MXN", prefix: "$", isRate: false },
        cetes: { decimals: 2, unit: "%", isRate: true },
        banxico: { decimals: 2, unit: "%", isRate: true, fixed: true },
        btc: { decimals: 2, unit: " USD", prefix: "$", isRate: false },
        eth: { decimals: 2, unit: " USD", prefix: "$", isRate: false },
        etc: { decimals: 2, unit: " USD", prefix: "$", isRate: false },
        xrp: { decimals: 2, unit: " USD", prefix: "$", isRate: false },
        gold: { decimals: 2, unit: " USD", prefix: "$", isRate: false },
        silver: { decimals: 2, unit: " USD", prefix: "$", isRate: false }
    };

    // State object to hold values
    const state = {};

    function formatValue(key, value) {
        const config = dataConfig[key];
        if (value === null || value === undefined || isNaN(Number(value))) {
            return "Dato no disponible";
        }
        let formatted = "";
        if (config.prefix) formatted += config.prefix;
        
        const roundedVal = Number(value).toFixed(config.decimals);
        const parts = roundedVal.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted += parts.join('.');
        
        if (config.unit) formatted += config.unit;
        return formatted;
    }

    function updateCardDOM(key, value, changePercent, isError, errorMsg) {
        const valEl = document.getElementById(`val-${key}`);
        const chgEl = document.getElementById(`chg-${key}`);

        if (isError || value === null || value === undefined) {
            if (valEl) {
                valEl.innerText = "Datos no disponibles por el momento";
                valEl.style.color = "var(--text-muted)";
                valEl.style.fontSize = "0.85rem";
            }
            if (chgEl) {
                chgEl.innerText = errorMsg || "Sin conexión";
                chgEl.className = "indicator-change negative";
            }
            return;
        }

        if (valEl) {
            valEl.innerText = formatValue(key, value);
            valEl.style.color = ""; // reset to CSS default
            valEl.style.fontSize = "";
        }

        if (chgEl) {
            if (key === 'banxico') {
                chgEl.innerText = "● Estable";
                chgEl.className = "indicator-change stable";
            } else {
                if (changePercent === null || changePercent === undefined) {
                    chgEl.innerText = "● Actualizado";
                    chgEl.className = "indicator-change stable";
                } else {
                    const isPositive = changePercent >= 0;
                    const sign = isPositive ? "▲ +" : "▼ ";
                    chgEl.innerText = `${sign}${Number(changePercent).toFixed(2)}%`;
                    chgEl.className = "indicator-change " + (isPositive ? "positive" : "negative");
                }
            }
        }
    }

    const badgeEl = document.querySelector(".badge-live");

    // Attempt to load from Cloudflare Worker
    if (CLOUDFLARE_WORKER_URL) {
        if (badgeEl) {
            badgeEl.innerText = "Enlace Worker";
        }

        async function fetchWorkerData() {
            try {
                const response = await fetch(CLOUDFLARE_WORKER_URL);
                if (!response.ok) {
                    throw new Error(`Código HTTP ${response.status}`);
                }
                const json = await response.json();
                
                // Process each key
                for (const key in dataConfig) {
                    const item = json[key];
                    if (!item || item.error || item.valor === null) {
                        updateCardDOM(key, null, null, true, "Sin conexión");
                    } else {
                        updateCardDOM(key, item.valor, item.cambio, false);
                    }
                }

                if (badgeEl && json.updatedAt) {
                    const date = new Date(json.updatedAt);
                    badgeEl.innerText = `En Vivo: ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                }
            } catch (err) {
                console.error("Error al consultar el Cloudflare Worker:", err);
                for (const key in dataConfig) {
                    updateCardDOM(key, null, null, true, "Sin conexión");
                }
                if (badgeEl) {
                    badgeEl.innerText = "Sin conexión";
                    badgeEl.style.borderColor = "#ff4a6b";
                    badgeEl.style.color = "#ff4a6b";
                }
            }
        }

        fetchWorkerData();
        // Refresh every 5 minutes from worker
        setInterval(fetchWorkerData, 300000);
        return;
    }

    // When there is no Worker URL configured / no connection
    if (badgeEl) {
        badgeEl.innerText = "Sin conexión";
        badgeEl.style.borderColor = "var(--text-muted)";
        badgeEl.style.color = "var(--text-muted)";
    }

    for (const key in dataConfig) {
        updateCardDOM(key, null, null, true, "Sin conexión");
    }
}

// --- Mount Event Handlers ---
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initQRHandlers();
    initSwipeSupport();
    initMarketDashboardSimulation();

    // Check if we are on the landing page or a secondary subpage (Aviso / Creditos)
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection) {
        // Hide layout structures only if welcome screen is present
        const navbar = document.querySelector('.navbar');
        const contentContainer = document.getElementById('content-container');
        const footer = document.querySelector('.footer');

        if (navbar) navbar.style.display = 'none';
        if (contentContainer) contentContainer.style.display = 'none';
        if (footer) footer.style.display = 'none';
    }

    // Direct hash routing trigger for deep links
    if (window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        if (document.getElementById(`${hash}-content`)) {
            skipWelcome();
            clearTimeout(welcomeTimer);
            showContent(hash);
        }
    }
});

// --- Expose Navigation Functions to Global Scope for HTML Compliance ---
window.moveSlideCurso = moveSlideCurso;
window.goToSlideCurso = goToSlideCurso;
window.moveSlideSobre = moveSlideSobre;
window.goToSlideSobre = goToSlideSobre;
window.moveSlideRazones = moveSlideRazones;
window.goToSlideRazones = goToSlideRazones;
window.moveSlidePresentacion = moveSlidePresentacion;
window.goToSlidePresentacion = goToSlidePresentacion;
window.skipWelcome = skipWelcome;
window.showContent = showContent;
window.toggleMenu = toggleMenu;
window.showNext = showNext;
window.showDescription = showDescription;
window.showContactOptions = showContactOptions;
window.showPage = showPage;
window.closeModal = closeModal;
window.resetQuestionnaire = resetQuestionnaire;
window.toggleCryptoText = toggleCryptoText;
