const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log(contactsPath);

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
  try {
    const jsonReadContacts = await fs.readFile(contactsPath);
    
    return JSON.parse(jsonReadContacts);
  } catch (error) {
    console.log(error);
  }
};
// (async () => {
//     try {
//         const result = await listContacts();
//         console.log(result)
//     } catch (error) {
//         console.log('Error:', error.message)
//     }
// })

const getContactById = async (contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();
    const findContact = contacts.find((contact) => contact.id === contactId);
    return findContact || null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const removeContact = async (contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    let contacts = await listContacts();

    const removedContact = await contacts.find(
      (contacts) => contacts.id === contactId
    );
    if (removedContact) {
      contacts = contacts.filter((contact) => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    }
    return removedContact || null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const addContact = async (name, email, phone) => {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    // const jsonRead = await fs.readFile(contactsPath);
    const contacts = await listContacts();
    // const json = JSON.parse(jsonRead);
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
