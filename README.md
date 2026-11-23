# AnimeHaven

Una tienda de anime hecha con HTML, CSS y JavaScript. La empecé para practicar maquetación y manejo del DOM, y ahora la estoy retomando para mejorarla.

Tiene un catálogo con ocho productos, un carrusel y una página de detalle que lee los datos desde JSON. El botón del carrito muestra una confirmación de la cantidad elegida; todavía no guarda pedidos ni procesa pagos.

## Probar el proyecto

```bash
git clone https://github.com/LMauricio99/Tienda-AnimeHaven.git
cd Tienda-AnimeHaven
python -m http.server 8000
```

Abre http://localhost:8000. También puedes usar Live Server. Es necesario servir los archivos por HTTP para cargar el catálogo.

## Últimos ajustes

Corregí la carga del catálogo y los errores que aparecían al compartir el mismo JavaScript entre la portada y la ficha. También agregué validación de cantidades, un aviso para productos inexistentes y cierre del modal con Escape.

Probé la portada, la ficha de producto, una cantidad inválida y un ID inexistente. Falta revisar con más detalle la adaptación a móviles, completar los enlaces de navegación y convertir la confirmación del carrito en un carrito que guarde los productos.

Los archivos principales son `index.html`, `index.js` y `style.css`. En `pages/` están la ficha y el catálogo; en `assets/`, las imágenes.

## Navegación y móvil

El menú se abre y se cierra al elegir una sección. Los enlaces de inicio, productos, acerca de, blog y contacto apuntan a contenido real de la página. La ficha vuelve a esas mismas secciones de la portada. Ajusté el carrusel, la ficha y el pie de página para pantallas pequeñas.

La demo está en https://lmauricio99.github.io/Tienda-AnimeHaven/. Es un catálogo de práctica: no recibe compras ni suscripciones. El carrito sigue siendo una confirmación de selección, sin persistencia.
