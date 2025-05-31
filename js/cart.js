// Call this on page load to update cart badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = cart.length);
}

// Call this to add a product to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// On page load, update cart count
document.addEventListener('DOMContentLoaded', updateCartCount);