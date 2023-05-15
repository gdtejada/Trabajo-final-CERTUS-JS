/* variables */
let arrayCatalogo = new Array();
let numPage;

/* Leer parametros URL */
let parametrosURL = new URLSearchParams(location.search);

/* Comprobar pagina */
if (parseInt(parametrosURL.get("page")) == 1 || parametrosURL.get("page") == null) {
    numPage = 1;
} else {
    numPage = parseInt(parametrosURL.get("page"));
}

/* solicitar datos al servidor */
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    arrayCatalogo = objeto;
    cargarCatalogo(numPage);
})

/* function cargar catalogo */
function cargarCatalogo(pagina) {
    /* referencia de catalogo  */
    let filaCatalogo = document.querySelector("#catalogo");

    /* Crear elementos */
    let inicio = (pagina - 1) * 8;
    let final;
    let tmpfinal = pagina * 8 - 1;
    if (arrayCatalogo.length < tmpfinal) {
        final = arrayCatalogo.length;
    } else {
        final = tmpfinal;
    }
    for (let index = inicio; index <= final; index++) {
        /* Proceso precios */
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = precio - (precio * oferta / 100);
        /* Creo Articulos */
        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class", 'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"')
        nuevoElemento.innerHTML = `
            <picture>
                <img class="img-fluid" src="image/productos/${arrayCatalogo[index].image}" alt="${arrayCatalogo[index].name}">
            </picture>
            <h4>${arrayCatalogo[index].name}</h4>
            <p>
                <span class="precioOriginal">S/ ${precio}</span> 
                <span class="precioDescuento">-${oferta}%</span>
                <br><span class="precioFinal">S/ ${precioFinal}</span>
            </p>
            <button onclick="addCarrito(event)" class="btn btn-light"><i class="bi bi-plus=square"></i>Agregar al carrito</button>      
        `;

        /* anadir el nuevo elemento al catalogo */
        filaCatalogo.append(nuevoElemento);

    }

}

/* Function del carrito */

function addCarrito(event) {
    const button = event.target; 
    const article = button.closest('article'); 
    const nombre = article.querySelector('h4').innerText; 
    const precio = article.querySelector('.precioFinal').innerText; 
    const imagenSrc = article.querySelector('img').getAttribute('src'); 

    const nuevoElemento = document.createElement('div'); 
    nuevoElemento.innerHTML = `
      <div class="modal-contenedor py-2">
        <div>
            <img class="img-fluid img-carrito" src="${imagenSrc}" alt="${nombre}">
        </div>
        <div class="p-3">
            <p>Nombre: ${nombre}</p>
            <p>Precio: ${precio}</p>
       </div>
       </div>
    `;

/* Agrega el nuevo elemento */
    const carritoProductos = document.getElementById('carritoProductos');
    carritoProductos.appendChild(nuevoElemento); 
   
}
