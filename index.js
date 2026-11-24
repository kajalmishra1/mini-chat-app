const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require("path");
const Chat= require('./models/chat.js');
const methodOverride = require('method-override');


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));




async function main(){
    return await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then((res)=>{
    console.log("Connection successful");
})
.catch((err)=>{
    console.log(err);
})



app.get("/chats",async (req,res)=>{
    let chats = await Chat.find().sort({created_at:-1});
   
  res.render("front.ejs",{chats});

})



app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})



app.post("/chats",(req,res)=>{
    let {From,To,msg}=req.body;
    let newChat = new Chat({
        from:From,
        to:To,
        msg:msg,
        created_at:new Date()
    })
    newChat.save().then((res)=>{
        console.log("chat was saved");

    }).catch((err)=>{
        console.log(err);
        
    })
    res.redirect('/chats');
})



app.get("/chats/:id/edit",async (req,res)=>{
    try{
    let {id}=req.params;
    let currChat = await Chat.findById(id);

    if(!currChat){
        return res.status(404).send("Chat not Found");
    }
    res.render("edit.ejs",{currChat});
}catch(err){
    res.status(400).send("Invalid Chat ID");
}
    
})



app.put("/chats/:id",async (req,res)=>{
    let {id}= req.params;
    let {msg: newmsg} = req.body;

    let updatedchat = await Chat.findByIdAndUpdate(
        id,
        {msg:newmsg},
        {runValidators:true,new : true}
    );

    console.log(updatedchat);
    res.redirect("/chats");
})


app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;

    let DeletedChat =  await Chat.findByIdAndDelete(id);

    console.log(DeletedChat);
    res.redirect("/chats");
})


app.listen(port,()=>{
    
    console.log("app is listening at port ",port);
})



