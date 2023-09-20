require('dotenv').config();
const express = require('express') 
const router = require('./src/routes/products.router.js')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use('/api/products', router);


app.listen(process.env.PORT, () => console.log(`Server is up, Listening to port ${process.env.PORT}`));

