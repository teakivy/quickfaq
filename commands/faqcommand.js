const faq = require("../JSON/faq.json");
const Discord = require("discord.js");

module.exports = {
  name: "faqcommand",
  description: "Simpler FAQ Command",
  execute(message, args) {
    var guildID = message.guild.id;
    const qargs = args;

    if (faq[guildID].questions[qargs]) {
      message.channel.send(FAQ(qargs, message));
    } else {
      message.channel.send(
        FAQPassMessage(message, "x", "Error!", "Unknown FAQ Tag!")
      );
    }
  },
};

function FAQ(tag, message) {
  var guildID = message.guild.id;
  const faqEmbed = new Discord.MessageEmbed()
    .setColor(faq[guildID].color)
    .setTitle(`**${faq[guildID].questions[tag]}**`)
    .setDescription(`${faq[guildID].answers[tag]}`)
    .setFooter(
      `Command: -${tag}`,
      "https://cdn.discordapp.com/avatars/771847323894415362/d367e432241fcd2ddf884a85aa2d69a1.webp?size=128"
    );
  return faqEmbed;
}

function FAQPassMessage(message, type, title, description) {
  var guildID = message.guild.id;
  var embedColor = faq[guildID].color;
  if (type === "x") {
    embedColor = "#ff6358";
  } else if (type === "s") {
    embedColor = "#3ad282";
  } else {
    embedColor = faq[guildID].color;
  }

  const faqEmbed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle(`**${title}**`)
    .setDescription(`${description}`);
  return faqEmbed;
}
