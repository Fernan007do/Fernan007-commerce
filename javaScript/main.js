// Array Productos 
const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    }
];

const productsContainer = document.querySelector("#products-container");
const categoryButtons= document.querySelectorAll(".btn-category");
const mainTitle = document.querySelector(".title");
let addButtons= document.querySelectorAll(".product-add");
const cantidad = document.querySelector("#cantidad");
const cartProductsLS = JSON.parse(localStorage.getItem("cartProducts"));
let cartProducts

if (cartProductsLS){
    cartProducts = cartProductsLS;
    updateCantidad()
}else{
    cartProducts = [];
}

renderProducts(productos)
function renderProducts(chosenProducts) {
    productsContainer.innerHTML = "";
    chosenProducts.forEach( producto => {
        let div = document.createElement("div")
        div.classList.add("product")
        div.innerHTML = `
        <img class="product-image" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="product-details">
            <h3 class="product-title">${producto.titulo}</h3>
            <p class="product-price">$ ${producto.precio}</p>
            <button class="product-add" id="${producto.id}"> Agregar</button>
        </div>
        `

        productsContainer.append(div);
    })

    updateAddButtons()

}

categoryButtons.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        categoryButtons.forEach(boton =>boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            /* Cambiar el titulo cuando se aplica el filtro */
            const productCategory = productos.find( product => product.categoria.id === e.currentTarget.id)
            mainTitle.innerText= productCategory.categoria.nombre;  

            /* Renderizar productos que concuerden con el filtro */
            const buttonProducts = productos.filter( producto => producto.categoria.id === e.currentTarget.id)
            renderProducts(buttonProducts);

        }else{
            renderProducts(productos); 
            mainTitle.innerText= "Todos los productos";  
        }
    })

})

function updateAddButtons () {
    addButtons = document.querySelectorAll(".product-add")
    addButtons.forEach(boton => {
        boton.addEventListener("click", addToCart)
    })
}

function addToCart (e) {
    
    const buttonId = e.currentTarget.id;
    const addedProduct = productos.find(producto => producto.id === buttonId)
    if(cartProducts.some(producto => producto.id === buttonId)){
        addedProduct.cantidad += 1;
        
    }else{
        addedProduct.cantidad = 1;
        cartProducts.push(addedProduct);
    }
    
    updateCantidad()

    /* Cada vez que se agrega algo al carrito, lo mando al Local Storage */

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

}



function updateCantidad () {
    let newCantidad = cartProducts.reduce((counter, product) => counter + product.cantidad, 0)
    cantidad.innerText = newCantidad;
}

