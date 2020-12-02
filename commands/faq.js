const faq = require("../JSON/faq.json");
const Discord = require("discord.js");
const fs = require("fs");

const FAQLimit = 25;

module.exports = {
  name: "faq",
  description: "FAQ!",
  execute(message, args) {
    var guildID = message.guild.id;
    if (args[0] === "admin") {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (args[1] === "add") {
          if (Object.keys(faq[guildID].questions).length > FAQLimit - 1) {
            message.channel.send(
              FAQPassMessage(
                message,
                "x",
                "Max FAQ Limit Reached!",
                `To save space you can have up to ${FAQLimit} FAQ Cards per server. \nPlease delete some or you cannot add this!`
              )
            );
          } else {
            if (args[2]) {
              if (faq[guildID].questions[args[2]]) {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "x",
                    "Error!",
                    `The tag \`${args[2]}\` already exists! \n\`-faq admin add <tag> %<question>% %<answer>%\``
                  )
                );
              } else if (
                args[2] === "admin" ||
                args[2] === "list" ||
                args[2] === "help"
              ) {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "x",
                    "Error!",
                    "Cannot name a FAQ Tag `admin`, `list`, or `help`!"
                  )
                );
              } else {
                const qargs = message.content.split(/%+/);
                if (qargs[3]) {
                  faq[guildID].questions[args[2]] = qargs[1];
                  faq[guildID].answers[args[2]] = qargs[3];
                  fs.writeFile(
                    "./JSON/faq.json",
                    JSON.stringify(faq),
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                  message.channel.send(
                    FAQPassMessage(
                      message,
                      "s",
                      "Sucess!",
                      `Added Tag: \`${args[2]}\` \n\nTag: \`${
                        args[2]
                      }\`\nQuestion: \`${
                        faq[guildID].questions[args[2]]
                      }\`\nAnswer: \`${faq[guildID].answers[args[2]]}\``
                    )
                  );
                } else {
                  message.channel.send(
                    FAQPassMessage(
                      message,
                      "x",
                      "Error!",
                      "Please Provide a question & answer! \n`-faq admin add <tag> %<question>% %<answer>%`"
                    )
                  );
                }
              }
            } else {
              message.channel.send(
                FAQPassMessage(
                  message,
                  "x",
                  "Error!",
                  "Please Provide an FAQ Tag! \n`-faq admin add <tag> %<question>% %<answer>%`"
                )
              );
            }
          }
        } else if (args[1] === "update") {
          if (args[2]) {
            if (faq[guildID].questions[args[2]]) {
              const qargs = message.content.split(/%+/);
              if (qargs[3]) {
                faq[guildID].questions[args[2]] = qargs[1];
                faq[guildID].answers[args[2]] = qargs[3];
                fs.writeFile("./JSON/faq.json", JSON.stringify(faq), (err) => {
                  if (err) console.log(err);
                });
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "s",
                    "Sucess!",
                    `Updated Tag: \`${args[2]}\` \n\nTag: \`${
                      args[2]
                    }\`\nQuestion: \`${
                      faq[guildID].questions[args[2]]
                    }\`\nAnswer: \`${faq[guildID].answers[args[2]]}\``
                  )
                );
              } else {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "x",
                    "Error!",
                    "Please Provide a question & answer! \n`-faq admin update <tag> %<question>% %<answer>%`"
                  )
                );
              }
            } else {
              message.channel.send(
                FAQPassMessage(
                  message,
                  "x",
                  "Error!",
                  `The tag \`${args[2]}\` does not exist! \n\`-faq admin update <tag> %<question>% %<answer>%\``
                )
              );
            }
          } else {
            message.channel.send(
              FAQPassMessage(
                message,
                "x",
                "Error!",
                "Please Provide an FAQ Tag! \n`-faq admin update <tag> %<question>% %<answer>%`"
              )
            );
          }
        } else if (args[1] === "set") {
          const qargs = message.content.split(/%+/);
          if (args[2] === "question" || args[2] === "q") {
            if (args[3]) {
              if (faq[guildID].questions[args[3]]) {
                if (qargs[1]) {
                  faq[guildID].questions[args[3]] = qargs[1];
                  fs.writeFile(
                    "./JSON/faq.json",
                    JSON.stringify(faq),
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                  message.channel.send(
                    FAQPassMessage(
                      message,
                      "s",
                      "Sucess!",
                      `Set Question of Tag: \`${args[3]}\` \n\nTag: \`${
                        args[3]
                      }\`\nQuestion: \`${
                        faq[guildID].questions[args[3]]
                      }\`\nAnswer: \`${faq[guildID].answers[args[3]]}\``
                    )
                  );
                } else {
                  message.channel.send(
                    FAQPassMessage(
                      message,
                      "x",
                      "Error!",
                      "Please Provide a Question! \n`-faq admin set question <tag> %<value>%`"
                    )
                  );
                }
              } else {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "x",
                    "Error!",
                    `The tag \`${args[3]}\` does not exist! \n\`-faq admin set question <tag> %<value>%\``
                  )
                );
              }
            } else {
              message.channel.send(
                FAQPassMessage(
                  message,
                  "x",
                  "Error!",
                  "Please Provide an FAQ Tag! \n`-faq admin set question <tag> %<value>%`"
                )
              );
            }
          } else if (args[2] === "answer" || args[2] === "a") {
            if (args[3]) {
              if (faq[guildID].questions[args[3]]) {
                if (qargs[1]) {
                  faq[guildID].answers[args[3]] = qargs[1];
                  fs.writeFile(
                    "./JSON/faq.json",
                    JSON.stringify(faq),
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                  message.channel.send(
                    FAQPassMessage(
                      message,
                      "s",
                      "Sucess!",
                      `Set Answer of Tag: \`${args[3]}\` \n\nTag: \`${
                        args[3]
                      }\`\nQuestion: \`${
                        faq[guildID].questions[args[3]]
                      }\`\nAnswer: \`${faq[guildID].answers[args[3]]}\``
                    )
                  );
                } else {
                  message.channel.send(
                    FAQPassMessage(
                      message,
                      "x",
                      "Error!",
                      "Please Provide an Answer! \n`-faq admin set answer <tag> %<value>%`"
                    )
                  );
                }
              } else {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "x",
                    "Error!",
                    `The tag ${args[3]} does not exist! \n\`-faq admin set answer <tag> %<value>%\``
                  )
                );
              }
            } else {
              message.channel.send(
                FAQPassMessage(
                  message,
                  "x",
                  "Error!",
                  "Please Provide an FAQ Tag! \n`-faq admin set answer <tag> %<value>%`"
                )
              );
            }
          } else {
            message.channel.send(
              FAQPassMessage(
                message,
                "x",
                "Error!",
                "Please Provide a Type! (question/answer) \n`-faq admin set <question/answer> <tag> %<value>%`"
              )
            );
          }
        } else if (args[1] === "delete") {
          if (args[2]) {
            if (faq[guildID].questions[args[2]]) {
              delete faq[guildID].questions[args[2]];
              delete faq[guildID].answers[args[2]];
              fs.writeFile("./JSON/faq.json", JSON.stringify(faq), (err) => {
                if (err) console.log(err);
              });
              if (faq[guildID].questions[args[2]]) {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "x",
                    "Error!",
                    "An unknown error occured, I was unable to delete tag. \n`-faq admin delete <tag>`"
                  )
                );
              } else {
                message.channel.send(
                  FAQPassMessage(
                    message,
                    "s",
                    "Sucess!",
                    `Deleted Tag: \`${args[2]}\``
                  )
                );
              }
            } else {
              message.channel.send(
                FAQPassMessage(
                  message,
                  "x",
                  "Error!",
                  `The tag \`${args[2]}\` does not exist! \n\`-faq admin delete <tag>\``
                )
              );
            }
          } else {
            message.channel.send(
              FAQPassMessage(
                message,
                "x",
                "Error!",
                "Please Provide an FAQ Tag! \n`-faq admin delete <tag>`"
              )
            );
          }
        } else if (args[1] === "color") {
          if (/^#[0-9A-F]{6}$/i.test(args[2])) {
            faq[guildID].color = args[2];
            fs.writeFile("./JSON/faq.json", JSON.stringify(faq), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(
              FAQPassMessage(
                message,
                "s",
                "Sucess!",
                `Changed Server FAQ Color to: \`${args[2]}\`\n Try an FAQ Command to test it out!`
              )
            );
          } else {
            message.channel.send(
              FAQPassMessage(
                message,
                "x",
                "Error!",
                `Invalid Color Code: \`${args[2]}\`! \n\`-faq admin color <HEX Code>\``
              )
            );
          }
        } else {
          message.channel.send(
            FAQPassMessage(
              message,
              "x",
              "Error!",
              "Unknown Admin Command! \n`-faq admin <add/update/set/delete/color>`"
            )
          );
        }
      } else {
        message.channel.send(
          FAQPassMessage(
            message,
            "x",
            "No Permissions!",
            "To use Quick FAQ Admin commands, you must have Administrator Permissions. \n If you believe this is an error, please contact the server owner or `TeakIvy#0659`"
          )
        );
      }
    } else if (args[0] === "list") {
      message.channel.send(FAQList(message, guildID));
    } else if (args[0] === "help") {
      message.channel.send(FAQHelp(guildID));
    } else if (faq[guildID].questions[args[0]]) {
      message.channel.send(FAQ(args[0], message));
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
    .setTitle(`\`${tag}\` **- ${faq[guildID].questions[tag]}**`)
    .setDescription(`${faq[guildID].answers[tag]}`);
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

function FAQList(message, guildID) {
  var embedColor = faq[guildID].color;
  var listElement = "";

  var i;
  for (i = 0; i < Object.keys(faq[guildID].questions).length; i++) {
    listElement += `\`${Object.keys(faq[guildID].questions)[i]}\` - ${
      faq[guildID].questions[Object.keys(faq[guildID].questions)[i]]
    }\n`;
  }

  const faqEmbed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle(`**FAQ Tag List**`)
    .setDescription(listElement);
  return faqEmbed;
}

function FAQHelp(guildID) {
  var embedColor = faq[guildID].color;

  const faqEmbed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle(`**FAQ Help**`)
    .setDescription(
      "**General Commands**\n`-%<tag>%` - Shows the FAQ card for `<tag>`\n`-faq <tag>` - Shows the FAQ card for `<tag>`\n`-faq list` - Lists all FAQ Card tags & Questions\n`-faq help` - This Page!\n\n**Admin Commands**\n`-faq admin add <tag> %<question>% %<answer>%` - Adds an FAQ Card (Limit 25/Server)\n`-faq admin update <tag> %<question>% %<answer>%` - Updates a tag with a certain question & answer\n`-faq admin set <question/answer> <tag> %<value>%` - Sets either a question or answers value\n`-faq admin delete <tag>` - Deletes a tag card\n`-faq admin color <HEX Code>` - Sets the default card color"
    );
  return faqEmbed;
}
