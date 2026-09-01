// api/weather.js
export default async function handler(req, res) {
    const { cidade } = req.query;
    // O process.env busca a chave secreta guardada no painel da Vercel
    const apiKey = process.env.WEATHER_API_KEY; 

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${apiKey}`);
        const data = await response.json();
        
        // Devolve os dados prontos para o seu Front-End
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro de comunicação' });
    }
}