document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioFondo");
    const btnAudio = document.getElementById("btnAudio");
    const iconoSonido = document.getElementById("iconoSonido");
    const iconoMudo = document.getElementById("iconoMudo");

    // Intentar reproducir de inicio
    audio.play().then(() => {
        // Reproduciendo con éxito
        actualizarIconos(false);
    }).catch(error => {
        // Si el navegador bloquea el autoplay, esperamos el primer toque del usuario
        console.log("Autoplay bloqueado por el navegador, esperando interacción.");
        actualizarIconos(true);
        
        const activarAudioPorInteraccion = () => {
            audio.play();
            actualizarIconos(false);
            window.removeEventListener("click", activarAudioPorInteraccion);
            window.removeEventListener("keydown", activarAudioPorInteraccion);
        };

        window.addEventListener("click", activarAudioPorInteraccion);
        window.addEventListener("keydown", activarAudioPorInteraccion);
    });

    // Control al hacer clic en el botón flotante
    btnAudio.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que dispare eventos cruzados
        if (audio.paused) {
            audio.play();
            actualizarIconos(false);
        } else {
            audio.pause();
            actualizarIconos(true);
        }
    });

    function actualizarIconos(estaPausado) {
        if (estaPausado) {
            iconoSonido.classList.add("oculto");
            iconoMudo.classList.remove("oculto");
            btnAudio.classList.add("pausado");
        } else {
            iconoSonido.classList.remove("oculto");
            iconoMudo.classList.add("oculto");
            btnAudio.classList.remove("pausado");
        }
    }
});