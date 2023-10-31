import express from 'express';


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/shipment', (req, res) => {
    /* Implementar un método que cree un shipment en la base de datos */
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});