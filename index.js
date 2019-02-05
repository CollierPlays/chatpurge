let Discord = require("discord.js");  // Imports the Discord.js npm package.
let client = new Discord.Client();  // Declares the client
let config = require("./config.json");  // Imports the config file

client.on("message", message => { // Listens for a message
  if (message.content !== config.command) return; // Checks if the message is the set command.
  let user = message.mentions.users.first();
  // Parse Amount
  let amount = 9999999 // How many messages to delete, that should be enough..
    ? parseInt(message.content.split(" ")[1])
    : parseInt(message.content.split(" ")[2]);

  message.channel 
    .fetchMessages({  // Gets the messages.
      limit: 100
    })
    .then(messages => {
      if (user) {
        let filter = user ? user.id : client.user.id; 
        messages = messages
          .filter(m => m.author.id === filter)
          .array()
          .slice(0, amount);
      }
      message.channel
        .bulkDelete(messages) // Purge the messages
        .catch(error => console.log(error.stack));  // Catch and log any errors that occur.
    });
});

client.login(config.token); // Login
