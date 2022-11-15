let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
const emptyCartContainer = document.querySelector("#empty-cart");
const selledCartContainer = document.querySelector("#selled-cart");
const cartProductsContainer = document.querySelector("#cart-products");
const cartActionsContainer = document.querySelector("#cart-actions");
let removeButtons = document.querySelectorAll(".cart-product__remove")
const emptyCartButton = document.querySelector("#cart-actions-empty")
const buyCartButton = document.querySelector("#cart-actions-buy")
const total = document.querySelector("#total")


function renderCartProducts () {
    if (cartProducts && cartProducts.length > 0) {
        emptyCartContainer.classList.add("disabled");
        cartProductsContainer.classList.remove("disabled");
        cartActionsContainer.classList.remove("disabled");
        selledCartContainer.classList.add("disabled");
    
        cartProductsContainer.innerHTML = "";
    
        cartProducts.forEach(product => {
    
            let div = document.createElement("div")
            div.classList.add("cart-product")
            div.innerHTML = `
        <img class="cart-product__image" src=".${product.imagen}" alt="${product.titulo}">
        <div class="cart-product__name">
            <small>Titulo producto</small>
            <h3>${product.id}</h3>
        </div>
        <div class="cart-product__cant">
            <small>Cantidad</small>
            <p>${product.cantidad}</p>
        </div>
        <div class="cart-product__price">
            <small>Precio</small>
            <p>$${product.precio}</p>
        </div>
        <div class="cart-product__subtotal">
            <small>Sub-Total</small>
            <p>$${product.precio * product.cantidad}</p>
        </div>
        <button id="${product.id}" class="cart-product__remove"><i class="bi bi-trash-fill"></i></button>
        `
            cartProductsContainer.append(div)
        })
    } else {
        emptyCartContainer.classList.remove("disabled");
        cartProductsContainer.classList.add("disabled");
        cartActionsContainer.classList.add("disabled");
        selledCartContainer.classList.add("disabled");
    
    }
    updateRemoveButtons()
    totalUpdate()   
}

renderCartProducts()

function updateRemoveButtons() {
    removeButtons = document.querySelectorAll(".cart-product__remove")
    removeButtons.forEach(boton => {
        boton.addEventListener("click", removeFromCart)
    })
}

function removeFromCart (e) {
    const buttonId = e.currentTarget.id 
    const index = cartProducts.findIndex(p => p.id === buttonId)

    cartProducts.splice(index, 1);
    renderCartProducts()

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
}

emptyCartButton.addEventListener("click", emptyCart)
buyCartButton.addEventListener("click", buyCart)

function emptyCart () {
    cartProducts.length = 0;
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    renderCartProducts()
}

function buyCart () {
    cartProducts.length = 0;
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))

    emptyCartContainer.classList.add("disabled");
    cartProductsContainer.classList.add("disabled");
    cartActionsContainer.classList.add("disabled");
    selledCartContainer.classList.remove("disabled");
}

function totalUpdate () {
    const totalCalculado = cartProducts.reduce((acum, product) => acum + product.precio * product.cantidad, 0)
    total.innerText = `$${totalCalculado}`
}