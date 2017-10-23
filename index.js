var got = require('got'),
    Discord = require('discord.io'),
    utility = require('./botmodules/utility.js'),
    path = require("path");

NODE_DEBUG=true;
setTimeout(getRequest, 1000);

function getRequest() {
    got('alwaysonbotecobo.azurewebsites.net')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            console.log(error.response.body);
        });
    setTimeout(getRequest, 600000);
}//

var bot = new Discord.Client({
    autorun: true,
    token: process.env.DISCORD_TOKEN,
    messageCacheLimit: null
});
utility.bindBot(bot);//

utility.data.bindedBot.on('ready', function (event) {
    try {
        utility.loadData("./content/data.json");
    } catch (exception) {

    }
    utility.bindToServer(event.d.guilds[0].id);
    utility.commandAdd({
        name: "purge",//
        description: "Elimina mensagens em lote. Uso: !purge all qtd",
        staffOnly: true,
        callback: function (args, information) {
          var type = args[0];
          var value = args[1];
          if (isNaN(value)) {
              return;
          }
          if (utility.checkRole("Staff", information.userID)) {
              if (type && value) {
                  if (type == "all") {
                      utility.data.bindedBot.getMessages({
                          channelID: information.channelID,
                          limit: value
                      }, function (err, messageArray) {
                          var arrMsg = [];
                          for (var i = 0; i <= value; i++) {
                              if (messageArray[i]) {
                                  arrMsg.push(messageArray[i].id);
                              } else {
                                  break;
                              }
                          }
                          var i = 0;
                          utility.data.bindedBot.deleteMessages({
                              channelID: information.channelID,
                              messageIDs: arrMsg
                          }, function (err) {
                              if (err) {
                                  utility.output(err);
                                  throw err;
                              }
                          });
                          i++;
                      });
                  } else {
                      utility.data.bindedBot.sendMessage({
                          to: information.channelID,
                          message: "Filtragem por usuário ainda não está disponível, tudo bem? :heart:"
                      });
                  }
              }
          } else {
              utility.violation(information);
          }
      }
      });
    utility.commandAdd({
        name: "color",
        description: "Troca a cor do nome de usuário. Uso: !color Cor",
        staffOnly: false,
        callback: function (args, information) {
          if (args[0]) {
              utility.changeUserColor(information.userID, args[0]);
          }
      }
      });
    utility.commandAdd({
        name: "colors",
        description: "Mostra as cores disponíveis. Uso: !color",
        staffOnly: false,
        callback: function (args, information) {
          utility.data.bindedBot.uploadFile({
              to: information.userID,
              file: path.resolve(__dirname, "content/colors.png"),
              message: ":heart:"
          });
      }
      });
    utility.commandAdd({
        name: "caetano",
        description: "Envia o vídeo do Caetano Veloso. Uso: !caetano",
        staffOnly: false,
        callback: function (args, information) {
          utility.data.bindedBot.sendMessage({
              to: information.channelID,
              message: "https://www.youtube.com/watch?v=-MK1q9fZjeI"
          });
      }
      });
    utility.commandAdd({
        name: "days",
        description: "Exibe os dias restantes até o Oak molhar o biscoito. Uso: !days",
        staffOnly: false,
        callback: function (args, information) {
          var cookieTime = new Date(2017, 10, 19, 0, 0, 0, 0);
          var today = new Date();
          var timeDif = Math.abs(cookieTime.getTime() - today.getTime());
          var difDays = Math.ceil(timeDif / (1000 * 3600 * 24));
          utility.data.bindedBot.sendMessage({
              to: information.channelID,
              message: "`Dias para molhar o biscoito: " + difDays + "`"
          });
      }
      });
    utility.commandAdd({
        name: "say",
        description: "Faz o bot exibir uma mensagem. Uso: !say Msg",
        staffOnly: true,
        callback: function (args, information) {
          if (!utility.checkRole("Staff", information.userID)) {
              utility.violation(information);
              return;
          }
          var msg = "";
          for (var i = 0; i < args.length; i++) {
              msg += args[i] + " ";
          }
          utility.data.bindedBot.sendMessage({
              to: information.channelID,
              message: msg
          });
      }
      });
    utility.commandAdd({
        name: "addColor",
        description: "Marca o cargo como cor. Uso: !addColor Cargo",
        staffOnly: true,
        callback: function (args, information) {
          if (!utility.checkRole("Staff", information.userID)) {
              utility.violation(information);
              return;
          }
          if (args[0]) {
              var rid = utility.roleGetIDByName(args[0]);
              console.log(rid);
              if (rid) {
                  if (utility.data.colors.indexOf(rid) == -1) {
                      utility.data.colors.push(rid);
                      utility.updateColorFile();
                      utility.saveData("content/data.json");
                      utility.reply("Consegui! A cor \"" + args[0] + "\" foi adicionada com sucesso!", information);
                  } else {
                      utility.reply("Desculpa, mas já existe uma cor chamada \"" + args[0] + "\" na listinha <:badday:273230212651548672>", information);
                  }
              } else {
                  utility.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
              }
          }
      }
      });
    utility.commandAdd({
        name: "remColor",
        description: "Remove o cargo como cor. Uso: !remColor Cargo",
        staffOnly: true,
        callback: function (args, information) {
          if (!utility.checkRole("Staff", information.userID)) {
              utility.violation(information);
              return;
          }
          if (args[0]) {
              var rid = utility.roleGetIDByName(args[0]);
              if (rid) {
                  console.log(utility.data.bindedBot.servers[utility.data.currentServer].roles);
                  var pos = utility.data.colors.indexOf(rid)
                  if (pos != -1) {
                      utility.data.colors.splice(pos, 1);
                      utility.updateColorFile();
                      utility.saveData("content/data.json");
                      utility.reply("A cor \"" + args[0] + "\" foi removida com sucesso!", information);
                  } else {
                      utility.reply("Desculpa, não consegui encontrar nenhuma cor chamada \"" + args[0] + "\" na listinha de cores <:badday:273230212651548672>", information);
                  }
              } else {
                  utility.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
              }
          }
      }
      });
    utility.commandAdd({
        name: "putData",
        description: "Imprime os dados do bot no #bot_output. Uso: !putData",
        staffOnly: true,
        callback: function (args, information) {
          if (!utility.checkRole("Staff", information.userID)) {
              utility.violation(information);
              return;
          }
          var val = JSON.stringify(utility.data, null, 4);
          console.log(val);
          utility.output('```json\n' + val + "```");
      }
      });
    utility.commandAdd({
        name: "scrap",
        description: "Envia uma mensagem para um usuário. Uso: !scrap User Msg",
        staffOnly: false,
        callback: function (args, information) {
          if (args[0] && args[1]) {
              var to = undefined;
              if (utility.isUserMention(args[0])) {
                  to = utility.convertMentionToUser(args[0]);
                  console.log(to);
              } else {
                  const uid = utility.memberGetIDByName(args[0]);
                  console.log("id:" + uid);
                  to = utility.getMemberProperties(uid);
              }
              if (to) {
                  var message = "";
                  for (i = 1; i < args.length; ++i) {
                      message += " ";
                      message += args[i];
                  }
                  var scrapObject = {
                      message: message,
                      to: to,
                      user: utility.getMemberProperties(information.userID)
                  };
                  utility.data.scraps.push(scrapObject);
                  utility.reply("Tudo bem, <@!" + information.userID + "> , eu darei seu recado(espero)", information);
              } else {
                  utility.reply("Desculpa, mas não consegui achar o usuário que você pediu", information);
              }

          }
      }
      });
    utility.commandAdd({
      name:"updateData",
      description: "Atualiza e salva os dados do Botecobo. Uso: !updateData",
      staffOnly: true,
      callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        utility.saveData("content/data.json");
        utility.updateColorFile();
    }
  });
    utility.commandAdd({
      name: "help",
      description: "Mostra os comandos disponíveis. Uso: !help",
      staffOnly: false,
      callback: function (args, information) {
          var str = "```Comandos \n\n";
          for(var i = 0; i < utility.data.commands.length; i++)
          {
            if (!utility.data.commands[i].staffOnly)
            {
              str += utility.data.commands[i].command;
              str += " - ";
              if (utility.data.commands[i].description == undefined || utility.data.commands[i].description == "")
              {
                str += "Não há descrição disponível";
              }
              else
              {
                str += utility.data.commands[i].description;
              }
              str += "\n";
            }
          }
          str += "\n\nComandos exclusivos da Staff \n\n";

          for(var i = 0; i < utility.data.commands.length; i++)
          {
            if (utility.data.commands[i].staffOnly)
            {
              str += utility.data.commands[i].command;
              str += " - ";
              if (utility.data.commands[i].description == undefined || utility.data.commands[i].description == "")
              {
                str += "Não há descrição disponível";
              }
              else
              {
                str += utility.data.commands[i].description;
              }
              str += "\n";
            }
          }

          str += "```";

          utility.data.bindedBot.sendMessage({
              to: information.channelID,
              message: str
          });
          }
        });
    utility.listenerAdd(function (information) {
        console.log('listener called');
        console.log(utility.data.scraps.length);
        for (i = 0; i < utility.data.scraps.length; ++i) {
            if (utility.data.scraps[i].to.id == information.userID) {
                utility.reply("Recado para você, <@!" + information.userID + "> de <@!" + utility.data.scraps[i].user.id + "> : " + utility.data.scraps[i].message, information);
                utility.data.scraps.splice(i, 1);
            }
        }
    });
    utility.updateColorFile();
    console.log(utility.data.bindedBot.servers[utility.data.currentServer]["roles"]);
});

