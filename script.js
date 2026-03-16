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

async function cargarProductos() {
    try {
        const respuesta = await fetch('productos.json');
        const productos = await respuesta.json();
        productosBaseDeDatos = productos;

        productos.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-producto');

            tarjeta.innerHTML = `
                <div class="imagen-producto">${producto.imagen}</div>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                    Agregar
                </button>
            `;
            contenedorProductos.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al traer los datos:", error);
    }
}

function agregarAlCarrito(id){
    const productoEncontrado = productosBaseDeDatos.find(p => p.id == id);
    if (productoEncontrado){
        carrito.push(productoEncontrado);   
        actualizarInterfaz();
        renderizarCarrito(); 
        mostrarToast(productoEncontrado.nombre);
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

        divProducto.innerHTML = `
            <div>${producto.imagen}</div>
            <div>
                <p><strong>${producto.nombre}</strong></p>
                <p>$${producto.precio.toLocaleString()}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">
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
    let mensaje = "¡Hola Git Food! 👋 Quisiera hacer un pedido:\n\n";
    let total = 0;

    carrito.forEach((producto) => {
        mensaje += `• ${producto.nombre} - $${producto.precio.toLocaleString()}\n`;
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

botonCarritoTop.addEventListener('click', () => {
    panelCarrito.classList.add('activo');
    renderizarCarrito();
});

botonCerrar.addEventListener('click', () => {
    panelCarrito.classList.remove('activo');
});

cargarProductos();
actualizarInterfaz();
renderizarCarrito();




function moverCarrusel() {
    trackPromos.style.transform = `translateX(-${indicePromo * 100}%)`;
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


btnNext.addEventListener('click', () => {
    siguientePromo();
    reiniciarTemporizador(); 
});

btnPrev.addEventListener('click', () => {
    anteriorPromo();
    reiniciarTemporizador();
});
let temporizador = setInterval(siguientePromo, 4000);
function reiniciarTemporizador() {
    clearInterval(temporizador);
    temporizador = setInterval(siguientePromo, 4000);
}