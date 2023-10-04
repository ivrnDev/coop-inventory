require('dotenv').config();
const express = require('express')
const productRouter = require('./routes/products.router');
const customersRouter = require('./routes/customers.router');
const ordersRouter = require('./routes/orders.router');
const albumsRouter = require('./routes/albums.router');
const transactionsRouter = require('./routes/transactions.router');
const bannersRouter = require('./routes/banners.router');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:5000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/banners', bannersRouter);



app.listen(process.env.PORT, () => console.log(`Server is up, Listening to port ${process.env.PORT}`));

