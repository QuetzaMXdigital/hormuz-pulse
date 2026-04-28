import { fetchGlobalNews } from './services/taco-motor.js'; // Corregido: solo un punto ./
import { renderWatchlist } from './components/radar.js';
import { updateStatusPanel } from './components/status.js';

// Inicialización de TradingView (Lo mantenemos aquí porque usa window.tvWidget)
function initTradingView() {
    if(typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "autosize": true,
            "symbol": "TVC:USOIL",
            "interval": "15",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "es",
            "enable_publishing": false,
            "backgroundColor": "#0b111e",
            "gridColor": "#1e293b",
            "hide_top_toolbar": false,
            "hide_legend": false,
            "save_image": false,
            "container_id": "tv-chart",
            "show_popup_button": true,
            "studies": ["RSI@tv-basicstudies", "MACD@tv-basicstudies"]
        });
    }
}

window.onload = () => {
    console.log("Terminal Hormuz Pulse Inicializada ⚡");
    
    // Llamadas iniciales
    updateStatusPanel();
    initTradingView();
    renderWatchlist();
    
    // Ciclos
    setInterval(updateStatusPanel, 1000);
    setInterval(renderWatchlist, 10000);
};

// Prueba de fuego del Taco Motor
fetchGlobalNews();