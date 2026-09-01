// 1. Relógio em Tempo Real e Alternância Dia/Noite
function updateClockAndTheme() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('time').innerText = `${hours}:${minutes}:${seconds}`;

    // Entre 06:00 e 17:59 define como DIA, caso contrário NOITE
    if (now.getHours() >= 6 && now.getHours() < 18) {
        document.body.classList.remove('night');
        document.body.classList.add('day');
    } else {
        document.body.classList.remove('day');
        document.body.classList.add('night');
    }
}

setInterval(updateClockAndTheme, 1000);
updateClockAndTheme();

// 2. Animação de Entrada e Parallax 3D com GSAP
gsap.from(".widgets-container", { y: -30, opacity: 0, duration: 1, ease: "power2.out" });
gsap.from(".main-content", { y: 40, opacity: 0, duration: 1.2, delay: 0.3, ease: "power3.out" });
gsap.from(".pixel-btn", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.8 });

// Parallax Avançado por Camadas (Efeito 3D Profundo)
window.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5);
    const moveY = (e.clientY / window.innerHeight - 0.5);

    // Cada camada se desloca numa proporção diferente (fundo mais lento, frente mais rápido)
    gsap.to("#celestial-body", { x: moveX * 20, y: moveY * 20, duration: 1 });
    //gsap.to(".layer-clouds", { x: moveX * 40, y: moveY * 10, duration: 1 });//
    gsap.to("#mountains-back", { x: moveX * 60, y: moveY * 15, duration: 1 });
    gsap.to("#mountains-front", { x: moveX * 100, y: moveY * 25, duration: 1 });
    gsap.to(".main-content", { x: moveX * -20, y: moveY * -20, duration: 1 }); // O card central flutua ao contrário
});

// 3. Integração com API de Clima (OpenWeatherMap)
const searchBtn = document.getElementById('search-weather');
const cityInput = document.getElementById('city-input');

// Remova a const apiKey do script.js, ela não fica mais aqui!

async function fetchWeather(city) {
    try {
        // O Front-End pede os dados para a sua própria rota da Vercel
        const response = await fetch(`/api/weather?cidade=${encodeURIComponent(city)}`);
        const data = await response.json();
        
        if (data.cod === 200) {
            document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('condition').innerText = data.weather[0].description;
        } else {
            document.getElementById('condition').innerText = "Não achado";
        }
    } catch (error) {
        document.getElementById('condition').innerText = "Offline";
    }
}

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        fetchWeather(cityInput.value.trim());
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim() !== '') {
        fetchWeather(cityInput.value.trim());
    }
});

fetchWeather("Natal");
