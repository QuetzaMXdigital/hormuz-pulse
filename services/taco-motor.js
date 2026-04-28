// /services/taco-motor.js

// Usamos rss2json como puente para evitar bloqueos CORS y convertir a JSON
const RSS_PROXY_URL = "https://api.rss2json.com/v1/api.json?rss_url=";
// URL de Google News buscando palabras clave críticas de las últimas 24 hrs
const GOOGLE_NEWS_RSS = "https://news.google.com/rss/search?q=Middle+East+OR+OPEC+OR+Oil+when:1d&hl=en-US&gl=US&ceid=US:en";

export async function fetchGlobalNews() {
    try {
        console.log("📡 Taco Motor: Escaneando frecuencias globales...");
        
        // Conectamos con el proxy y le pasamos nuestra URL de búsqueda
        const response = await fetch(RSS_PROXY_URL + encodeURIComponent(GOOGLE_NEWS_RSS));
        
        if (!response.ok) {
            throw new Error("Fallo en la sincronización del satélite");
        }

        const data = await response.json();
        
        // Filtramos para quedarnos solo con los 5 titulares más recientes y relevantes
        const topNews = data.items.slice(0, 5).map(item => ({
            title: item.title,
            time: item.pubDate,
            link: item.link
        }));

        console.log("🚨 Inteligencia Recolectada:", topNews);
        return topNews;

    } catch (error) {
        console.error("❌ Error en Taco Motor:", error);
        return [];
    }
}