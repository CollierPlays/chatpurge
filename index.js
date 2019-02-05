let Discord = require("discord.js");
let client = new Discord.Client();
let config = require("./config.json");
let package = require("./package.json");

console.log(`Logged in as ${client.user.tag} With version ${package.version}`);
client.on("message", message => {
  if (message.content !== config.command) return;
  let user = message.mentions.users.first();
  // Parse Amount
  let amount = 9999999
    ? parseInt(message.content.split(" ")[1])
    : parseInt(message.content.split(" ")[2]);

  message.channel
    .fetchMessages({
      limit: 100
    })
    .then(messages => {
      if (user) {
        let filterBy = user ? user.id : client.user.id;
        messages = messages
          .filter(m => m.author.id === filterBy)
          .array()
          .slice(0, amount);
      }
      message.channel
        .bulkDelete(messages)
        .catch(error => console.log(error.stack));
    });
});

client.login(config.token);
