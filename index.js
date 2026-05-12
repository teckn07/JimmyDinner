import  { menuArray } from './data.js'


let itemsarry = []
let totalpricearry = []


function getMenuItem()
{
let menuHtml = ``

menuArray.forEach(function(item){
    menuHtml += 
    `
    <ul class="Menu">
        <div class="menu-outter">
            <p id="menu-emote">${item.emoji}</p>
            <div id="menuitem-${item.id}">
                <h3>${item.name}</h3>
                <p>${item.ingredients}</p>
                <p>$${item.price}</p>
            </div>
            <button id="addbtn-${item.id}" style="background-image: url(./images/Ellipse.png);
                margin: auto 0 auto auto;
                height: 50px;
                width: 50px;
                border: none;
                background-color: transparent;
                display: grid;
                place-content: center;
                font-size: 30px;">+</button>           
            </div>
        </div>
    </ul>
    `
})
    return menuHtml
}

function getCartItem()
{
let menuHtml = ``

menuArray.forEach(function(item){
    if(item.cartadd == true)
    {
    menuHtml += 
    `
        <div class="cart-menu-outter">
                <h3>${item.name}<button id="removebtn-${item.id}" style="background-color: transparent;
                border: none;
                ">remove</button></h3>

                <p id="priceqtylabel">$${item.price} QTY:${item.quantity}</p>
                    
        </div>
    </div>
    `
    itemsarry.push(item)
    }

})
    return menuHtml
}
function getTotalCartPrice(){
    let totalcartprice = 0
    let totalHtml = ``
    menuArray.forEach(function(item)
    {
    totalcartprice += item.price * item.quantity
      totalHtml = `
      <div>
      Total Price:
      </div>
      <div>
      $${totalcartprice}
      </div>
      `  
    })
    return totalHtml
}

function addOrderItem(name)
{
     menuArray.forEach(function(item){
        if(name === item.name)
        {
            item.cartadd = true
            item.quantity++
        }
     })
}


function removeOrderItem(name)
{
     menuArray.forEach(function(item){
        if(name === item.name)
        {
            item.cartadd = false
            item.quantity = 0
            console.log(item.name + item.cartadd + item.quantity)
            const itemToRemove = item;
            const newArray = itemsarry.filter(item => item !== itemToRemove);
            itemsarry = newArray;
        }
     })
}


function render()
{
    document.getElementById('menuout').innerHTML = getMenuItem()
    document.getElementById('orderinfo').innerHTML = getCartItem()
    document.getElementById('totalPrice').innerHTML = getTotalCartPrice()
    //#region working on local storage
    // if (document.getElementById('orderinfo').innerHTML)
    // {
    // localStorage.setItem("myCart", document.getElementById('orderinfo').innerHTML);
    // localStorage.setItem("myPrice", document.getElementById('totalPrice').innerHTML);
    // }
    // if(!document.getElementById('orderinfo').innerHTML)
    // {
    // document.getElementById('orderinfo').innerHTML = localStorage.getItem("myCart");
    // document.getElementById('totalPrice').innerHTML = localStorage.getItem("myPrice");
    // }
    //#endregion
    if(itemsarry.length)
    {
        document.getElementById('order').classList.remove('hidden')
        document.getElementById('purchasebtn').classList.remove('hidden')
        document.getElementById('totalPrice').classList.remove('hidden')
    }
    else if(itemsarry.length === 0)
    {
        document.getElementById('order').classList.add('hidden')
        document.getElementById('purchasebtn').classList.add('hidden')
        document.getElementById('totalPrice').classList.add('hidden')
    }
}

render()

const container = document.querySelector('.container')
const modal = document.getElementById('modal')

container.addEventListener('click', function(e){
    console.log(e)
    if(e.target.id)
    {
        menuArray.forEach(function(item){
        if (e.target.id === "addbtn-" + item.id)
        {
            addOrderItem(item.name)
            render()
        }
        if (e.target.id === "removebtn-" + item.id)
        {
            removeOrderItem(item.name)
            render()
        }})
        
        if (e.target.id === "purchasebtn")
            {
            modal.style.display = 'inline'
            }
    }
})
modal.addEventListener('click', function(e){
    console.log(e)
    if(e.target.id)
    {
            if (e.target.id === "modal-close-btn")
            {
            modal.style.display = 'none'
            }
    }
})
modal.addEventListener('submit', function(e){
    console.log(e)
    e.preventDefault();
    modal.style.display = 'none'
    })