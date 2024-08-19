const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [] // aqui serão adicionados os itens começa vazio

//abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal()
    cartModal.style.display="flex"
    // faz com que o modal apareça adiciona flex no lugar do hidden    
})


// Fechar o modal ao clicar fora
cartModal.addEventListener("click", function(event){
    console.log(event); // para ver o que é recebido no evento
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// Fechar o modal ao clicar btn fechar
closeModalBtn.addEventListener("click",function(){
    cartModal.style.display = "none"
})


// adicionar no carrinho
menu.addEventListener("click", function(event){
    //console.log(event.target)
    let parentButton = event.target.closest(".add-to-cart-btn") // .add-to-cart-btn CLASSE que esta dentro do botão não esquecer o ponto
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price")) // converte para receber como numero


        // adicionando no carrinho
        addToCart(name,price) // enviando para função


    }
})


//função para adicionar no carrinho
function addToCart(name, price){
   // adiciona o item ao array do carrinho
    const existingItem = cart.find(item => item.name === name) // confere se o item ja esta na lista

    if(existingItem){
        // se ja exister ele soma na quantidade e não cria um novo
        existingItem.quantity += 1;
        

    }else{
        // adiciona a primeira vez
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    //atualiza carrinho
    updateCartModal()

}


//atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = ""; //zera tudo
    let total = 0.0;


    cart.forEach(item => {
        const cartItemElement = document.createElement("div"); // cria uma div no HTML
        cartItemElement.classList.add("flex","justify-between","mb-4", "flex-col")// adiciona estilos

        cartItemElement.innerHTML = `
            <div class=" flex items-center justify-between">
                <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                    <button class = "remove-from-cart-btn" data-name="${item.name}">


                        Remover
                    </button>

            </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    // adiciona ao total e ja formata para o padrão de moeda do Brasil
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length; // pega o numero de itens no carrinho e atualiza o footer

}


// função para remover itens do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name =  event.target.getAttribute("data-name")

        removeItemCart(name)

    }
})


function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index!== -1){ // se for diferente de -1 é pq achou na lista
        const item = cart[index]; // acessa o numero especifico na lista


        // se tiver mais de um item igual ele removerá um dos itens
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1); // remove o objeto da lista atraves do index
        updateCartModal();
        
    }
}

// pegando endereço digitado no input
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        // removendo as classes de aviso
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

//verificações de carrinho vazio ou endereço vazio
checkoutBtn.addEventListener("click", function() {
    if (cart.length === 0) return; // se não tiver nada no carrinho ele não faz nada
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }
    

    
})


