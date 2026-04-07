// 🔒 SEGURIDAD: Si no hay llave, patada hacia el login
if (sessionStorage.getItem('admin_logueado') !== 'true') {
    window.location.replace('login.html');
}

const tablaProductos = document.getElementById('cuerpo-tabla');
const formulario = document.getElementById('form-producto');
const inputIdEditar = document.getElementById('id_producto_editar');

let productosGlobal = []; 

// 1. CARGAR PRODUCTOS
async function cargarProductosAdmin() {
    try {
        const respuesta = await fetch('http://localhost/git_food_api/obtener_productos.php');
        productosGlobal = await respuesta.json();
        tablaProductos.innerHTML = ''; 

        productosGlobal.forEach(producto => {
            const fila = document.createElement('tr');
            const precioFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(producto.precio);

            fila.innerHTML = `
                <td><img src="${producto.url_image}" alt="img" width="50" height="50" style="object-fit: cover; border-radius: 5px;"></td>
                <td><strong>${producto.nombre_producto}</strong></td>
                <td>${precioFormateado}</td>
                <td>
                    <button class="btn-editar" onclick="prepararEdicion(${producto.id_producto})">✏️</button>
                    <button class="btn-eliminar" onclick="eliminarProducto(${producto.id_producto})">🗑️</button>
                </td>
            `;
            tablaProductos.appendChild(fila);
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

// 2. PREPARAR EDICIÓN
function prepararEdicion(id) {
    const producto = productosGlobal.find(p => p.id_producto == id);
    inputIdEditar.value = producto.id_producto;
    document.getElementById('nombre').value = producto.nombre_producto;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('url_image').value = producto.url_image;
    document.getElementById('id_categoria').value = producto.id_categoria;
    document.querySelector('#form-producto button[type="submit"]').textContent = "Actualizar ✏️";
    window.scrollTo(0, 0);
}

// 3. GUARDAR / ACTUALIZAR
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id_editar = inputIdEditar.value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: document.getElementById('precio').value,
        url_image: document.getElementById('url_image').value,
        id_categoria: document.getElementById('id_categoria').value
    };

    let url = id_editar ? 'http://localhost/git_food_api/actualizar_producto.php' : 'http://localhost/git_food_api/crear_producto.php';
    if(id_editar) datos.id_producto = id_editar;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    const info = await res.json();
    if(info.exito) {
        Swal.fire('Listo', 'Operación exitosa', 'success');
        formulario.reset();
        inputIdEditar.value = "";
        cargarProductosAdmin();
    }
});

// 4. ELIMINAR
async function eliminarProducto(id) {
    const confirm = await Swal.fire({ title: '¿Borrar?', icon: 'warning', showCancelButton: true });
    if (confirm.isConfirmed) {
        const res = await fetch('http://localhost/git_food_api/eliminar_producto.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto: id })
        });
        const info = await res.json();
        if(info.exito) cargarProductosAdmin();
    }
}

// 🔒 5. CERRAR SESIÓN (Botón)
const btnLogout = document.getElementById('btn-logout');
if(btnLogout) {
    btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem('admin_logueado');
        window.location.replace('index.html');
    });
}

cargarProductosAdmin();