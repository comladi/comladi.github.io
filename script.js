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
        // Si la sección no tiene contenido cargado aún, cargarla dinámicamente
        if (!targetSection.innerHTML || targetSection.innerHTML.trim() === '') {
            if (sectionId === 'seguridad-web3') loadSeguridadWeb3();
            else if (sectionId === 'guia-seguridad') loadGuiaSeguridad();
            else if (sectionId === 'descargo-responsabilidad') loadDescargoResponsabilidad();
            else if (sectionId === 'aviso-privacidad') loadAvisoPrivacidad();
            else if (sectionId === 'creditos') loadCreditos();
        }
    }

    // Activate target navbar link (if exists in primary navbar)
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

function showFinalWindow() {
    showPage();
}

function showContactOptions() {
    showPage();
}

function showPage() {
    const modal = document.getElementById('finalMessageModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('open');
    }
}

function closeModal() {
    const modal = document.getElementById('finalMessageModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('open');
    }
    if (typeof showContent === 'function') {
        showContent('contacto');
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
        document.getElementById('whatsapp-link-contacto'),
        document.getElementById('modal-whatsapp-link')
    ];

    whatsappLinks.forEach(link => {
        if (!link) return;
        link.addEventListener('click', function (e) {
            if (!isMobile) {
                e.preventDefault();
                let qrId = 'qr-whatsapp';
                let otherQrId = 'qr-telefono';
                if (this.id === 'whatsapp-link-contacto') {
                    qrId = 'qr-whatsapp-contacto';
                    otherQrId = 'qr-telefono-contacto';
                } else if (this.id === 'modal-whatsapp-link') {
                    qrId = 'modal-qr-whatsapp';
                    otherQrId = 'modal-qr-telefono';
                }

                const qrElement = document.getElementById(qrId);
                const otherQrElement = document.getElementById(otherQrId);

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
        document.getElementById('telefono-link-contacto'),
        document.getElementById('modal-telefono-link')
    ];

    telefonoLinks.forEach(link => {
        if (!link) return;
        link.addEventListener('click', function (e) {
            if (!isMobile) {
                e.preventDefault();
                let qrId = 'qr-telefono';
                let otherQrId = 'qr-whatsapp';
                if (this.id === 'telefono-link-contacto') {
                    qrId = 'qr-telefono-contacto';
                    otherQrId = 'qr-whatsapp-contacto';
                } else if (this.id === 'modal-telefono-link') {
                    qrId = 'modal-qr-telefono';
                    otherQrId = 'modal-qr-whatsapp';
                }

                const qrElement = document.getElementById(qrId);
                const otherQrElement = document.getElementById(otherQrId);

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

function initLiveClock() {
    function tick() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const badges = document.querySelectorAll('.badge-live');
        badges.forEach(b => {
            b.innerText = `🟢 En Vivo: ${timeStr}`;
        });
    }
    tick();
    setInterval(tick, 1000);
}

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
                chgEl.innerText = "● Tasa Oficial";
                chgEl.className = "indicator-change stable";
            } else {
                if (changePercent === null || changePercent === undefined || isNaN(Number(changePercent))) {
                    chgEl.innerText = "● En tiempo real";
                    chgEl.className = "indicator-change stable";
                } else {
                    const numChange = Number(changePercent);
                    const isPositive = numChange >= 0;
                    const sign = isPositive ? "▲ +" : "▼ ";
                    chgEl.innerText = `${sign}${Math.abs(numChange).toFixed(2)}%`;
                    chgEl.className = "indicator-change " + (isPositive ? "positive" : "negative");
                }
            }
        }
    }

    async function fetchRealMarketData() {
        // 1. Cloudflare Worker
        if (WORKER_ENDPOINT) {
            try {
                const response = await fetch(WORKER_ENDPOINT);
                if (response.ok) {
                    const json = await response.json();
                    for (const key in dataConfig) {
                        const item = json[key];
                        if (item && item.valor !== undefined && item.valor !== null) {
                            updateCardDOM(key, item.valor, item.cambio, false);
                        } else if (item && typeof item === 'number') {
                            updateCardDOM(key, item, null, false);
                        }
                    }
                }
            } catch (err) {
                console.warn("Worker fetch fallback:", err);
            }
        }

        // 2. Binance API para precios y variaciones 24h reales
        try {
            const binanceRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","ETCUSDT","XRPUSDT","PAXGUSDT"]');
            if (binanceRes.ok) {
                const tickers = await binanceRes.json();
                tickers.forEach(t => {
                    const price = parseFloat(t.lastPrice);
                    const change = parseFloat(t.priceChangePercent);
                    if (t.symbol === "BTCUSDT") updateCardDOM('btc', price, change, false);
                    if (t.symbol === "ETHUSDT") updateCardDOM('eth', price, change, false);
                    if (t.symbol === "ETCUSDT") updateCardDOM('etc', price, change, false);
                    if (t.symbol === "XRPUSDT") updateCardDOM('xrp', price, change, false);
                    if (t.symbol === "PAXGUSDT") updateCardDOM('gold', price, change, false);
                });
            }
        } catch (err) {
            // Fallback CoinGecko
            try {
                const cgRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ethereum-classic,ripple,tether-gold&vs_currencies=usd&include_24hr_change=true');
                if (cgRes.ok) {
                    const cgData = await cgRes.json();
                    if (cgData.bitcoin) updateCardDOM('btc', cgData.bitcoin.usd, cgData.bitcoin.usd_24h_change, false);
                    if (cgData.ethereum) updateCardDOM('eth', cgData.ethereum.usd, cgData.ethereum.usd_24h_change, false);
                    if (cgData['ethereum-classic']) updateCardDOM('etc', cgData['ethereum-classic'].usd, cgData['ethereum-classic'].usd_24h_change, false);
                    if (cgData.ripple) updateCardDOM('xrp', cgData.ripple.usd, cgData.ripple.usd_24h_change, false);
                    if (cgData['tether-gold']) updateCardDOM('gold', cgData['tether-gold'].usd, cgData['tether-gold'].usd_24h_change, false);
                }
            } catch (e) {
                console.warn("CoinGecko fallback error:", e);
            }
        }

        // 3. Frankfurter USD/MXN
        try {
            const fxRes = await fetch('https://api.frankfurter.app/latest?from=USD&to=MXN');
            if (fxRes.ok) {
                const fxData = await fxRes.json();
                if (fxData.rates && fxData.rates.MXN) {
                    updateCardDOM('usd', fxData.rates.MXN, null, false);
                }
            }
        } catch (err) {
            console.warn("USD/MXN fallback error:", err);
        }
    }

    initLiveClock();
    fetchRealMarketData();
    setInterval(fetchRealMarketData, 30000);
}

/* --- Dynamic Section Loader for HTML Partials --- */
async function loadSectionPartial(url, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const html = await response.text();
            if (html && html.trim().length > 0) {
                section.innerHTML = html;
                return;
            }
        }
        throw new Error(`Respuesta no válida (${response.status}) para ${url}`);
    } catch (err) {
        console.warn(`[Carga parcial] Error al cargar ${url} vía fetch:`, err);
    }
}

async function loadGuiaSeguridad() {
    return loadSectionPartial('guia-seguridad.html', 'guia-seguridad-content');
}

async function loadSeguridadWeb3() {
    return loadSectionPartial('seguridad-web3.html', 'seguridad-web3-content');
}

async function loadDescargoResponsabilidad() {
    return loadSectionPartial('descargo-responsabilidad.html', 'descargo-responsabilidad-content');
}

async function loadAvisoPrivacidad() {
    return loadSectionPartial('aviso-privacidad.html', 'aviso-privacidad-content');
}

async function loadCreditos() {
    return loadSectionPartial('creditos.html', 'creditos-content');
}

document.addEventListener('DOMContentLoaded', () => {
    loadGuiaSeguridad();
    loadSeguridadWeb3();
    loadDescargoResponsabilidad();
    loadAvisoPrivacidad();
    loadCreditos();
});
