document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-container');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Evita conflictos si tocan directamente un enlace o video interno
            card.classList.toggle('is-flipped');
        });
    });
});