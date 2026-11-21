# AnimeHaven

Proyecto frontend de una tienda temática de anime, desarrollado con **HTML, CSS y JavaScript**.

El repositorio permite explorar la construcción de una interfaz de catálogo y detalles de productos. Se encuentra en desarrollo.

## Funciones presentes en el código

- Alternancia del menú de navegación.
- Carrusel de productos.
- Navegación entre pestañas de contenido.
- Carga de información de productos desde un archivo JSON.
- Selección de un producto mediante el parámetro `id` de la URL.
- Interacciones visuales de carrito mediante alerta y modal.

Las interacciones del carrito son demostrativas. No se presenta este proyecto como una tienda con pagos, pedidos o persistencia de carrito implementados.

## Tecnologías

- HTML
- CSS
- JavaScript: DOM, eventos, Fetch API y URLSearchParams.

## Estructura

```text
index.html     Página principal
index.js       Interacciones y carga de productos
style.css      Estilos
css/           Estilos adicionales
assets/        Recursos visuales
pages/         Páginas y recursos del catálogo
```

## Ejecutar localmente

```bash
git clone https://github.com/LMauricio99/Tienda-AnimeHaven.git
cd Tienda-AnimeHaven
```

Sirve la carpeta con un servidor HTTP local, por ejemplo con Live Server de tu editor. La carga mediante `fetch` requiere un entorno HTTP; abrir los archivos con `file://` puede impedir la lectura del JSON.

## Pendientes conocidos

- Revisar la ruta fija `/tienda-online/pages/datos.json` para que funcione desde la raíz real de despliegue.
- Comprobar la existencia de los elementos antes de registrar eventos o manipularlos, especialmente si el mismo script se comparte entre distintas páginas.
- Validar cantidades e identificar productos inexistentes con mensajes visibles para el usuario.
- Verificar navegación, carrusel, pestañas y modal en escritorio y móvil.
- Incorporar una captura y una demo tras completar esas verificaciones.

## Autor

[Henry Mauricio Lozada Barragán](https://github.com/LMauricio99)
