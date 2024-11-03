// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the CUI menu
    function toggleMenu() {
        const menu = document.getElementById('cui-menu');
        if (menu) {
            menu.classList.toggle('active');
        }
    }

    // Function to change the theme
    function changeTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);
    }

    // Function to change font size
    function changeFontSize(size) {
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        document.body.classList.add(`font-${size}`);
    }

    // Function to change layout
    function changeLayout(layout) {
        document.body.classList.remove('layout-grid', 'layout-list');
        document.body.classList.add(`layout-${layout}`);
    }

    // Event listener for the Menu button
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    // Event listeners for theme, font size, and layout options
    const themeButtons = document.querySelectorAll('[data-theme]');
    themeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const theme = event.target.getAttribute('data-theme');
            changeTheme(theme);
        });
    });

    const fontSizeButtons = document.querySelectorAll('[data-font-size]');
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const size = event.target.getAttribute('data-font-size');
            changeFontSize(size);
        });
    });

    const layoutButtons = document.querySelectorAll('[data-layout]');
    layoutButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const layout = event.target.getAttribute('data-layout');
            changeLayout(layout);
        });
    });

    // Event listener for the Close button in the CUI menu
    const closeButton = document.getElementById('close-menu');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const cuiMenu = document.getElementById('cui-menu');
            if (cuiMenu) {
                cuiMenu.classList.remove('active');
            }
        });
    }

    // Hide CUI menu when clicking outside
    document.addEventListener('click', (event) => {
        const cuiMenu = document.getElementById('cui-menu');
        const menuButton = document.getElementById('menu-button');

        if (cuiMenu && menuButton && !cuiMenu.contains(event.target) && !menuButton.contains(event.target)) {
            cuiMenu.classList.remove('active');
        }
    });

    // Function to handle seller registration
    async function registerSeller(event) {
        event.preventDefault();
        const name = document.getElementById('seller-name')?.value;
        const email = document.getElementById('seller-email')?.value;
        const password = document.getElementById('seller-password')?.value;

        if (name && email && password) {
            try {
                const response = await fetch('/api/register-seller', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const result = await response.json();
                alert(result.message);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    // Function to handle product listing
    async function addProduct(event) {
        event.preventDefault();
        const name = document.getElementById('product-name')?.value;
        const description = document.getElementById('product-description')?.value;
        const price = parseFloat(document.getElementById('product-price')?.value);
        const image = document.getElementById('product-image')?.value;
        const sellerId = document.getElementById('seller-id')?.value;

        if (name && description && price && image && sellerId) {
            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sellerId, name, description, price, image })
                });
                const result = await response.json();
                alert(result.message);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    // Add event listeners to forms
    const registerForm = document.getElementById('register-seller-form');
    if (registerForm) {
        registerForm.addEventListener('submit', registerSeller);
    }

    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', addProduct);
    }

    // Function to load and display products
    const loadProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();
            const productList = document.getElementById('product-list');

            if (productList) {
                products.forEach((product) => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';

                    productDiv.innerHTML = `
                        <h3>${product.name}</h3>
                        <img src="${product.image}" alt="${product.name}" />
                        <p>${product.description}</p>
                        <p>$${product.price.toFixed(2)}</p>
                        <button>Add to Cart</button>
                    `;

                    productList.appendChild(productDiv);
                });
            }
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };
    let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Initial call to show the first slide
showSlide(currentSlide);


    // Load products when the DOM is fully loaded
    loadProducts();
});
