const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require("cors");
const app = express()
require('dotenv').config()


const port = process.env.PORT || 5500;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d5s5i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("grand-prix");
        const productCollection = database.collection("products");
        app.get("/", (req, res) => {
            console.log('object')
            res.send("Hello World!!!");
        })

        // insert many data 

        // app.post('/products', async (req, res) => {
        //     const products = req.body;
        //     console.log(products)
        //     const sendProducts = await productCollection.insertMany(products)
        //     res.send(sendProducts)
        // })

        // get products data

        app.get('/products', async (req, res) => {
            const products = productCollection.find({})
            const productsArray = await products.toArray()
            res.send(productsArray)
        })

        // get single Products data

        app.get("/products/:key", async (req, res) => {
            const key = req.params.key;
            const productKey = await productCollection.findOne({ key })
            console.log(productKey)
            res.send(productKey)
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`This app is listing the http://localhost:${port}`)
})