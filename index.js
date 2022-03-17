const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT||5000;


app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bttmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const database = client.db("daktar_portal")
        const  appointmentsCollection = database.collection('appointments') ;

       
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Daktar Khana!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})














 // users : get => app.get("/users") : sob user ke nite parbo 
        // users:post => app.post("/users") : ekta user ke post korbo 
        // users :get:id => app.get("/users/:id") : ek user ke nibo / add korbo database e 
        // users:delete:id=> app.delete("/users/:id") : ekta user ke delete korbo 
        // users:put:id => app.put("users/:id"): ekta user ke update korbo 