// const pool = require("../../config/database.js");
// const service = {
  
//   getCustomers: () => {
//     return new Promise((resolve, reject) => {
//       pool.execute('SELECT * FROM customers', [], 
//       (error, result) => {
//         if(error) return reject({message: 'Internal Server Error', error: error});
//         if(result.length === 0) return reject({message: 'There is no existing customer'})
//         return resolve({message: 'Successfully get all customers', result: result});
//       }) 
//     })
//   }
// }

// module.exports = service;