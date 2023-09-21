const productList = document.querySelector('.product-list');

let isServerUp = true;

async function getProductList() {
  const res = await fetch('http://localhost:3000/api/products');
  const {result} = await res.json();
  
  
  result.map(product => {
    const list = document.createElement('li')
    list.innerHTML = `
    <h1>${product.name}<h1>
    <h1>${product.price}<h1>
    <h1>${product.stocks}<h1>
    <button>${product.variants}</button>
    <button>ADD TO CART</button>
    <button>BUY</button>
    <img src="data:image/png;base64,${product.images}" alt="${product.name}" width = "300"></img>
    `
    productList.append(list)
  })


}



getProductList();