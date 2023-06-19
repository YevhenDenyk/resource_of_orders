const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const fileUpload = require('express-fileupload');

const swaggerJson = require('./swagger.json');
const {config} = require("./configs");
const {usersRouter, commitsRouter, contractorsRouter, jobTypesRouter,locationsRouter,ordersRouter, authRouter} = require("./routers");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/commits', commitsRouter);
app.use('/contractors', contractorsRouter);
app.use('/jobTypes', jobTypesRouter);
app.use('/locations', locationsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

app.use('/docks', swaggerUi.serve, swaggerUi.setup(swaggerJson));


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    })
})

app.get('/', (req, res) => {
    console.log('Welcome')
})

const connect = async () => {
    let dbConnect = false
    console.log("Connecting to database...")

    while (!dbConnect) {
        try {
            await mongoose.connect(config.MONGO_URL);
            console.log("Database available");
            dbConnect = true;
        } catch (e) {
            console.log("Database unavailable, wait 3 second");
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}

const start = async ()=>{
    try {
        await connect()

        await app.listen(config.PORT, config.HOST);
        console.log(`Server listen port ${config.PORT}`);

    }catch (e) {
        console.error(e)
    }
}

start();
