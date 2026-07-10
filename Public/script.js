let cart = JSON.parse(localStorage.getItem("fb_cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(name, price){
  cart.push({name, price});
  total += price;
  localStorage.setItem("fb_cart", JSON.stringify(cart));
  displayCart();
}

function displayCart(){
  let html = "";
  cart.forEach(item => {
    html += `<p>${item.name} - GHS ${item.price}</p>`;
  });
  document.getElementById("cart").innerHTML = html;
  document.getElementById("total").innerText = total;
}

async function placeOrder(){
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if(!name){ return alert("Please enter your full name"); }
  if(!phone || phone.length < 10){ return alert("Please enter a valid phone number"); }
  if(!address){ return alert("Please enter your delivery address"); }
  if(cart.length === 0){ return alert("Your cart is empty"); }

  const btn = document.querySelector("button[onclick='placeOrder()']");
  btn.disabled = true;
  btn.innerText = "Placing Order...";

  try {
    const res = await fetch("/api/order", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ name, phone, address, items: cart, total })
    });

    const data = await res.json();
    localStorage.removeItem("fb_cart");
    alert("Order placed! Tracking ID: " + data.trackingId);
    location.reload();
  } catch(err) {
    alert("Something went wrong. Please try again.");
    btn.disabled = false;
    btn.innerText = "Place Order";
  }
}

// Load cart on page init
displayCart();
