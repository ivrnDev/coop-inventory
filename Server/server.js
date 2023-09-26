require('dotenv').config();
const express = require('express') 
const productRouter = require('./routes/products.router');
const customersRouter = require('./routes/customers.router');
const ordersRouter = require('./routes/orders.router');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use('/api/products', productRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customersRouter);



app.listen(process.env.PORT, () => console.log(`Server is up, Listening to port ${process.env.PORT}`));

