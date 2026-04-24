// Controla el reloj y la latencia
export function updateStatusPanel() {
    const now = new Date();
    const h = now.getUTCHours().toString().padStart(2, '0');
    const m = now.getUTCMinutes().toString().padStart(2, '0');
    const s = now.getUTCSeconds().toString().padStart(2, '0');
    
    const clockEl = document.getElementById('world-clock');
    if(clockEl) clockEl.innerText = `${h}:${m}:${s} UTC`;
    
    const latencyEl = document.getElementById('network-latency');
    if(latencyEl) {
        const randomLat = Math.floor(Math.random() * (32 - 14) + 14);
        latencyEl.innerText = `${randomLat}ms`;
    }
}