import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';

const app = express();
// eslint-disable-next-line no-undef
const { DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@192.168.99.101:${DB_PORT}/${DB_NAME}?authSource=admin`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message:'Product not Found'});
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('Server is ready');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

// eslint-disable-next-line no-undef
const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});