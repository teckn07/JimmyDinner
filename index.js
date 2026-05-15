import  { menuArray } from './data.js'


let itemsArry = []
let totalPriceArry = []
let localStroageSave = []

// Gets menu items from menuArry in data.js and add this to the ul menu
function getMenuItem()
{
let menuHtml = ``

menuArray.forEach(function(item){
    menuHtml += 
    `
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
    `
})
    return menuHtml
}
// Gets Cart Items from menuArry by checking if cartadd = true and add the items to cart-menu-outter div
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
                `
                itemsArry.push(item)
                }

            })

    return menuHtml
}

// Add the total of all items in cart and add them in the totalPrice Div innerhtml
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

// Marks cart add true and add to the qauntity in menuArray.
function addOrderItem(name)
{
     menuArray.forEach(function(item){
        if(name === item.name)
        {
            item.cartadd = true
            item.quantity++
            localStroageSave.push(item)
        }
     })
     menuSave(localStroageSave)
}

// Removes the item from cart by setting cart add to false and setting qaunity to 0
function removeOrderItem(name)
{
     menuArray.forEach(function(item){
        if(name === item.name)
        {
            item.cartadd = false
            item.quantity = 0
            console.log(item.name + item.cartadd + item.quantity)
            const itemToRemove = item;
            const newArray = itemsArry.filter(item => item !== itemToRemove);
            itemsArry = newArray;
        }
     })
}
// When click pay in the pay modal it sets the orderdiv to the completediv
function completePayment(name)
{
    let completehtml = 
    `
    <div id="completediv">Thanks, ${name}! Your order is on its way</div>
    `
    return completehtml
}
// Renders the menu items, total price, and items in card from the fuctions above
function render()
{
    document.getElementById('menuout').innerHTML = getMenuItem()
    document.getElementById('orderinfo').innerHTML = getCartItem()
    document.getElementById('totalPrice').innerHTML = getTotalCartPrice()
    if(itemsArry.length)
    {
        document.getElementById('order').classList.remove('hidden')
        document.getElementById('purchasebtn').classList.remove('hidden')
        document.getElementById('totalPrice').classList.remove('hidden')
    }
    else if(itemsArry.length === 0)
    {
        document.getElementById('order').classList.add('hidden')
        document.getElementById('purchasebtn').classList.add('hidden')
        document.getElementById('totalPrice').classList.add('hidden')
    }
}

// Loads local store
function menuLoad(){
    const storedData = localStorage.getItem('savedData');
    const loadedArray = storedData ? JSON.parse(storedData) : [];
    return loadedArray
}
// Saves item in cart to local store
function menuSave(data){
    localStorage.setItem('savedData', JSON.stringify(data));
}
// Clears Storage data
function cleardata(){
    localStorage.clear();
}

render()
//cleardata()
console.log(menuLoad())

const container = document.querySelector('.container')
const modal = document.getElementById('modal')

//event listener for clicks from the + buttons and checks if they are clicking the right button also purchase button too.
container.addEventListener('click', function(e){
    console.log(e)
    if(e.target.id)
    {
        //Plus Button
        menuArray.forEach(function(item){
        if (e.target.id === "addbtn-" + item.id)
        {
            addOrderItem(item.name)
            render()
        }
        // Remove Button
        if (e.target.id === "removebtn-" + item.id)
        {
            removeOrderItem(item.name)
            render()
        }})
        // Complete Order Button
        if (e.target.id === "purchasebtn")
            {
            modal.style.display = 'inline'
            }
    }
})

//event listener for the model close button
modal.addEventListener('click', function(e){
    console.log(e)
    if(e.target.id)
    {
            if (e.target.id === "modal-close-btn")
            {
            modal.style.display = 'none'
            modal.fullName = ''
            }
    }
})

//listens for modal submit buttn when paid, it uses the completepayment fuction and reset the items 0 and writes a complete payment message
modal.addEventListener('submit', function(e){
    var x = document.getElementById("fullName").value;
    console.log(x)
    e.preventDefault();
    document.getElementById('orderinfo').innerHTML = completePayment(x)
    modal.style.display = 'none'
    document.getElementById('totalPrice').innerHTML = ``
    document.getElementById('order').classList.add('hidden')
    document.getElementById('purchasebtn').classList.add('hidden')
    document.getElementById('totalPrice').classList.add('hidden')
    document.getElementById("fullName").value = ''
    document.getElementById("cc-Number").value = ''
    document.getElementById("ccv-Number").value = ''
    })