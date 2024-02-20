const phones = require("../phones.json");
const fs = require("fs/promises");
function getAll() {
  return phones;
}
function getById(id) {
  let phone = phones.find((p) => p.id == id);
  return phone;
}
async function create(phone) {
  phones.push({ ...phone, id: Math.random() * 9000 + 1000 });

  const file = await fs.writeFile("./phones.json", JSON.stringify(phones));
  return phone;
}

async function update(id, data) {
  let phone = getById(id);
  if (!phone) {
    throw new Error("phone not found");
  }
  let updatedPhone = { ...phone, ...data };
  let index = phones.indexOf(phone);
  phones[index] = updatedPhone;
  await fs.writeFile("./phones.json", JSON.stringify(phones));
  return updatedPhone;
}
//! function to delete a phone by Id
async function remove(id) {
  const index = phones.findIndex((phone) => phone.id == id);
  if (index == -1) {
    throw new Error("phone does not exist");
  }
  phones.splice(index, 1);
  await fs.writeFile("./phones.json", JSON.stringify(phones));
  return phones;
}
module.exports = { getAll, create, getById, update, remove };
