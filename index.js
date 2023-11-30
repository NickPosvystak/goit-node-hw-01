const contacts = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
     switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
         const contact = await contacts.getContactById(id);
         console.table(contact);
      break;

    case "add":
         const newContact = await contacts.addContact(name, email, phone)
         console.table(newContact);
      break;

    case "remove":
         const removedContact = await contacts.removeContact(id);
         console.table(removedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
  } catch (error) {
    console.log(error.message);
  }
 
};

invokeAction(argv);
