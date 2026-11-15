document.addEventListener("DOMContentLoaded", function() {
    let indexActual = 0;
    const slides = document.querySelectorAll('.carrusel-item-puro');
    const puntos = document.querySelectorAll('.carrusel-puntos .punto');
    const track = document.getElementById('menuCarouselPuro');

    function actualizarCarrusel() {
        if (!track || slides.length === 0) return;
        track.style.transform = `translateX(-${indexActual * 100}%)`;
        
        puntos.forEach((p, i) => {
            p.classList.toggle('activo', i === indexActual);
        });
    }

    function siguienteSlide() {
        indexActual = (indexActual + 1) % slides.length;
        actualizarCarrusel();
    }

    // Función global para que los puntos funcionen al hacerles clic
    window.irASlide = function(n) {
        indexActual = n;
        actualizarCarrusel();
    }

    // Intervalo de tiempo para que se mueva solo cada 3 segundos (3000ms)
    if (slides.length > 0) {
        setInterval(siguienteSlide, 3000);
    }
});