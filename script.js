/* ==========================================================================
   CURSOCRIPTO - CORE JAVASCRIPT LOGIC (SCRIPT.JS)
   ========================================================================== */

let welcomeTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles.js background safely
    try {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: '#00ccff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00ccff',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' }
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 0.6 } }
                    }
                },
                retina_detect: true
            });
        }
    } catch (e) {
        console.warn('Particles.js init:', e);
    }

    // 2. Setup Desktop QR interactions
    setupQRInteractions();

    // 3. Initialize Live Financial Indicators Dashboard
    initMarketDashboardSimulation();

    // 4. Auto-transition intro sequence to main site after 11.5 seconds
    welcomeTimer = setTimeout(() => {
        skipWelcome();
    }, 11500);
});

/* --- Welcome Skip Functionality --- */
function skipWelcome() {
    if (welcomeTimer) {
        clearTimeout(welcomeTimer);
        welcomeTimer = null;
    }
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection && !welcomeSection.classList.contains('hidden')) {
        welcomeSection.classList.add('hidden');
        setTimeout(() => {
            welcomeSection.style.display = 'none';
        }, 1200);
    }
}

/* --- Section Navigation System --- */
function showContent(sectionId) {
    // Hide welcome section if open
    skipWelcome();

    // Deactivate all section items
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Deactivate all navbar links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Activate selected section
    const targetSection = document.getElementById(`${sectionId}-content`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Activate target navbar link
    const targetLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Close hamburger menu if open
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    if (hamburger && navMenu && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- Mobile Menu Toggle --- */
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }
}

/* ==========================================================================
   CAROUSEL CONTROLLERS
   ========================================================================== */

/* --- Carousel 1: Curso 101 --- */
let currentSlideCurso = 0;
const totalSlidesCurso = 4;

function updateCarouselCurso() {
    const inner = document.getElementById('carousel-inner-curso');
    if (inner) {
        inner.style.transform = `translateX(-${currentSlideCurso * 100}%)`;
    }
    const dots = document.querySelectorAll('#carousel-dots-curso .carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideCurso);
    });

    const nextBtn = document.getElementById('next-button-curso');
    const backBtn = document.getElementById('back-button-curso');
    if (nextBtn && backBtn) {
        if (currentSlideCurso === totalSlidesCurso - 1) {
            nextBtn.classList.add('hidden');
            backBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            backBtn.classList.add('hidden');
        }
    }
}

function moveSlideCurso(step) {
    currentSlideCurso = (currentSlideCurso + step + totalSlidesCurso) % totalSlidesCurso;
    updateCarouselCurso();
}

function goToSlideCurso(index) {
    currentSlideCurso = index;
    updateCarouselCurso();
}

/* --- Carousel 2: Sobre Nosotros --- */
let currentSlideSobre = 0;
const totalSlidesSobre = 3;

function updateCarouselSobre() {
    const inner = document.getElementById('carousel-inner-sobre');
    if (inner) {
        inner.style.transform = `translateX(-${currentSlideSobre * 100}%)`;
    }
    const dots = document.querySelectorAll('#carousel-dots-sobre .carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideSobre);
    });

    const nextBtn = document.getElementById('next-button-sobre');
    const backBtn = document.getElementById('back-button-sobre');
    if (nextBtn && backBtn) {
        if (currentSlideSobre === totalSlidesSobre - 1) {
            nextBtn.classList.add('hidden');
            backBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            backBtn.classList.add('hidden');
        }
    }
}

function moveSlideSobre(step) {
    currentSlideSobre = (currentSlideSobre + step + totalSlidesSobre) % totalSlidesSobre;
    updateCarouselSobre();
}

function goToSlideSobre(index) {
    currentSlideSobre = index;
    updateCarouselSobre();
}

/* --- Carousel 3: Razones --- */
let currentSlideRazones = 0;
const totalSlidesRazones = 5;

