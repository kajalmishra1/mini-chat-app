const mongoose = require("mongoose");
const Chat= require('./models/chat.js');

async function main(){
    return await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
} 

main().then((res)=>{
    console.log("Connection successful");
})
.catch((err)=>{
    console.log(err);
})


let allChats=([
    {
    from:"neha",
    to:"kajal",
    msg:"hello wtsup",
    created_at: new Date()
},
{
    from: "rahul",
    to: "kajal",
    msg: "Hey Kajal, are you free today?",
    created_at: new Date()
  },
  {
    from: "kajal",
    to: "rahul",
    msg: "Yes, what's up?",
    created_at: new Date()
  },
  {
    from: "rahul",
    to: "kajal",
    msg: "I need some help with my MongoDB project",
    created_at: new Date()
  },
  {
    from: "kajal",
    to: "rahul",
    msg: "Sure! Tell me what the issue is",
    created_at: new Date()
  },
  {
    from: "rahul",
    to: "kajal",
    msg: "I am confused about Mongoose schemas",
    created_at: new Date()
  },
  {
    from: "kajal",
    to: "rahul",
    msg: "Don't worry, I will explain it to you",
    created_at: new Date()
  },
  {
    from: "rahul",
    to: "kajal",
    msg: "Thanks! You are a lifesaver",
    created_at: new Date()
  },
  {
    from: "kajal",
    to: "rahul",
    msg: "Haha, anytime!",
    created_at: new Date()
  }

])

Chat.insertMany(allChats);





// chat1.save().then((res)=>{
//     console.log(res);
//     console.log("Chat saved");
    
// })
// .catch((err)=>{
//     console.log(err);
// })