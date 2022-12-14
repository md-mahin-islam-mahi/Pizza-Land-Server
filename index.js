const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running')
})

//!mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4lqljgn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const pizzaCollection = client.db('pizzaDB').collection('pizzas');
        app.get('/pizza', async(req, res) => {
            const query = {};
            const cursor = pizzaCollection.find(query);
            const pizzas = await cursor.toArray();
            const count =await pizzaCollection.estimatedDocumentCount();
            res.send({count, pizzas});
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})