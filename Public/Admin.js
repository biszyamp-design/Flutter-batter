async function loadOrders(){
  const res = await fetch("/api/orders");
  const orders = await res.json();

  let html = "";
  orders.forEach(order=>{
    html += `
      <div>
        <p><b>${order.trackingId}</b> - ${order.name} - GHS ${order.total}</p>
        <p>Status: ${order.status}</p>
        <button onclick="updateStatus('${order.id}','Out for Delivery')">Out for Delivery</button>
        <button onclick="updateStatus('${order.id}','Delivered')">Delivered</button>
        <hr>
      </div>
    `;
  });

  document.getElementById("orders").innerHTML = html;
}

async function updateStatus(id, status){
  await fetch("/api/order/"+id,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({status})
  });
  loadOrders();
}

loadOrders();
