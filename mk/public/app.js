const API_URL = 'http://localhost:3000/api';
let products = [];
let cart = [];
let selectedProduct = null;

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="showProductDetails('${product._id}')">
            <div class="product-image">👗</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function showProductDetails(id) {
    selectedProduct = products.find(p => p._id === id);
    document.getElementById('modal-title').textContent = selectedProduct.name;
    document.getElementById('modal-price').textContent = `$${selectedProduct.price.toFixed(2)}`;
    document.getElementById('modal-description').textContent = selectedProduct.description;
    
    const sizeSelect = document.getElementById('size-select');
    sizeSelect.innerHTML = selectedProduct.sizes.map(size => 
        `<option value="${size}">${size}</option>`
    ).join('');
    
    document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function addToCart() {
    const size = document.getElementById('size-select').value;
    const item = {
        productId: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: size,
        quantity: 1
    };
    
    const existing = cart.find(i => i.productId === item.productId && i.size === item.size);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(item);
    }
    
    updateCartCount();
    closeModal();
    alert('Added to cart!');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        displayCart();
        modal.style.display = 'block';
    }
}

function displayCart() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('cart-total').textContent = '0.00';
        return;
    }
    
    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <strong>${item.name}</strong> (${item.size})<br>
                $${item.price.toFixed(2)} x ${item.quantity}
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    toggleCart();
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

async function placeOrder(event) {
    event.preventDefault();
    
    const order = {
        customerName: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value,
        city: document.getElementById('customer-city').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        
        const result = await response.json();
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
        cart = [];
        updateCartCount();
        closeCheckout();
        document.getElementById('checkout-form').reset();
    } catch (error) {
        alert('Error placing order: ' + error.message);
    }
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

loadProducts();