utility.data.bindedBot.on('disconnect', function (errMsg, code) {
    utility.data.bindedBot.connect();
});

utility.data.bindedBot.on('message', function (user, userID, channelID, message, event) {
    console.log(message);
    var information = {
        message: message,
        userID: userID,
        channelID: channelID,
        event: event,
        user: user
    };
    utility.process(information);
});

utility.data.bindedBot.on('any', function (event) {
    switch (event.t) {
        case "GUILD_MEMBER_ADD":
            utility.data.bindedBot.sendMessage({
                to: "285851488625098752",
                message: "A wild <@" + event.d.user.id + ">" + " appears!`"
            });
            break;
        case "GUILD_MEMBER_REMOVE":
            if (event.d.user.id == "234825236296499213") {
                utility.data.kickStanleyTimes++;
                utility.data.bindedBot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">`" + " continua câncer e foi banido pela " + kickStanleyTimes + "ª vez`"
                });
                utility.saveData();
            } else {
                utility.data.bindedBot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">`" + " sumiu`"
                });
            }
            break;
        case "GUILD_ROLE_UPDATE":
            if (utility.data.colors.indexOf(event.d.id) != -1) {
                utility.updateColorFile();
            }
            break;
        case "GUILD_ROLE_REMOVE":
            var idx = utility.data.colors.indexOf(event.d.id);
            if (idx != -1) {
                utility.data.colors.splice(idx, 1);
                utility.updateColorFile();
            }
    }
});