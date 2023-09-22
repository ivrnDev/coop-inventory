require('dotenv').config();
const express = require('express') 
const productRouter = require('./src/routes/products.router.js');
const customerRouter = require('./src/routes/customer.router.js');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use('/api/products', productRouter);
app.use('/api/customers', customerRouter);


app.listen(process.env.PORT, () => console.log(`Server is up, Listening to port ${process.env.PORT}`));

