import { state } from '../core/state.js';
import { getTickerData } from '../services/binance.js';

function generateSparkline(isPositive) {
    const color = isPositive ? '#22c55e' : '#ef4444'; 
    const upPaths = ["M0,25 Q15,20 20,10 T40,15 T60,5 L80,2", "M0,28 C20,25 30,10 50,15 S70,5 80,2"];
    const downPaths = ["M0,2 Q15,5 20,15 T40,10 T60,20 L80,25", "M0,2 C20,5 30,20 50,15 S70,25 80,28"];
    const path = isPositive ? upPaths[Math.floor(Math.random() * upPaths.length)] : downPaths[Math.floor(Math.random() * downPaths.length)];

    return `<svg width="70" height="30" viewBox="0 0 80 30" class="opacity-80 drop-shadow-md">
        <path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

export async function renderWatchlist() {
    const container = document.getElementById('live-tickers');
    const tickerTape = document.getElementById('ticker-tape'); 
    
    let htmlContent = '';
    let tapeContent = ''; 
    
    for (let asset of state.watchList) {
        const data = await getTickerData(asset.symbol);
        if (!data) continue;

        const price = parseFloat(data.lastPrice).toLocaleString('en-US', {minimumFractionDigits: 2});
        const change = parseFloat(data.priceChangePercent);
        const isPositive = change >= 0;
        const sparkline = generateSparkline(isPositive);

        // Tarjeta
        htmlContent += `
        <div class="flex justify-between items-center p-3 hover:bg-[#1e293b] rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-700" onclick="window.location.href='quetza.html'">
            <div class="w-1/3">
                <h3 class="text-sm font-bold text-white truncate">${asset.name}</h3>
                <p class="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">${asset.cat}</p>
            </div>
            <div class="w-1/3 flex justify-center items-center">${sparkline}</div>
            <div class="w-1/3 text-right">
                <p class="text-sm font-mono text-white">$${price}</p>
                <p class="text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}">${isPositive ? '+' : ''}${change.toFixed(2)}%</p>
            </div>
        </div>`;
        
        // Cinta
        let cleanSymbol = asset.symbol.replace('USDT', '');
        tapeContent += `<span><strong class="text-white">${cleanSymbol}</strong> <span class="${isPositive ? 'text-green-500' : 'text-red-500'}">${isPositive ? '+' : ''}${change.toFixed(2)}%</span></span>`;
    }
    
    if(container) container.innerHTML = htmlContent;
    if(tickerTape) tickerTape.innerHTML = tapeContent.repeat(4);
}