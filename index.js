const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT||5000;

// midddleware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bttmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const database = client.db("daktar_portal")
        const  appointmentsCollection = database.collection('appointments') ;
        const usersCollection = database.collection('users');

        app.post("/appointments",async(req,res)=>{
          const appointment = req.body;
          const result = await appointmentsCollection.insertOne(appointment);
          console.log(result);
          res.json(result)
        });

        app.get('/appointments',async(req,res)=>{
          const email = req.query.email;
          const date = new Date( req.query.date).toLocaleDateString();
          console.log(date);
          const quary = {email:email, date:date}
          // console.log(quary);
          const cursor = appointmentsCollection.find(quary);
          const appointments = await cursor.toArray();
          res.json(appointments);
        })

        //for users
        app.post('/users',async(req,res)=>{
          const user = req.body;
          const result = await usersCollection.insertOne(user);
          res.json(result)
        })

        // update-insert (upsert)
        app.put("/users",async(req,res)=>{
          const user = req.body;
          console.log('put',user)
          const filter = {email: user.email}
          const options= {upsert:true};
          const updateDoc = {$set:user};
          const result = await usersCollection.updateOne(filter,updateDoc,options);
          res.json(result);
        })

       
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