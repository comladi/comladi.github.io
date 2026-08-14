/**
 * Crypto Prices Ticker (crypto-prices.js)
 * Conexión WebSocket a Bitso (wss://ws.bitso.com) con respaldo REST desde CoinGecko.
 * Muestra cotizaciones en vivo en Pesos Mexicanos (MXN) para BTC, ETH y XRP.
 */

(function () {
    const WS_URL = 'wss://ws.bitso.com';
    const books = ['btc_mxn', 'eth_mxn', 'xrp_mxn'];
    const lastPrices = {};
    let socket = null;

    function getElements() {
        return {
            statusEl: document.getElementById('crypto-status'),
            logEl: document.getElementById('crypto-log')
        };
    }

    function logMsg(msg) {
        const { logEl } = getElements();
        if (logEl) {
            logEl.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
        }
    }

    // PASO 1: Carga inicial de precios vía CoinGecko (CORS friendly)
    async function fetchInitialPrices() {
        try {
            logMsg('Consultando API de respaldo para carga rápida...');
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,ethereum-classic&vs_currencies=usd');
            
            if (response.ok) {
                const data = await response.json();
                if (data.bitcoin && data.bitcoin.usd) updatePriceUI('btc_usd', data.bitcoin.usd, false);
                if (data.ethereum && data.ethereum.usd) updatePriceUI('eth_usd', data.ethereum.usd, false);
                if (data['ethereum-classic'] && data['ethereum-classic'].usd) updatePriceUI('etc_usd', data['ethereum-classic'].usd, false);
                if (data.ripple && data.ripple.usd) updatePriceUI('xrp_usd', data.ripple.usd, false);
                logMsg('Precios iniciales cargados desde CoinGecko.');
            } else {
                logMsg('No se pudo cargar respaldo REST, conectando a WebSocket...');
            }
        } catch (err) {
            logMsg('Aviso: Carga inicial omitida. Conectando a Bitso WebSocket...');
        }
    }

    // PASO 2: Conexión WebSocket a Bitso
    function connectWebSocket() {
        const { statusEl } = getElements();
        logMsg('Conectando WebSocket a Bitso...');

        try {
            socket = new WebSocket(WS_URL);
        } catch (e) {
            console.error('Error iniciando WebSocket:', e);
            if (statusEl) {
                statusEl.innerText = 'Error de conexión';
                statusEl.className = 'crypto-status-badge disconnected';
            }
            return;
        }

        socket.onopen = () => {
            if (statusEl) {
                statusEl.innerText = '● En vivo (Bitso)';
                statusEl.className = 'crypto-status-badge connected';
            }
            logMsg('WebSocket conectado. Suscribiendo a BTC, ETH y XRP...');

            // Suscribirse al canal 'trades' para cada par
            books.forEach(book => {
                socket.send(JSON.stringify({
                    action: 'subscribe',
                    book: book,
                    type: 'trades'
                }));
            });
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Procesar actualización de trades
                if (data.type === 'trades' && data.payload && data.payload.length > 0) {
                    const book = data.book;
                    const latestTrade = data.payload[data.payload.length - 1];
                    const price = parseFloat(latestTrade.r);

                    if (!isNaN(price)) {
                        updatePriceUI(book, price, true);
                        logMsg(`Actualización para ${book.toUpperCase()}: $${price}`);
                    }
                }
            } catch (e) {
                console.error("Error al procesar mensaje WebSocket:", e);
            }
        };

        socket.onclose = () => {
            if (statusEl) {
                statusEl.innerText = 'Desconectado';
                statusEl.className = 'crypto-status-badge disconnected';
            }
            logMsg('Conexión cerrada. Reintentando en 3 segundos...');
            setTimeout(connectWebSocket, 3000);
        };

        socket.onerror = (error) => {
            console.error('Error WebSocket Bitso:', error);
            if (socket) {
                socket.close();
            }
        };
    }

    // Actualiza el DOM y gestiona las animaciones de cambio de precio
    function updatePriceUI(book, newPrice, animate = true) {
        const parts = book.split('_');
        const coin = parts[0];
        const currency = (parts[1] || 'usd').toUpperCase();
        const elements = [
            document.getElementById(`${coin}-price`),
            document.getElementById(`val-${coin}`)
        ].filter(Boolean);

        if (elements.length === 0) return;

        const decimals = (coin === 'xrp') ? 2 : 2;

        const formattedPrice = '$' + new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(newPrice) + ' ' + currency;

        elements.forEach(priceEl => {
            if (animate && lastPrices[book]) {
                priceEl.classList.remove('flash-up', 'flash-down');
                void priceEl.offsetWidth; // Forzar reflow en CSS

                if (newPrice > lastPrices[book]) {
                    priceEl.classList.add('flash-up');
                } else if (newPrice < lastPrices[book]) {
                    priceEl.classList.add('flash-down');
                }
            }
            priceEl.innerText = formattedPrice;
        });

        lastPrices[book] = newPrice;
    }

    // Arrancar aplicación
    async function startTicker() {
        if (document.getElementById('btc-price') || document.getElementById('val-btc')) {
            await fetchInitialPrices(); // 1. Intentar mostrar precios en < 1 segundo
            connectWebSocket();         // 2. Iniciar transmisión WebSocket
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startTicker);
    } else {
        startTicker();
    }
})();