function updateCarouselRazones() {
    const inner = document.getElementById('carousel-inner-razones');
    if (inner) {
        inner.style.transform = `translateX(-${currentSlideRazones * 100}%)`;
    }
    const dots = document.querySelectorAll('#carousel-dots-razones .carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideRazones);
    });

    const nextBtn = document.getElementById('next-button-razones');
    const backBtn = document.getElementById('back-button-razones');
    if (nextBtn && backBtn) {
        if (currentSlideRazones === totalSlidesRazones - 1) {
            nextBtn.classList.add('hidden');
            backBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            backBtn.classList.add('hidden');
        }
    }
}

function moveSlideRazones(step) {
    currentSlideRazones = (currentSlideRazones + step + totalSlidesRazones) % totalSlidesRazones;
    updateCarouselRazones();
}

function goToSlideRazones(index) {
    currentSlideRazones = index;
    updateCarouselRazones();
}

/* --- Carousel 4: ¿Sabías que...? --- */
let currentSlidePresentacion = 0;
const totalSlidesPresentacion = 7;

function updateCarouselPresentacion() {
    const inner = document.getElementById('carousel-inner-presentacion');
    if (inner) {
        inner.style.transform = `translateX(-${currentSlidePresentacion * 100}%)`;
    }
    const dots = document.querySelectorAll('#carousel-dots-presentacion .carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlidePresentacion);
    });

    const nextBtn = document.getElementById('next-button-presentacion');
    const backBtn = document.getElementById('back-button-presentacion');
    if (nextBtn && backBtn) {
        if (currentSlidePresentacion === totalSlidesPresentacion - 1) {
            nextBtn.classList.add('hidden');
            backBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            backBtn.classList.add('hidden');
        }
    }
}

function moveSlidePresentacion(step) {
    currentSlidePresentacion = (currentSlidePresentacion + step + totalSlidesPresentacion) % totalSlidesPresentacion;
    updateCarouselPresentacion();
}

function goToSlidePresentacion(index) {
    currentSlidePresentacion = index;
    updateCarouselPresentacion();
}

/* ==========================================================================
   QUESTIONNAIRE & PROGRESS LOGIC
   ========================================================================== */

const questionnaireSteps = ['q1', 'q2', 'q3', 'description1', 'q5', 'description2', 'q7', 'q8'];

function updateProgressBar(nextStepId) {
    const fill = document.getElementById('progress-bar-fill');
    if (!fill) return;

    let index = questionnaireSteps.indexOf(nextStepId);
    if (nextStepId === 'contactOptions') index = questionnaireSteps.length;
    if (index === -1) index = 0;

    const percentage = Math.round(((index + 1) / (questionnaireSteps.length + 1)) * 100);
    fill.style.width = `${percentage}%`;
}

function showNext(nextStepId) {
    const currentStep = document.querySelector('#questionnaire > div:not(.hidden)');
    const nextStep = document.getElementById(nextStepId);

    if (currentStep && nextStep) {
        currentStep.classList.add('slide-out-fade');
        setTimeout(() => {
            currentStep.classList.add('hidden');
            currentStep.classList.remove('slide-out-fade');

            nextStep.classList.remove('hidden');
            nextStep.classList.add('slide-in-fade');
            setTimeout(() => nextStep.classList.remove('slide-in-fade'), 450);

            updateProgressBar(nextStepId);
        }, 300);
    }
}

function showDescription(descId) {
    showNext(descId);
}

function showContactOptions() {
    showNext('contactOptions');
}

