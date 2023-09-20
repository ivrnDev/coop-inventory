document.addEventListener('DOMContentLoaded', () => {
  const productList = document.querySelector('.product-list');
  let isServerUp = true;

  const displayInterval = setInterval(displayProducts, 5000);
  async function displayProducts() {
    if (!isServerUp) {
      clearInterval(displayInterval);
      console.error('Server is down. Fetching data has stopped.');
      return;
    };
    try {
      const res = await fetch('http://localhost:3000/api/products');
      if (!res.ok) {
        isServerUp = false;
        clearInterval(displayInterval);
        console.error('Internal Server Error');
        return;
      }
      const { result } = await res.json();
      productList.innerHTML = '';
      result.forEach(product => {
        const listitem = document.createElement('li');
        listitem.innerHTML = `
          <img src="data:image/png;base64,${product.images}" alt="${product.name}" width="100">
        `;
        productList.appendChild(listitem);
      });
    } catch (error) {
      isServerUp = false;
      console.error('Error fetching and displaying products:', error);
    }
  }
  displayProducts();
});
