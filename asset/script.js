// Simpan data produk ke localStorage (sementara)
let products = JSON.parse(localStorage.getItem('products')) || [];

// Tambah produk
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const imageFile = document.getElementById('productImage').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                id: Date.now(),
                name,
                price,
                image: e.target.result  // Convert gambar ke base64
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
        };
        reader.readAsDataURL(imageFile);
    }
});

// Hapus produk
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

// Tampilkan produk
function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top">
                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p>Rp ${product.price.toLocaleString()}</p>
                        <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Muat produk saat halaman dibuka
window.onload = loadProducts;