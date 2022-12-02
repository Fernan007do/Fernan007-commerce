
const adress = "./forniture.json"
fetch(adress)
    .then((resp) => resp.json() )
    .then((data) => { 
        renderProducts(data)
    })



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

