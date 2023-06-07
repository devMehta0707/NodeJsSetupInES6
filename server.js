//IMPORTING REQUIRED MODULES / PACKAGES

import 'dotenv/config';
import express from 'express';
import './dbConnection/connection.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/routes.js';

// INITIALIZING EXPRESS

const app = express();
const port = process.env.PORT || 3000;

// USING REQUIRED MIDDLEWARES

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',routes);
app.use(errorHandler)

// LISTENING ON PORT FUNCTION

app.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
});
