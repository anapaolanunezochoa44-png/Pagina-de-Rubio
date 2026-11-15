 function showTimelineContent(contentId, buttonClicked) {
    // 1. Seleccionar todas las tarjetas de información dentro de la página
    const allCards = document.querySelectorAll('.info-card');
    const targetCard = document.getElementById(contentId);

    // 2. Si la tarjeta que presionamos YA está activa, la cerramos (se oculta)
    if (targetCard.classList.contains('active')) {
      targetCard.classList.remove('active');
      return; // Detenemos la función aquí
    }

    // 3. Si no estaba activa, primero ocultamos TODAS las demás
    allCards.forEach(card => {
      card.classList.remove('active');
    });

    // 4. Mostramos únicamente la tarjeta correspondiente al botón clickeado
    targetCard.classList.add('active');
  }
