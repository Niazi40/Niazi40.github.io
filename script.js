
let prices = [2, 3, 4];


let shippingPrices = {
  truck: 5,
  plane: 15,
  snail: 2
};


let updateBtn = document.querySelector("#updateBtn");
let shippingSelect = document.querySelector("#shipping");
let promoInput = document.querySelector("#promo");
let message = document.querySelector("#message");
let shippingImg = document.querySelector("#shippingImg");


updateBtn.addEventListener("click", updateCart);
shippingSelect.addEventListener("change", updateShippingImage);
promoInput.addEventListener("input", updateCart);


let qtyInputs = document.querySelectorAll("input[type='number']");
for (let i = 0; i < qtyInputs.length; i++) {
  qtyInputs[i].addEventListener("input", function () {
    if (this.value < 0) {
      this.value = 0;
    }
    updateCart();
  });
}


function updateShippingImage() {
  let method = shippingSelect.value;

  if (method === "truck") {
    shippingImg.src = "img/pic.jpeg";
  } else if (method === "plane") {
    shippingImg.src = "img/plane.jpeg";
  } else {
    shippingImg.src = "img/pic.jpeg";
  }

  updateCart(); 
}

function updateCart() {
  let subtotal = 0;

 
  for (let i = 0; i < prices.length; i++) {
    let qty = parseInt(document.querySelector("#qty" + i).value);
    if (isNaN(qty)) {
      qty = 0;
    }
    subtotal += qty * prices[i];
  }


  let tax = subtotal * 0.10;

  let shippingMethod = shippingSelect.value;
  let shippingCost = shippingPrices[shippingMethod];


  let promo = promoInput.value.trim().toUpperCase();
  let discount = 0;

  if (promo === "SAVE10") {
    discount = subtotal * 0.10;
    message.textContent = "Promo code applied!";
    message.style.color = "green";
  } else if (promo === "") {
    message.textContent = "";
  } else {
    message.textContent = "Invalid promo code";
    message.style.color = "red";
  }

 
  let total = subtotal + tax + shippingCost - discount;


  document.querySelector("#subtotal").textContent = subtotal.toFixed(2);
  document.querySelector("#tax").textContent = tax.toFixed(2);
  document.querySelector("#shippingCost").textContent = shippingCost.toFixed(2);
  document.querySelector("#discount").textContent = discount.toFixed(2);
  document.querySelector("#total").textContent = total.toFixed(2);
}

updateShippingImage();
updateCart();