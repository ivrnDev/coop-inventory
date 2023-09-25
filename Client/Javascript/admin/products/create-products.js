//Create Products

document.querySelector('.create-submit').addEventListener('click', function createProduct(e) {
  const formUpdate = document.querySelector('#form-create')
  e.preventDefault();
  
  const formData = new FormData(formUpdate)
  console.log(formData)
  fetch(`http://localhost:3000/api/products`, {
    method: 'POST',
    body: formData,   
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
})


