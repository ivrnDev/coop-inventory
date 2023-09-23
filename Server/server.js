require('dotenv').config();
const express = require('express') 
const productRouter = require('./src/routes/products.router.js');
const ordersRouter = require('./src/routes/orders.router.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter);
app.use('/api/orders', ordersRouter);


app.listen(process.env.PORT, () => console.log(`Server is up, Listening to port ${process.env.PORT}`));