function showPage() {
    const modal = document.getElementById('finalMessageModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('finalMessageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/* ==========================================================================
   DESKTOP QR CODE INTERACTION TOGGLER
   ========================================================================== */

function setupQRInteractions() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Desktop QR toggler for WhatsApp
    const whatsappLinks = [
        document.getElementById('whatsapp-link'),
        document.getElementById('whatsapp-link-contacto')
    ];

    whatsappLinks.forEach(link => {
        if (!link) return;
        link.addEventListener('click', function (e) {
            if (!isMobile) {
                e.preventDefault();
                const isQuestionnaire = this.id === 'whatsapp-link';
                const qrElement = document.getElementById(isQuestionnaire ? 'qr-whatsapp' : 'qr-whatsapp-contacto');
                const otherQrElement = document.getElementById(isQuestionnaire ? 'qr-telefono' : 'qr-telefono-contacto');

                if (otherQrElement) {
                    otherQrElement.style.display = 'none';
                    otherQrElement.classList.remove('active');
                }

                if (qrElement) {
                    const isVisible = qrElement.style.display === 'block' || qrElement.classList.contains('active');
                    if (isVisible) {
                        qrElement.style.display = 'none';
                        qrElement.classList.remove('active');
                    } else {
                        qrElement.style.display = 'block';
                        qrElement.classList.add('active');
                    }
                }
            }
        });
    });

    // Desktop QR toggler for Telefono
    const telefonoLinks = [
        document.getElementById('telefono-link'),
        document.getElementById('telefono-link-contacto')
    ];

    telefonoLinks.forEach(link => {
        if (!link) return;
        link.addEventListener('click', function (e) {
            if (!isMobile) {
                e.preventDefault();
                const isQuestionnaire = this.id === 'telefono-link';
                const qrElement = document.getElementById(isQuestionnaire ? 'qr-telefono' : 'qr-telefono-contacto');
                const otherQrElement = document.getElementById(isQuestionnaire ? 'qr-whatsapp' : 'qr-whatsapp-contacto');

                if (otherQrElement) {
                    otherQrElement.style.display = 'none';
                    otherQrElement.classList.remove('active');
                }

                if (qrElement) {
                    const isVisible = qrElement.style.display === 'block' || qrElement.classList.contains('active');
                    if (isVisible) {
                        qrElement.style.display = 'none';
                        qrElement.classList.remove('active');
                    } else {
                        qrElement.style.display = 'block';
                        qrElement.classList.add('active');
                    }
                }
            }
        });
    });
}

/* ==========================================================================
   LIVE FINANCIAL INDICATORS & CLOUDFLARE WORKER INTEGRATION
   ========================================================================== */
const WORKER_ENDPOINT = (typeof window !== "undefined" && window.CLOUDFLARE_WORKER_URL) 
    ? window.CLOUDFLARE_WORKER_URL 
    : "https://cloudflare-worker.curso-cripto.workers.dev";

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
                valEl.innerText = "Dato no disponible";
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
            valEl.style.color = "";
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

    if (WORKER_ENDPOINT) {
        if (badgeEl) {
            badgeEl.innerText = "Enlace Worker";
        }

        async function fetchWorkerData() {
            try {
                const response = await fetch(WORKER_ENDPOINT);
                if (!response.ok) {
                    throw new Error(`Código HTTP ${response.status}`);
                }
                const json = await response.json();
                
                for (const key in dataConfig) {
                    const item = json[key];
                    if (item && item.valor !== undefined && item.valor !== null) {
                        updateCardDOM(key, item.valor, item.cambio, false);
                    } else if (item && typeof item === 'number') {
                        updateCardDOM(key, item, null, false);
                    }
                }

                if (badgeEl && json.updatedAt) {
                    const date = new Date(json.updatedAt);
                    badgeEl.innerText = `En Vivo: ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                }
            } catch (err) {
                console.error("Error al consultar el Cloudflare Worker:", err);
            }
        }

        fetchWorkerData();
        setInterval(fetchWorkerData, 300000);
        return;
    }

    if (badgeEl) {
        badgeEl.innerText = "Sin conexión";
        badgeEl.style.borderColor = "var(--text-muted)";
        badgeEl.style.color = "var(--text-muted)";
    }

    for (const key in dataConfig) {
        updateCardDOM(key, null, null, true, "Sin conexión");
    }
}

