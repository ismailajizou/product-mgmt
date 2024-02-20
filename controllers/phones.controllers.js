const Phone = require("../models/phone.model");

function getAll(req, res) {
  res.json(Phone.getAll());
}

function getById(req, res) {
  let id = parseInt(req.params.id);
  const phone = Phone.getById(id);
  if (!phone) {
    res.status(404).json({ message: "not found" });
    return;
  }
  res.json(phone);
}
async function create(req, res) {
  let newphone = req.body;
  if (!newphone.name || !newphone.price || !newphone.quantity) {
    res.status(413).json({ message: "not found" });
    return;
  }
  if (newphone.price < 100) {
    res.status(400).json({ message: "not found" });
    return;
  }
  
  const result = await Phone.create({
    name: newphone.name,
    price: newphone.price,
    quantity: newphone.quantity,
  });

  res.json(result);
}
