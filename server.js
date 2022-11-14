const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const port =3000;
const app =express();
//db connect 
mongoose.connect('mongodb+srv://kabil:kabil1996@cluster0.tdwut.mongodb.net/kabil?retryWrites=true&w=majority');

//Create new model

const User = mongoose.model("users",{
    name:String,
    age:Number,
    mail:String,
    contact:Number
});

app.use(bodyParser.urlencoded({extended:true}));
//get html
app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
app.post("/add",(req,res)=>{
    const user = new User({
        name:req.body.name,
        age:req.body.age,
        mail:req.body.mail,
        contact:req.body.contact
    });
    user.save().then(()=>{
        res.send("data")
    }).catch((err)=>{
        res.send(err)
    })
});
app.post("/updt",(req,res)=>{
    User.findByIdAndUpdate(
    {
        _id:req.body.id
    },
    {
        name:req.body.name,
        age:req.body.age,
        mail:req.body.mail,
        contact:req.body.contact
    },
    {
        new:true
    }
    ).then((result)=>{
        res.send("data updated ")
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    });
});

app.listen(port,()=>{
    console.log("server has been started "+port);
});