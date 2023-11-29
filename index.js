const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");



const testfunc = async () => {
    const allContacts = await listContacts();
    console.log(allContacts)
}
testfunc()