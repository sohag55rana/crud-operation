const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MONGODB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nfv3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const crudCollection = client.db("crudOperation").collection("crud")


        // post
        app.post("/addProduct", async (req, res) => {
            // console.log(req.body);
            const result = await crudCollection.insertOne(req.body);
            // console.log(result);
            res.send(result)
        })

        // get যখন প্রোডাক্ট এড করা হবে তখন এই get 
        app.get("/myProducts/:email", async (req, res) => {
            // console.log(req.params.email);
            const result = await crudCollection.find({ email: req.params.email }).toArray();
            res.send(result)
        })

        app.get("/singleProduct/:id", async (req, res) => {
            // console.log(req.params.id, "iddd");
            const result = await crudCollection.findOne({ _id: new ObjectId(req.params.id) })
            // console.log(result);
            res.send(result)
        })

        app.put("/updateProduct/:id", async (req, res) => {
            console.log(req.params.id);
            const query = { _id: new ObjectId(req.params.id) }
            const data = {
                $set: {
                    name: req.body.name,
                    image: req.body.image,
                    item: req.body.item,
                    category: req.body.category,
                    description: req.body.description,
                    price: req.body.price,
                    rating: req.body.rating,
                    customization: req.body.customization,
                    delivery: req.body.delivery,
                    quantity: req.body.quantity,
                    email: req.body.email,
                }
            }
            const result = await crudCollection.updateOne(query, data);
            console.log(result);
            res.send(result);
        })

        app.delete("/delete/:id", async (req, res) => {
            const result = await crudCollection.deleteOne({ _id: new ObjectId(req.params.id) })
            console.log(result);
            res.send(result);
        })


        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('curd operation working!')
})

app.listen(port, () => {
    console.log(`crud opersation working on 5000 post ${port}`)
})