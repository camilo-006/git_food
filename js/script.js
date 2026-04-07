sessionStorage.removeItem('admin_logueado');
const contenedorProductos = document.getElementById('lista-productos');
const etiquetaTotalHeader = document.getElementById('total-carrito-header');
const etiquetaTotalPanel = document.getElementById('total-carrito-panel');
const botonCarritoTop = document.getElementById('boton-carrito');
const panelCarrito = document.getElementById('carrito-panel');
const botonCerrar = document.getElementById('cerrar-carrito');
const contenedorLista = document.getElementById('lista-productos-carrito');
const contadorcarrito = document.getElementById('contador-carrito');
const trackPromos = document.getElementById('track-promos');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
let indicePromo = 0;
const totalPromos = 3; 

let carrito = JSON.parse(localStorage.getItem('carritoGitFood')) || [];
let productosBaseDeDatos = [];

// 1. FUNCIÓN PARA TRAER LOS DATOS DE MYSQL
async function cargarProductos() {
    try {
        const respuesta = await fetch('http://localhost/git_food_api/obtener_productos.php');
        const productos = await respuesta.json();

        // Convertimos el precio a número
        productosBaseDeDatos = productos.map(p => ({
            ...p,
            precio: parseFloat(p.precio) 
        }));

        contenedorProductos.innerHTML = ''; 
        productosBaseDeDatos.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-producto');

            // 🌟 CONDICIONAL PARA LA IMAGEN PRINCIPAL 🌟
            let htmlImagen = "";
            if (producto.url_image && producto.url_image.trim() !== "") {
                htmlImagen = `<img src="${producto.url_image}" 
                                   alt="${producto.nombre_producto}" 
                                   class="img-tarjeta" 
                                   onerror="this.parentElement.innerHTML='<div class=\'emoji-tarjeta\'>🍔</div>'">`;
            } else {
                htmlImagen = `<div class="emoji-tarjeta">🍔</div>`;
            }

            tarjeta.innerHTML = `
                <div class="imagen-producto">${htmlImagen}</div>
                <h3>${producto.nombre_producto}</h3>
                <p style="color: #ffca28; font-weight: bold; margin: 5px 0;">${producto.categoria}</p>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id_producto})">
                    Agregar
                </button>
            `;
            contenedorProductos.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al traer los datos:", error);
    }
}

// 2. FUNCIONES DEL CARRITO
function agregarAlCarrito(id){
    const productoEncontrado = productosBaseDeDatos.find(p => p.id_producto == id);
    if (productoEncontrado){
        carrito.push(productoEncontrado);   
        actualizarInterfaz();
        renderizarCarrito(); 
        mostrarToast(productoEncontrado.nombre_producto);
    }
}

function actualizarInterfaz() {
    contadorcarrito.innerText = carrito.length;
    let total = 0;
    carrito.forEach(item => {
        total = total + item.precio;
    });

    etiquetaTotalHeader.innerText = total.toLocaleString();
    etiquetaTotalPanel.innerText = total.toLocaleString();
    
    const etiquetaTotalFinal = document.getElementById('total-final');
    if(etiquetaTotalFinal){
        etiquetaTotalFinal.innerText = `$${total.toLocaleString()}`;
    }

    localStorage.setItem('carritoGitFood', JSON.stringify(carrito));
}

function renderizarCarrito(){
    contenedorLista.innerHTML = '';

    if (carrito.length === 0){
        contenedorLista.innerHTML = '<p style="text-align:center; padding:20px;">Tu carrito está vacío 😢</p>';
        return;
    }

    carrito.forEach((producto, index) => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('item-carrito');

        // 🌟 CONDICIONAL PARA LA IMAGEN DEL CARRITO 🌟
        let htmlImagenMini = "";
        if (producto.url_image && producto.url_image.trim() !== "") {
            htmlImagenMini = `<img src="${producto.url_image}" 
                                   alt="${producto.nombre_producto}" 
                                   class="img-carrito" 
                                   onerror="this.parentElement.innerHTML='<div class=\'emoji-carrito\'>🍔</div>'">`;
        } else {
            htmlImagenMini = `<div class="emoji-carrito">🍔</div>`;
        }

        divProducto.innerHTML = `
            <div>${htmlImagenMini}</div>
            <div style="flex-grow: 1; margin-left: 10px;">
                <p><strong>${producto.nombre_producto}</strong></p>
                <p>$${producto.precio.toLocaleString()}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">
                ❌  
            </button>
        `;
        contenedorLista.appendChild(divProducto);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
    renderizarCarrito();
}

function mostrarToast(mensaje){
    const contenedor = document.getElementById('toast-contenedor');
    if(!contenedor) return;
    
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `✅ ¡Listo! Agregaste: ${mensaje}`;
    contenedor.appendChild(toast);

    setTimeout(() => { toast.classList.add('mostrar'); }, 10);
    setTimeout(() => {
        toast.classList.remove('mostrar');
        setTimeout(() => { toast.remove(); }, 400);
    }, 3000);
}

// 3. FINALIZAR COMPRA (WHATSAPP)
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            title: '¡Carrito vacío!',
            text: 'Agrega algo rico antes de continuar 🍔',
            icon: 'warning',
            confirmButtonColor: '#d90429'
        });
        return;
    }

    const telefono = "573223109301"; 
    let mensaje = "¡Hola Flash Food! Quisiera hacer un pedido:\n\n";
    let total = 0;

    carrito.forEach((producto) => {
        mensaje += `• ${producto.nombre_producto} - $${producto.precio.toLocaleString()}\n`;
        total += producto.precio;
    });
    mensaje += `\n*Total a pagar: $${total.toLocaleString()}*`;

    Swal.fire({
        title: '¡Pedido listo! 🚀',
        text: 'Te redigiremos a WhatsApp para confirmar tu pedido.',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: '¡Vamos!',
        confirmButtonColor: '#ffca28',
        customClass: { confirmButton: 'texto-negro' }
    }).then((result) => {
        if (result.isConfirmed) {
            const mensajeUrl = encodeURIComponent(mensaje);
            window.open(`https://wa.me/${telefono}?text=${mensajeUrl}`, '_blank');

            carrito = [];
            actualizarInterfaz();
            renderizarCarrito();
            panelCarrito.classList.remove('activo');
        }
    });
}

// 4. EVENTOS DEL CARRITO
botonCarritoTop.addEventListener('click', () => {
    panelCarrito.classList.add('activo');
    renderizarCarrito();
});

botonCerrar.addEventListener('click', () => {
    panelCarrito.classList.remove('activo');
});

// 5. FUNCIONES DEL CARRUSEL
function moverCarrusel() {
    if(trackPromos) trackPromos.style.transform = `translateX(-${indicePromo * 100}%)`;
}

function siguientePromo() {
    indicePromo++;
    if (indicePromo >= totalPromos) {
        indicePromo = 0; 
    }
    moverCarrusel();
}

function anteriorPromo() {
    indicePromo--;
    if (indicePromo < 0) {
        indicePromo = totalPromos - 1; 
    }
    moverCarrusel();
}

if(btnNext) btnNext.addEventListener('click', () => {
    siguientePromo();
    reiniciarTemporizador(); 
});

if(btnPrev) btnPrev.addEventListener('click', () => {
    anteriorPromo();
    reiniciarTemporizador();
});

let temporizador = setInterval(siguientePromo, 4000);
function reiniciarTemporizador() {
    clearInterval(temporizador);
    temporizador = setInterval(siguientePromo, 4000);
}

// 6. INICIALIZAR LA APLICACIÓN
cargarProductos();
actualizarInterfaz();
renderizarCarrito();