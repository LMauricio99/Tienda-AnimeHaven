function toggleNavbar(){
  const navbarLinks = document.querySelector('.navbar-links');
  navbarLinks.classList.toggle('active');
}

function scrollToTop(){
  window.scrollTo({top: 0, behavior: 'smooth'});
}

let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

function moveCarousel(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 25; /* Ajustado para 4 elementos visibles */
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

document.getElementById('add-to-car').addEventListener('click', function(){
  const quantity = document.getElementById('quantity').value;
  alert(`Has añadido ${quantity} artículo(s) al carrito.`)
})

/**Tabs code */
function openTab(evt, tabName){
  var i, tabcontent, tablinks;

  //Oculta todo el contenido de las pestañas
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++){
    tabcontent[i].style.display = 'none';
  }

  //Elimina la clase 'active' de todos los enlaces de las pestañas
  tablinks = document.getElementsByClassName('tablink');
  for (i = 0; i < tablinks.length; i++){
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  //Muestra la pestaña actual y agrega la clase 'active' al botón de la pestaña que se ha hecho click
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

document.getElementById('defaultOpen').click();

//Función para cargar los datos JSON
async function cargarProductos(){
  try{
    const response = await fetch('/tienda-online/pages/datos.json');
    if(!response.ok){
      console.error('Error al cargar el archivo JSON');
      return;
    }
    const productos = await response.json();
    console.log('Productos cargados:', productos);
    return productos;
  }catch(error){
    console.error('Error al cargar el archivo JSON:', error);
  }
}

//Función para mostrar los detalles de un producto
function mostrarDetallesProducto(producto){

  document.getElementById('title-producto').textContent = producto.title;
  document.getElementById('subtitle-producto').textContent = producto.subtitle;
  document.getElementById('description-producto').textContent = producto.description;
  document.getElementById('price-producto').textContent = `$${producto.price}`;
  document.getElementById('old-price-producto').textContent = `$${producto.oldPrice}`;
  document.getElementById('img-producto').src = producto.imgPath;
  // console.log('Ruta de la imagen:', producto.imgPath); 
}

//Función para inicializar el detalles del producto
async function init(){
  const productos = await cargarProductos();

  if(!productos) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  console.log('ID del producto:', productId);
  const producto = productos.find(p => p.id === productId);
  console.log('Producto encontrado---:', producto);

  if(producto){
    mostrarDetallesProducto(producto);
  }else{
    console.error('No se encontro el producto');
  }
}

//Ejecuta la función init al cargar la pestaña
window.onload = init;


// Obtener elementos del DOM
const modal = document.getElementById("modalCarrito");
const span = document.getElementsByClassName("close")[0];

// Mostrar el modal cuando se hace clic en "Añadir al carrito"
document.getElementById("add-to-cart-button").addEventListener("click", function() {
    modal.style.display = "block";
});

// Cerrar el modal cuando se hace clic en la "X"
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
