function toggleNavbar() {
  const links = document.querySelector('.navbar-links');
  if (!links) return;
  const open = links.classList.toggle('active');
  const toggle = document.querySelector('.navbar-toggle');
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
let currentIndex = 0;
function moveCarousel(direction) {
  const track = document.querySelector('.carousel-container');
  if (!track || !track.children.length) return;
  const first = track.children[0];
  const styles = getComputedStyle(first);
  const step = first.offsetWidth + parseFloat(styles.marginLeft || 0)
    + parseFloat(styles.marginRight || 0);
  const maxOffset = Math.max(0, track.scrollWidth - track.clientWidth);
  const lastIndex = step > 0 ? Math.ceil(maxOffset / step) : 0;
  currentIndex += direction;
  if (currentIndex > lastIndex) currentIndex = 0;
  if (currentIndex < 0) currentIndex = lastIndex;
  track.style.transform = `translateX(-${Math.min(currentIndex * step, maxOffset)}px)`;
}
function openTab(evt, tabName) {
  const panel = document.getElementById(tabName);
  if (!panel) return;
  document.querySelectorAll('.tabcontent').forEach(item => {
    item.style.display = 'none';
  });
  document.querySelectorAll('.tablink').forEach(button => {
    button.classList.remove('active');
  });
  panel.style.display = 'block';
  evt.currentTarget.classList.add('active');
}
async function cargarProductos() {
  const response = await fetch('./datos.json');
  if (!response.ok) throw new Error('No se pudo cargar el catálogo.');
  return response.json();
}
function mostrarDetallesProducto(producto) {
  const fields = {
    'title-producto': producto.title,
    'subtitle-producto': producto.subtitle,
    'description-producto': producto.description,
    'price-producto': `$${producto.price}`,
    'old-price-producto': `$${producto.oldPrice}`
  };
  Object.entries(fields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });
  const image = document.getElementById('img-producto');
  if (image) {
    image.src = producto.imgPath;
    image.alt = producto.title;
  }
  const description = document.querySelector('#descripcion p');
  if (description) description.textContent = producto.description;
  document.title = `${producto.title} | AnimeHaven`;
}
async function init() {
  // La portada y la ficha comparten este archivo.
  if (!document.getElementById('title-producto')) return;
  const addButton = document.getElementById('add-to-car');
  if (addButton) addButton.disabled = true;
  try {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id || !/^\d+$/.test(id)) throw new Error('No encontramos ese producto.');
    const productos = await cargarProductos();
    const producto = productos.find(item => item.id === Number(id));
    if (!producto) throw new Error('No encontramos ese producto.');
    mostrarDetallesProducto(producto);
    if (addButton) addButton.disabled = false;
  } catch (error) {
    document.getElementById('title-producto').textContent = 'Producto no disponible';
    const description = document.getElementById('description-producto');
    if (description) description.textContent = `${error.message} Puedes volver al inicio y elegir otro.`;
  }
}
document.getElementById('defaultOpen')?.click();
const modal = document.getElementById('modalCarrito');
const closeButton = modal?.querySelector('.close');
const addButton = document.getElementById('add-to-car');
const quantityInput = document.getElementById('quantity');
addButton?.addEventListener('click', () => {
  const quantity = Number(quantityInput?.value);
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    quantityInput?.setCustomValidity('Escribe una cantidad entera mayor que cero.');
    quantityInput?.reportValidity();
    return;
  }
  quantityInput.setCustomValidity('');
  if (modal) {
    modal.querySelector('p').textContent = `Has seleccionado ${quantity} artículo(s). Esta es una demo; no se realizará ninguna compra.`;
    modal.style.display = 'block';
  }
});
quantityInput?.addEventListener('input', () => quantityInput.setCustomValidity(''));
closeButton?.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', event => {
  if (modal && event.target === modal) modal.style.display = 'none';
});
window.addEventListener('keydown', event => {
  if (modal && event.key === 'Escape') modal.style.display = 'none';
});
window.addEventListener('resize', () => {
  currentIndex = 0;
  const track = document.querySelector('.carousel-container');
  if (track) track.style.transform = 'translateX(0)';
});
init();

document.querySelectorAll('.navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar-links')?.classList.remove('active');
    const toggle = document.querySelector('.navbar-toggle');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menú');
  });
});
