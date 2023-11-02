import express from 'express';
import { createConnection } from 'mysql';
import bodyParser from 'body-parser';

const db = createConnection({
    host:"challenge-database.czhidwuuklzd.sa-east-1.rds.amazonaws.com",
    port:"3318",
    user:"pablo",
    password:"pablo",
    database:"humber",
    connectionLimit: 10
})

const app = express();
app.use(bodyParser.json());

function rndVarchar(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/products', (req, res) => {
    const q = `select * from products`;
    db.query(`select * from products`, (err, result, fields) => {
        if(err) return console.log(err);
        res.send(result);
    })
});

app.post('/shipment', (req, res) => {
    const { loadId, plate, truckerId } = req.body;
    const id = rndVarchar(24);
    const query = `INSERT INTO shipments (id, created_at, truck_id, trucker_id, status, load_id)
                    VALUES ('${id}', CURRENT_TIMESTAMP, (SELECT id FROM trucks WHERE plate = '${plate}'), ?, 'pending', ?)`;
    const values = [truckerId, loadId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating shipment');
        } else {
            res.status(200).send('Shipment created successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});