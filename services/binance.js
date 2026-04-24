// Se encarga exclusivamente de hablar con Binance
export async function getTickerData(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        return null;
    }
}