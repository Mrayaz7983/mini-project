// Function to update cart count in the navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Update all cart count elements (desktop and mobile)
  const cartCountEls = document.querySelectorAll('#cart-count');
  cartCountEls.forEach(el => el.textContent = cart.length);
}

// Function to add item to cart
function addToCart(title, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ title, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));

  // SweetAlert2 Popup
  Swal.fire({
    icon: 'success',
    title: 'Added to Cart',
    text: `${title} has been added to your cart.`,
    showConfirmButton: false,
    timer: 1500
  });

  updateCartCount();
  displayCart();
}

// Delete item
function delElement(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Display cart
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  // Update cart count
  updateCartCount();

  if (cart.length === 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ 0.00";
    return;
  }

  document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class='cart-item'>
        <div class='row-img'>
          <img class='rowimg' src="${item.image}">
        </div>
        <p style='font-size:14px;'>${item.title}</p>
        <h2 style='font-size: 15px;'>$ ${item.price.toFixed(2)}</h2>
        <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
      </div>`;
  }).join('');

  document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
}

// Call updateCartCount and displayCart when page loads
window.onload = function() {
  updateCartCount();
  displayCart();
};

// Render products
const product = [
  { id: 0, image: 'images/gg-1.jpg', title: 'Z Flip Foldable Mobile', price: 120 },
  { id: 1, image: 'images/hh-2.jpg', title: 'Air Pods Pro', price: 60 },
  { id: 2, image: 'images/ee-3.jpg', title: '250D DSLR Camera', price: 230 },
  { id: 3, image: 'images/aa-1.jpg', title: 'Head Phones', price: 100 }
];

// Render products to page
document.getElementById('root').innerHTML = product.map((item, i) => {
  return `
    <div class='box'>
      <div class='img-box'>
        <img class='images' src="${item.image}">
      </div>
      <div class='bottom'>
        <p>${item.title}</p>
        <h2>$ ${item.price}.00</h2>
        <button onclick="addToCart('${item.title}', ${item.price}, '${item.image}')">Add to cart</button>
      </div>
    </div>`;
}).join('');
