const express = require("express");
const app = express();
const fs = require('fs');
const phones = require("./phones.json");

app.use(express.json());

app.get("/phones",(req,res)=>{
     res.json(phones)
})
app.post("/phones",(req,res)=>{
     const newProduct = req.body;
     phones.push(newProduct)

     
     fs.writeFile('./phones.json', JSON.stringify(phones) ,(err) => {
      if (err) {
        res.status(500).json({ message: "An Error Has Accured"})
      } else {
        res.json(newProduct)
      }
     })
})

app.put("/phones/:id",(req,res)=>{
  let target = phones.find(p => p.id == req.params.id);
  if(!target){
    res.status(404).json({message : "Not found"})
    return;
  } 
  let newPhone = {...target ,...req.body};
  let index = phones.indexOf(target);
  phones[index] = newPhone ;
  fs.writeFile('./phones.json', JSON.stringify(phones) ,(err) => {
    if (err) {
      res.status(500).json({ message: "An Error Has Accured"})
    } else {
      res.json(phones)
    }
   })

})
app.get("/phones/:id",(req,res)=>{
  let id = parseInt(req.params.id);
  const phone = phones.find(product => product.id === id  );
  res.json(phone);
})

app.delete("/phones/:id" , (req,res)=>{
  let id = parseInt(req.params.id);
  const phone = phones.find(product => product.id === id  );
  if(!phone){
    res.status(404).json({message:"NOT FOUND"});
    return;
  }
  let index = phones.findIndex(p => p.id == id);
  phones.splice(index,1);
  fs.writeFile('./phones.json', JSON.stringify(phones) ,(err) => {
    if (err) {
      res.status(500).json({ message: "An Error Has Accured"})
    } else {
      res.json(phones)
    }})
})



app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
