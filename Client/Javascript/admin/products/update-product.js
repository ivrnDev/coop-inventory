document.querySelector('.update-submit').addEventListener('click', function updateProduct(e) {
const formUpdate = document.querySelector('#form-update')
  e.preventDefault();
  const id = parseInt(document.querySelector("#id").value); // Replace with the actual product ID
  const formData = new FormData(formUpdate)
  fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PATCH',
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


