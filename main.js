// ------------------   ESSENTIALS   ------------------
const fs = require("fs");

const botToken = require("./JSON/botToken.json");
const config = require("./config.json");
const faq = require("./JSON/faq.json");
const Discord = require("discord.js");
const client = new Discord.Client();

// On Guild Join
client.on("guildCreate", (guild) => {
  console.log("Joined a new guild: " + guild.name);
  if (!faq[guild.id]) {
    faq[guild.id] = {
      color: "#4287f5",
      questions: {},
      answers: {},
    };
    fs.writeFile("./JSON/faq.json", JSON.stringify(faq), (err) => {
      if (err) console.log(err);
    });
  }
});

// On Startup
client.once("ready", () => {
  console.log("Quick FAQ Bot is Online!");
  client.user.setActivity("-faq help", { type: "WATCHING" });
});

// Command Handler
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//
// Message Handler
client.on("message", (message) => {
  // Command Setup
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Commands
  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  }

  if (command === "faq") {
    client.commands.get("faq").execute(message, args);
  }

  if (faq[message.guild.id].questions[command]) {
    client.commands.get("faqcommand").execute(message, command);
  }
});

client.login(botToken.token);
