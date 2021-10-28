const express = require('express');
const cors =require('cors');
require('dotenv').config();

const homeRoute = require("./router");

const {graphqlHTTP}  =require('express-graphql');
const schema = require('./Schema/schema.js');
const mongoose=require('mongoose');



const app = express();


//allow cross origin requests 
app.use(cors());
//connect to mlab database

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true},{ useUnifiedTopology: true });
mongoose.connection.once('open',()=>{
            console.log("live on connection mongodb")
});

app.use("/", homeRoute);

//setting midleware on graphql endpoint 
app.use('/graphql',graphqlHTTP({
            schema:schema,
            graphiql:true
}));

const port = process.env.PORT || 4000;

app.listen(port,()=>{ console.log("Hi i m server god i m listening for u r requests");
});