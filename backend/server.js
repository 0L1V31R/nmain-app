import express from 'express';
import data from './data.js';

const app = express();

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

app.get('/', (req, res) => {
    res.send('Server is ready');
});

// eslint-disable-next-line no-undef
const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});