require('dotenv').config();
const express = require('express') 
const router = require('./routes/products.router.js'
) 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/products', router);


app.listen(process.env.PORT, () => console.log(`Server is up, Listening to port ${process.env.PORT}`));

