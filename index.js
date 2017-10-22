var got = require('got'),
    Discord = require('discord.io'),
    jsonfile = require("jsonfile"),
    path = require("path"),
    fs = require("fs"),
    jimp = require("jimp");
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
}

var bot = new Discord.Client({
    autorun: true,
    token: process.env.DISCORD_TOKEN,
    messageCacheLimit: null
});

var fDiscord = {
    roleGetNameByID: function (roleID) {
        var roles = bot.servers[fBotecoBo.data.currentServer]["roles"];
        var res = undefined;
        res = roles[(typeof (roleID) != "string") ? roleID.toString() : roleID];
        var result = undefined;
        if (res) {
            result = res.name;
        }
        return result;
    },
    roleGetIDByName: function (roleName) {
        var roles = bot.servers[fBotecoBo.data.currentServer]["roles"];
        var keys = Object.keys(roles);
        var rid = undefined;
        for (i = 0; i < keys.length; ++i) {
            if (roles[keys[i]].name.toLowerCase() == roleName.toLowerCase()) {
                rid = roles[keys[i]].id;
                break;
            }
        }
        return rid;
    },
    memberGetIDByName: function (username) {
        console.log(bot.users);
        var keys = Object.keys(bot.servers[fBotecoBo.data.currentServer].members);
        for (i = 0; i < keys.length;++i ) {
             var member = bot.servers[fBotecoBo.data.currentServer].members[keys[i]];
            if(member.nick) {
                if(member.nick == username) {
                    return member.id;
                }
            }
        }
        keys = Object.keys(bot.users);
        for (i = 0; i < keys.length; ++i) {
            var member = bot.users[keys[i]];
            console.log(member);
            if (member) {
                if (member.username == username) {
                    return member.id;
                }
            }
        }
        return undefined;
    },
    userGetRoles: function (userID) {
        return bot.servers[fBotecoBo.data.currentServer].members[userID].roles;
    },
    getMemberRoles: function (userID) {
        return bot.servers[fBotecoBo.data.currentServer].members[userID].roles;
    },
    getRolePropertiesByName: function (roleName) {
        return fDiscord.getRolePropertiesByID(fDiscord.roleGetIDByName(roleName));
    },
    getRolePropertiesByID: function (roleID) {
        return bot.servers[fBotecoBo.data.currentServer].roles[roleID];
    },
    isUserMention: function (text) {
        if (text.substr(0, 2) == "<@") {
            return true;
            return true;
        }
        return false;
    },
    getMemberProperties: function (id) {
        return bot.servers[fBotecoBo.data.currentServer].members[id];
    },
    convertMentionToUser: function (text) {
        var begIndex = undefined;
        var endIndex = undefined;
        for (i = 0; i < text.length; ++i) {
            if (!isNaN(text.substr(i, 1))) {
                begIndex = i;
                break;
            }
        }
        endIndex = text.length - 1;
        console.log("result: " + text.substr(begIndex, endIndex));
        console.log("sauce:  " + text);
        return fDiscord.getMemberProperties(text.substring(begIndex, endIndex));
    }
};
var fBotecoBo = {
    data: {
        colors: [
        '357972750448721922',
        '353201730613149696',
        '347591766175645696',
        '285141552056238090',
        '285141479641317377',
        '285141212250243072',
        '285138761690382357',
        '285138592257277953',
        '285138029004193792',
        '285137773961412613',
        '285137408691929090',
        '285130625760100352',
        '284840931394322432',
        '284838208863207425',
        '284838162164088833',
        '284838120430764032',
        '284838098544754688',
        '284838028390825984',
        '284837475011002368'
        ],
        commands: [],
        listeners: [],
        currentServer: undefined,
        scraps: []
    },
    listenerAdd: function (listener) {
        fBotecoBo.data.listeners.push(listener);
    },
    reply(text, information) {
        bot.sendMessage({
            to: information.channelID,
            message: text
        });
    },
    saveData: function (fname) {
        var object = {};
        object["colors"] = fBotecoBo.data.colors;
        object["kickStanleyTimes"] = fBotecoBo.data.kickStanleyTimes;
        fs.writeFile(path.resolve(__dirname, fname), JSON.stringify(object, null, 4));
    },
    loadData: function (fname) {
        var ex = fs.existsSync(path.resolve(__dirname, fname));
        if (ex) {
            var data = fs.readFileSync(path.resolve(__dirname, fname));
            var jsonP = JSON.parse(data);
            fBotecoBo.data.colors = jsonP.colors;
            fBotecoBo.data.kickStanleyTimes = jsonP.kickStanleyTimes;
        }
    },
    bindToServer: function (serverID) {
        fBotecoBo.data.currentServer = serverID;
    },
    violation: function (information) {
        bot.sendMessage({
            to: information.channelID,
            message: "`Você não tem permissão pra isso, bobinho`:heart:"
        });
    }, //
    updateColorFile: function () {
        const quadSize = 200;
        console.log(fBotecoBo.data.colors.length);
        const imgWidth = quadSize * Math.ceil(Math.sqrt(fBotecoBo.data.colors.length));
        const hLen = Math.sqrt(fBotecoBo.data.colors.length);
        const imgHeight = quadSize * Math.ceil((fBotecoBo.data.colors.length / 2.0 != Math.floor(fBotecoBo.data.colors.length / 2.0)) ? hLen - 1 : hLen);
        const margin = 48;
        var image = new jimp(imgWidth, imgHeight, function (err, image) {
            if (err) {
                console.log("failure");
                console.log(err);
                fBotecoBo.output("Jimp Error: " + err);
            } else {
                image.quality(100);
                image.background(jimp.rgbaToInt(255, 255, 255, 255));
                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(function (font) {
                    // I dont know what happening here
                    jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(function (font2) {
                        var index = 0;
                        for (y = 0; y < imgHeight; y += quadSize) {
                            for (x = 0; x < imgWidth; x += quadSize) {
                                if (index >= fBotecoBo.data.colors.length) {
                                    break;
                                }
                                var roleProperties = fDiscord.getRolePropertiesByID(fBotecoBo.data.colors[index]);
                                if (!roleProperties) {
                                    fBotecoBo.output("No role \"" + fBotecoBo.data.colors[index] + "\" found");
                                } else {
                                    var roleColor = jimp.intToRGBA(roleProperties.color);
                                    console.log(roleProperties.name + " : " + JSON.stringify(roleColor) + " : " + roleProperties.color);

                                    image.scan(x, y, quadSize, quadSize, function (x, y, idx) {
                                        this.bitmap.data[idx + 0] = roleColor.g;
                                        this.bitmap.data[idx + 1] = roleColor.b;
                                        this.bitmap.data[idx + 2] = roleColor.a;
                                        this.bitmap.data[idx + 3] = 255;
                                    });
                                    var tfont = font;
                                    if (roleColor.g + roleColor.b + roleColor.a < 40) {
                                        tfont = font2;
                                    }
                                    image.print(tfont, ((16 * roleProperties.name.length) < quadSize) ? x + (quadSize - 16 * roleProperties.name.length) / 2 : x, y, roleProperties.name, quadSize);
                                    image.scan(x, y, quadSize, quadSize, function (x, y, idx) {
                                        if (this.bitmap.data[idx + 0] != roleColor.g && this.bitmap.data[idx + 1] != roleColor.b && this.bitmap.data[idx + 2] != roleColor.a) {
                                            this.bitmap.data[idx + 0] = (255 - roleColor.g);
                                            this.bitmap.data[idx + 1] = (255 - roleColor.b);
                                            this.bitmap.data[idx + 2] = (255 - roleColor.a);
                                        }
                                    });
                                    ++index;
                                }
                            }
                        }
                        image.write(__dirname + "/colors.jpg", function (err) {
                            if (err) { //
                                fBotecoBo.output(err);
                                throw err;
                            } else {
                                console.log("done");
                            }
                        });
                    });
                });
            }
        });
    },
    commandAdd: function (information) {
        fBotecoBo.data.commands.push({
            command: information.name,
            description: information.description,
            staffOnly: information.staffOnly,
            callback: information.callback
        });
    },
    commandRemove: function (command) {
        for (i = 0; i < fBotecoBo.data.commands.length; ++i) {
            if (fBotecoBo.data.commands[i].command == command) {
                fBotecoBo.data.commands.splice(i, 1);
                break;
            }
        }
    },
    process: function (information) {
        var message = information.message;
        message.toLowerCase();
        if (message.substr(0, 1) == "!") {
            var messageWithoutPrefix = message.substr(1, message.length - 1);
            console.log(messageWithoutPrefix);
            var msgSplit = messageWithoutPrefix.split(" ");
            if (msgSplit[0]) {
                for (i = 0; i < fBotecoBo.data.commands.length; ++i) {
                    if (fBotecoBo.data.commands[i].command.toLowerCase() == msgSplit[0].toLowerCase()) {
                        msgSplit.splice(0, 1);
                        fBotecoBo.data.commands[i].callback((msgSplit) ? msgSplit : "", information);
                        break;
                    }
                }
            }
        }
        fBotecoBo.data.listeners.forEach(function (item, index, array) {
            item(information);
        });
    },
    checkRole: function (roleName, userID) {
           var rl = fDiscord.getRolePropertiesByName(roleName);
            var idx = fDiscord.getMemberRoles(userID).indexOf(rl.id);
            return idx!=-1;
        },
    changeUserColor: function (uid, role) {
        var userRoles = fDiscord.getMemberRoles(uid);
        var roleColor = {
            serverID: fBotecoBo.data.currentServer,
            userID: uid,
            roleID: fDiscord.roleGetIDByName(role)
        };
        for (i = 0; i < userRoles.length; ++i) {
            for (i = 0; i < userRoles.length; ++i) {
                if (fBotecoBo.data.colors.indexOf(userRoles[i].id) == -1) {
                    var obj = {
                        serverID: fBotecoBo.data.currentServer,
                        userID: uid,
                        roleID: userRoles[i]
                    };
                    bot.removeFromRole(obj, function (err, res) {
                        if (err) {
                            console.log(JSON.stringify(obj));
                            fBotecoBo.output(err);
                            throw err;
                        }
                    });
                }
            }
            bot.addToRole(roleColor, function (err, res) {
                if (err) {
                    throw err;
                }
            });
        }
    },
    output: function (text) {
        bot.sendMessage({
            to: "286314605163053057", // Bot Output Channel ID
            message: text
        })
    }
};

