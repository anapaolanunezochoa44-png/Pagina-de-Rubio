document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioFondo");
    const btnAudio = document.getElementById("btnAudio");
    const iconoSonido = document.getElementById("iconoSonido");
    const iconoMudo = document.getElementById("iconoMudo");

    audio.play().then(() => {
        actualizarIconos(false);
    }).catch(error => {
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


    btnAudio.addEventListener("click", (e) => {
        e.stopPropagation(); 
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