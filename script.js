
let favorites = [];
let cart = [];


const productsGrid = document.getElementById('productsGrid');
const categoryCards = document.querySelectorAll('.category-card');
const favBadge = document.getElementById('favBadge');
const cartBadge = document.getElementById('cartBadge');
const modal = document.getElementById('detailsModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const cartDrawer = document.getElementById('cartDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeDrawer = document.getElementById('closeDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const addRutaBtn = document.getElementById('addRutaBtn');

document.addEventListener('DOMContentLoaded', () => {
  renderItems(itemsData);
  setupCategoryFilter();
});

function renderItems(items) {
  productsGrid.innerHTML = '';

  if (items.length === 0) {
    productsGrid.innerHTML = `<p style="text-align: center; grid-column: 1/-1;">No se encontraron sitios en esta categoría.</p>`;
    return;
  }

  items.forEach(item => {
    const isFav = favorites.includes(item.id);

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <span class="card-badge">${item.categoryName}</span>
      <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${item.id})">
        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
      </button>
      <div class="card-img-container">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="card-footer">
          <button class="card-btn-outline" onclick="openDetails(${item.id})">Ver Detalles</button>
          <button class="card-btn" onclick="addToCart(${item.id})">Añadir a Ruta</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const patrimonioCards = document.querySelectorAll('.patrimonio-destacado .card');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const filterValue = card.getAttribute('data-filter');

      patrimonioCards.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex'; 
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  favBadge.textContent = favorites.length;

  const activeFilter = document.querySelector('.category-card.active').dataset.filter;
  if (activeFilter === 'all') {
    renderItems(itemsData);
  } else {
    renderItems(itemsData.filter(item => item.category === activeFilter));
  }
}

function addToCart(id) {
  const item = itemsData.find(i => i.id === id);
  if (item && !cart.some(c => c.id === id)) {
    cart.push(item);
    updateCartUI();
    openCartDrawer();
  } else {
    openCartDrawer();
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  cartBadge.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">No has guardado experiencias o lugares aún.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'drawer-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="drawer-item-info">
        <h5>${item.title}</h5>
        <small>${item.categoryName}</small>
      </div>
      <i class="fa-solid fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
    `;
    cartItemsContainer.appendChild(div);
  });
}

function openDetails(id) {
  const item = itemsData.find(i => i.id === id);
  if (!item) return;

  modalBody.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="modal-body-img">
    <div class="modal-body-padding">
      <h2>${item.title}</h2>
      <p><strong>Categoría:</strong> ${item.categoryName}</p>
      <p>${item.details}</p>
      <button class="btn btn-primary full-width" onclick="addToCart(${item.id}); closeModalFunc();">Añadir a mi Itinerario</button>
    </div>
  `;
  modal.classList.add('open');
}

function closeModalFunc() {
  modal.classList.remove('open');
}

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFunc();
});

function openCartDrawer() {
  cartDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
}

cartBtn.addEventListener('click', openCartDrawer);
closeDrawer.addEventListener('click', closeCartDrawer);
drawerOverlay.addEventListener('click', closeCartDrawer);

if (addRutaBtn) {
  addRutaBtn.addEventListener('click', () => {
    itemsData.forEach(item => {
      if (!cart.some(c => c.id === item.id)) {
        cart.push(item);
      }
    });
    updateCartUI();
    openCartDrawer();
  });
}