bot.on('ready', function (event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    try {
        fBotecoBo.loadData("data.json");
    } catch (exception) {

    }
    fBotecoBo.bindToServer(event.d.guilds[0].id);
    fBotecoBo.commandAdd({
        name: "purge",
        description: "Elimina mensagens em lote. Uso: !purge all qtd",
        staffOnly: true,
        callback: function (args, information) {
          var type = args[0];
          var value = args[1];
          if (isNaN(value)) {
              return;
          }
          if (fBotecoBo.checkRole("Staff", information.userID)) {
              if (type && value) {
                  if (type == "all") {
                      bot.getMessages({
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
                          bot.deleteMessages({
                              channelID: information.channelID,
                              messageIDs: arrMsg
                          }, function (err) {
                              if (err) {
                                  fBotecoBo.output(err);
                                  throw err;
                              }
                          });
                          i++;
                      });
                  } else {
                      bot.sendMessage({
                          to: information.channelID,
                          message: "Filtragem por usuário ainda não está disponível, tudo bem? :heart:"
                      });
                  }
              }
          } else {
              fBotecoBo.violation(information);
          }
      }
      });
    fBotecoBo.commandAdd({
        name: "cor",
        description: "Troca a cor do nome de usuário. Uso: !cor Cor",
        staffOnly: false,
        callback: function (args, information) {
          if (args[0]) {
              fBotecoBo.changeUserColor(information.userID, args[0]);
          }
      }
      });
    fBotecoBo.commandAdd({
        name: "colors",
        description: "Mostra as cores disponíveis. Uso: !color",
        staffOnly: false,
        callback: function (args, information) {
          bot.uploadFile({
              to: information.userID,
              file: path.resolve(__dirname, "colors.jpg"),
              message: ":heart:"
          });
      }
      });
    fBotecoBo.commandAdd({
        name: "caetano",
        description: "Envia o vídeo do Caetano Veloso. Uso: !caetano",
        staffOnly: false,
        callback: function (args, information) {
          bot.sendMessage({
              to: information.channelID,
              message: "https://www.youtube.com/watch?v=-MK1q9fZjeI"
          });
      }
      });
    fBotecoBo.commandAdd({
        name: "days",
        description: "Exibe os dias restantes até o Oak molhar o biscoito. Uso: !days",
        staffOnly: false,
        callback: function (args, information) {
          var cookieTime = new Date(2017, 10, 19, 0, 0, 0, 0);
          var today = new Date();
          var timeDif = Math.abs(cookieTime.getTime() - today.getTime());
          var difDays = Math.ceil(timeDif / (1000 * 3600 * 24));
          bot.sendMessage({
              to: information.channelID,
              message: "`Dias para molhar o biscoito: " + difDays + "`"
          });
      }
      });
    fBotecoBo.commandAdd({
        name: "say",
        description: "Faz o bot exibir uma mensagem. Uso: !say Msg",
        staffOnly: false,
        callback: function (args, information) {
          var msg = "";
          for (var i = 0; i < args.length; i++) {
              msg += args[i] + " ";
          }
          if (fBotecoBo.checkRole("Staff", information.userID)) {
              bot.sendMessage({
                  to: information.channelID,
                  message: msg
              });
          }
      }
      });
    fBotecoBo.commandAdd({
        name: "addColor",
        description: "Marca o cargo como cor. Uso: !addColor Cargo",
        staffOnly: true,
        callback: function (args, information) {
          if (!fBotecoBo.checkRole("Staff", information.userID)) {
              fBotecoBo.violation(information);
              return;
          }
          if (args[0]) {
              var rid = fDiscord.roleGetIDByName(args[0]);
              console.log(rid);
              if (rid) {
                  if (fBotecoBo.data.colors.indexOf(rid) == -1) {
                      fBotecoBo.data.colors.push(rid);
                      fBotecoBo.updateColorFile();
                      fBotecoBo.saveData("data.json");
                      fBotecoBo.reply("Consegui! A cor \"" + args[0] + "\" foi adicionada com sucesso!", information);
                  } else {
                      fBotecoBo.reply("Desculpa, mas já existe uma cor chamada \"" + args[0] + "\" na listinha <:badday:273230212651548672>", information);
                  }
              } else {
                  fBotecoBo.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
              }
          }
      }
      });
    fBotecoBo.commandAdd({
        name: "remColor",
        description: "Remove o cargo como cor. Uso: !remColor Cargo",
        staffOnly: true,
        callback: function (args, information) {
          if (!fBotecoBo.checkRole("Staff", information.userID)) {
              fBotecoBo.violation(information);
              return;
          }
          if (args[0]) {
              var rid = fDiscord.roleGetIDByName(args[0]);
              if (rid) {
                  console.log(bot.servers[fBotecoBo.data.currentServer].roles);
                  var pos = fBotecoBo.data.colors.indexOf(rid)
                  if (pos != -1) {
                      fBotecoBo.data.colors.splice(pos, 1);
                      fBotecoBo.updateColorFile();
                      fBotecoBo.saveData("data.json");
                      fBotecoBo.reply("A cor \"" + args[0] + "\" foi removida com sucesso!", information);
                  } else {
                      fBotecoBo.reply("Desculpa, não consegui encontrar nenhuma cor chamada \"" + args[0] + "\" na listinha de cores <:badday:273230212651548672>", information);
                  }
              } else {
                  fBotecoBo.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
              }
          }
      }
      });
    fBotecoBo.commandAdd({
        name: "putData",
        description: "Imprime os dados do bot no #bot_output. Uso: !putData",
        staffOnly: true,
        callback: function (args, information) {
          if (!fBotecoBo.checkRole("Staff", information.userID)) {
              fBotecoBo.violation(information);
              return;
          }
          var val = JSON.stringify(fBotecoBo.data, null, 4);
          console.log(val);
          fBotecoBo.output('```json\n' + val + "```");
      }
      });
    fBotecoBo.commandAdd({
        name: "scrap",
        description: "Envia uma mensagem para um usuário. Uso: !scrap User Msg",
        staffOnly: false,
        callback: function (args, information) {
          if (args[0] && args[1]) {
              var to = undefined;
              if (fDiscord.isUserMention(args[0])) {
                  to = fDiscord.convertMentionToUser(args[0]);
                  console.log(to);
              } else {
                  const uid = fDiscord.memberGetIDByName(args[0]);
                  console.log("id:" + uid);
                  to = fDiscord.getMemberProperties(uid);
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
                      user: fDiscord.getMemberProperties(information.userID)
                  };
                  fBotecoBo.data.scraps.push(scrapObject);
                  fBotecoBo.reply("Tudo bem, <@!" + information.userID + "> , eu darei seu recado(espero)", information);
              } else {
                  fBotecoBo.reply("Desculpa, mas não consegui achar o usuário que você pediu", information);
              }

          }
      }
      });
    fBotecoBo.commandAdd({
      name:"updateData",
      description: "Atualiza e salva os dados do Botecobo. Uso: !updateData",
      staffOnly: true,
      callback: function (args, information) {
        fBotecoBo.saveData("data.json");
        fBotecoBo.updateColorFile();
    }
  });
    fBotecoBo.commandAdd({
      name: "help",
      description: "Mostra os comandos disponíveis. Uso: !help",
      staffOnly: false,
      callback: function (args, information) {
          var str = "```Comandos \n\n";
          for(var i = 0; i < fBotecoBo.data.commands.length; i++)
          {
            if (!fBotecoBo.data.commands[i].staffOnly)
            {
              str += fBotecoBo.data.commands[i].command;
              str += " - ";
              if (fBotecoBo.data.commands[i].description == undefined || fBotecoBo.data.commands[i].description == "")
              {
                str += "Não há descrição disponível";
              }
              else
              {
                str += fBotecoBo.data.commands[i].description;
              }
              str += "\n";
            }
          }
          str += "\n\nComandos exclusivos da Staff \n\n";

          for(var i = 0; i < fBotecoBo.data.commands.length; i++)
          {
            if (fBotecoBo.data.commands[i].staffOnly)
            {
              str += fBotecoBo.data.commands[i].command;
              str += " - ";
              if (fBotecoBo.data.commands[i].description == undefined || fBotecoBo.data.commands[i].description == "")
              {
                str += "Não há descrição disponível";
              }
              else
              {
                str += fBotecoBo.data.commands[i].description;
              }
              str += "\n";
            }
          }

          str += "```";

          bot.sendMessage({
              to: information.channelID,
              message: str
          });
          }
        });
    fBotecoBo.listenerAdd(function (information) {
        console.log('listener called');
        console.log(fBotecoBo.data.scraps.length);
        for (i = 0; i < fBotecoBo.data.scraps.length; ++i) {
            if (fBotecoBo.data.scraps[i].to.id == information.userID) {
                fBotecoBo.reply("Recado para você, <@!" + information.userID + "> de <@!" + fBotecoBo.data.scraps[i].user.id + "> : " + fBotecoBo.data.scraps[i].message, information);
                fBotecoBo.data.scraps.splice(i, 1);
            }
        }
    });
    fBotecoBo.updateColorFile();
    console.log(bot.servers[fBotecoBo.data.currentServer]["roles"]);
});
bot.on('disconnect', function (errMsg, code) {
    bot.connect();
});
bot.on('message', function (user, userID, channelID, message, event) {
    console.log(message);
    var information = {
        message: message,
        userID: userID,
        channelID: channelID,
        event: event,
        user: user
    };
    fBotecoBo.process(information);
});
bot.on('any', function (event) {
    switch (event.t) {
        case "GUILD_MEMBER_ADD":
            bot.sendMessage({
                to: "285851488625098752",
                message: "A wild <@" + event.d.user.id + ">" + " appears!`"
            });
            break;
        case "GUILD_MEMBER_REMOVE":
            console.log(event.d.user.id);
            if (event.d.user.id == "234825236296499213") {
                fBotecoBo.data.kickStanleyTimes++;
                bot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">`" + " continua câncer e foi banido pela " + kickStanleyTimes + "ª vez`"
                });
                fBotecoBo.saveData();
            } else {
                bot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">`" + " sumiu`"
                });
            }
            break;
        case "GUILD_ROLE_UPDATE":
            if (fBotecoBo.data.colors.indexOf(event.d.id) != -1) {
                fBotecoBo.updateColorFile();
            }
            break;
        case "GUILD_ROLE_REMOVE":
            var idx = fBotecoBo.data.colors.indexOf(event.d.id);
            if (idx != -1) {
                fBotecoBo.data.colors.splice(idx, 1);
                fBotecoBo.updateColorFile();
            }
    }
});
