
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.timeline-item');

    items.forEach(item => {
        const btnIr = item.querySelector('.btn-ir');
        const btnRegresar = item.querySelector('.btn-regresar');

        // Botón para avanzar -> Muestra la info detallada (Imagen 2)
        if (btnIr) {
            btnIr.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.add('desplazado');
            });
        }

        // Botón para regresar -> Muestra la portada azul (Imagen 1)
        if (btnRegresar) {
            btnRegresar.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.remove('desplazado');
            });
        }
    });
});