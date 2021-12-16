let modalQnt = 1
let modalKey = 0
let cart = []
const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)

pizzaJson.map((item, index) => {

    let pizzaItem = c('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        //preencher modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQnt = 1
        modalKey = key

        c('.pizzaBig img').src = pizzaJson[key].img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        //tamanhos
        c('.pizzaInfo--size.selected').classList.remove('selected')
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })
        //mostrar quantidade de pizza
        c('.pizzaInfo--qt').innerHTML = modalQnt

        //animação modal
        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 200)

        //colocar dados



    })
    //fechar modal
    c('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 0.1
            setTimeout(() => {
                c('.pizzaWindowArea').style.display = 'none'
            }, 200)

        }, 200)
    })

    //fechar modal mobile
    c('.pizzaInfo--cancelMobileButton').addEventListener('click', (e) => {
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 0.1
            setTimeout(() => {
                c('.pizzaWindowArea').style.display = 'none'
            }, 200)

        }, 200)
    })

    //marcar e desmarcar tamanho selecionado
    cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            c('.pizzaInfo--size.selected').classList.remove('selected')
            size.classList.add('selected')
        })
    })

    c('.pizza-area').append(pizzaItem)

})

//aumentar pizzas
c('.pizzaInfo--qtmais').addEventListener('click', (e) => {
    modalQnt++
    c('.pizzaInfo--qt').innerHTML = modalQnt

})
//diminuir pizzas
c('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
    if (modalQnt > 1) {
        modalQnt--
        c('.pizzaInfo--qt').innerHTML = modalQnt

    }
    else {
        alert('Impossivel diminuir mais')
    }
})

//adicionando ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {



    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id + '@' + size

    let key = cart.findIndex((item) => {
        return item.identifier == identifier
    })

    if (key > -1) {
        cart[key].qt += modalQnt
    }
    else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            qt: modalQnt,
            size: size
        })
    }


    //fechando
    setTimeout(() => {
        c('.pizzaWindowArea').style.opacity = 0.1
        setTimeout(() => {
            c('.pizzaWindowArea').style.display = 'none'
        }, 200)

    }, 200)

    //fechar modal mobile
    setTimeout(() => {
        c('.pizzaWindowArea').style.opacity = 0.1
        setTimeout(() => {
            c('.pizzaWindowArea').style.display = 'none'
        }, 200)

    }, 200)

    //atualizando
    updateCart()
})



c('.menu-openner').addEventListener('click', (e)=> {
    if(cart.length > 0)
    {
    c('aside').style.left = 0
    }
})

c('.menu-closer').addEventListener('click', (e)=> {

    c('aside').style.left = '100vw'
})












function updateCart() {
    c('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0) {
        c('aside').classList.add('show')

        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {


            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)

            subtotal += pizzaItem.price * cart[i].qt
            


            let cartItem = c('.models .cart--item').cloneNode(true)

            

            let pizzaItemSizeName
            switch (cart[i].size) {
                case 0:
                    pizzaItemSizeName = 'P'
                    break;

                case 1:
                    pizzaItemSizeName = 'M'
                    break;

                case 2:
                    pizzaItemSizeName = 'G'
                    break;
            }

            let pizzaName = `${pizzaItem.name} ${pizzaItemSizeName}`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
           
           
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',(e)=>
            {
                cart[i].qt++
                updateCart()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',(e)=>
            {
                if (cart[i].qt > 1) {
                    cart[i].qt--
                }
                else{
                    cart.splice(i,1)

                }
                updateCart()
            })



            c('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML =  `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML =  `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML =  `R$ ${total.toFixed(2)}`
    }
    else {
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'

    }
}
