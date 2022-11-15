 const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
 const emptyCartContainer = document.querySelector("#empty-cart");
 const selledCartContainer = document.querySelector("#selled-cart");
 const cartProductsContainer =  document.querySelector("#cart-products");
 const cartActionsContainer = document.querySelector("#cart-actions");

 if (cartProducts){
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






 }else{

 }



/*  <div class="cart-product">
 <img class="cart-product__image" src="../img/camisetas/01.jpg" alt="">

 <div class="cart-product__name">
     <small>Titulo producto</small>
     <h3>Remera1</h3>
 </div>

 <div class="cart-product__cant">
     <small>Cantidad</small>
     <p>1</p>
 </div>

 <div class="cart-product__price">
     <small>Precio</small>
     <p>$200</p>
 </div>

 <div class="cart-product__subtotal">
     <small>Sub-Total</small>
     <p>$200</p>
 </div>

 <button class="cart-product__remove"><i class="bi bi-trash-fill"></i></button>

</div> */