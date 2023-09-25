const productList = document.querySelector('.product-list');

let isServerUp = true;

async function getProductList() {
  const res = await fetch('http://localhost:3000/api/products');
  const { result } = await res.json();
  if(!res.ok) {
    const addMsg = document.createElement('h1')
    addMsg.classList.add('MSG-error')
    addMsg.innerHTML = `
    NO AVAILABLE PRODUCTS
    `
    productList.append(addMsg)
  }

  console.log(result)

  
  
  
  

  result && result.map(product => {
    
    const list = document.createElement('div')
    list.classList.add('product-cards')
    list.innerHTML = `
    <img src="data:image/png;base64,${product.product_image}" alt="${product.product_name}" width = "300"></img>
    <h1>${product.display_name}<h1>
    <div class="product-info">   

      <h3>Price:          ${product.display_price}<h3>
      <h3>Stocks:         ${product.product_stocks}<h3>
    </div>
    <div class="product-order">
      <button>ADD TO CART</button>
      <button>BUY</button>
    </div>    
    `
    productList.append(list)
  })
}

getProductList();
