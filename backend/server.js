import express from 'express';
import mongoose from 'mongoose';
import orderRouter from './routers/orderRouter.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// eslint-disable-next-line no-undef
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    // eslint-disable-next-line no-undef
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
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