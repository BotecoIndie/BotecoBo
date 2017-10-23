var deps = require("./BotModules/Deps.js");
var mDiscord = require("./BotModules/DiscordUtility.js");
var mBotecoBo = require("./BotModules/BotUtility.js");

setTimeout(getRequest, 1000);

function getRequest() {
    deps.got('alwaysonmBotecoBo.botecobo.azurewebsites.net')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            console.log(error.response.body);
        });
    setTimeout(getRequest, 600000);
}

mBotecoBo.bot.on('ready', function (event) {
    console.log('Logged in as %s - %s\n', mBotecoBo.bot.username, mBotecoBo.bot.id);
    try {
        mBotecoBo.loadData("data.json");
    } catch (exception) {

    }
    mBotecoBo.bindToServer(event.d.guilds[0].id);
    mBotecoBo.commandAdd({
        name: "purge",
        description: "Elimina mensagens em lote. Uso: !purge all qtd",
        staffOnly: true,
        callback: function (args, information) {
            var type = args[0];
            var value = args[1];
            if (isNaN(value)) {
                return;
            }
            if (mBotecoBo.checkRole("Staff", information.userID)) {
                if (type && value) {
                    if (type == "all") {
                        mBotecoBo.bot.getMessages({
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
                            mBotecoBo.bot.deleteMessages({
                                channelID: information.channelID,
                                messageIDs: arrMsg
                            }, function (err) {
                                if (err) {
                                    mBotecoBo.output(err);
                                    throw err;
                                }
                            });
                            i++;
                        });
                    } else {
                        mBotecoBo.bot.sendMessage({
                            to: information.channelID,
                            message: "Filtragem por usuário ainda não está disponível, tudo bem? :heart:"
                        });
                    }
                }
            } else {
                mBotecoBo.violation(information);
            }
        }
    });
    mBotecoBo.commandAdd({
        name: "cor",
        description: "Troca a cor do nome de usuário. Uso: !cor Cor",
        staffOnly: false,
        callback: function (args, information) {
            if (args[0]) {
                mBotecoBo.changeUserColor(information.userID, args[0]);
            }
        }
    });
    mBotecoBo.commandAdd({
        name: "colors",
        description: "Mostra as cores disponíveis. Uso: !color",
        staffOnly: false,
        callback: function (args, information) {
            mBotecoBo.bot.uploadFile({
                to: information.userID,
                file: path.resolve(__dirname, "colors.png"),
                message: ":heart:"
            });
        }
    });
    mBotecoBo.commandAdd({
        name: "caetano",
        description: "Envia o vídeo do Caetano Veloso. Uso: !caetano",
        staffOnly: false,
        callback: function (args, information) {
            mBotecoBo.bot.sendMessage({
                to: information.channelID,
                message: "https://www.youtube.com/watch?v=-MK1q9fZjeI"
            });
        }
    });
    mBotecoBo.commandAdd({
        name: "days",
        description: "Exibe os dias restantes até o Oak molhar o biscoito. Uso: !days",
        staffOnly: false,
        callback: function (args, information) {
            var cookieTime = new Date(2017, 10, 19, 0, 0, 0, 0);
            var today = new Date();
            var timeDif = Math.abs(cookieTime.getTime() - today.getTime());
            var difDays = Math.ceil(timeDif / (1000 * 3600 * 24));
            mBotecoBo.bot.sendMessage({
                to: information.channelID,
                message: "`Dias para molhar o biscoito: " + difDays + "`"
            });
        }
    });
    mBotecoBo.commandAdd({
        name: "say",
        description: "Faz o mBotecoBo.bot exibir uma mensagem. Uso: !say Msg",
        staffOnly: true,
        callback: function (args, information) {
            if (!mBotecoBo.checkRole("Staff", information.userID)) {
                mBotecoBo.violation(information);
                return;
            }
            var msg = "";
            for (var i = 0; i < args.length; i++) {
                msg += args[i] + " ";
            }
            mBotecoBo.bot.sendMessage({
                to: information.channelID,
                message: msg
            });
        }
    });
    mBotecoBo.commandAdd({
        name: "addColor",
        description: "Marca o cargo como cor. Uso: !addColor Cargo",
        staffOnly: true,
        callback: function (args, information) {
            if (!mBotecoBo.checkRole("Staff", information.userID)) {
                mBotecoBo.violation(information);
                return;
            }
            if (args[0]) {
                var rid = mDiscord.roleGetIDByName(args[0]);
                console.log(rid);
                if (rid) {
                    if (mBotecoBo.data.colors.indexOf(rid) == -1) {
                        mBotecoBo.data.colors.push(rid);
                        mBotecoBo.updateColorFile();
                        mBotecoBo.saveData("data.json");
                        mBotecoBo.reply("Consegui! A cor \"" + args[0] + "\" foi adicionada com sucesso!", information);
                    } else {
                        mBotecoBo.reply("Desculpa, mas já existe uma cor chamada \"" + args[0] + "\" na listinha <:badday:273230212651548672>", information);
                    }
                } else {
                    mBotecoBo.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
                }
            }
        }
    });
    mBotecoBo.commandAdd({
        name: "remColor",
        description: "Remove o cargo como cor. Uso: !remColor Cargo",
        staffOnly: true,
        callback: function (args, information) {
            if (!mBotecoBo.checkRole("Staff", information.userID)) {
                mBotecoBo.violation(information);
                return;
            }
            if (args[0]) {
                var rid = mDiscord.roleGetIDByName(args[0]);
                if (rid) {
                    console.log(mBotecoBo.bot.servers[mBotecoBo.data.currentServer].roles);
                    var pos = mBotecoBo.data.colors.indexOf(rid)
                    if (pos != -1) {
                        mBotecoBo.data.colors.splice(pos, 1);
                        mBotecoBo.updateColorFile();
                        mBotecoBo.saveData("data.json");
                        mBotecoBo.reply("A cor \"" + args[0] + "\" foi removida com sucesso!", information);
                    } else {
                        mBotecoBo.reply("Desculpa, não consegui encontrar nenhuma cor chamada \"" + args[0] + "\" na listinha de cores <:badday:273230212651548672>", information);
                    }
                } else {
                    mBotecoBo.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
                }
            }
        }
    });
    mBotecoBo.commandAdd({
        name: "putData",
        description: "Imprime os dados do mBotecoBo.bot no #mBotecoBo.bot_output. Uso: !putData",
        staffOnly: true,
        callback: function (args, information) {
            if (!mBotecoBo.checkRole("Staff", information.userID)) {
                mBotecoBo.violation(information);
                return;
            }
            var val = JSON.stringify(mBotecoBo.data, null, 4);
            console.log(val);
            mBotecoBo.output('```json\n' + val + "```");
        }
    });
    mBotecoBo.commandAdd({
        name: "scrap",
        description: "Envia uma mensagem para um usuário. Uso: !scrap User Msg",
        staffOnly: false,
        callback: function (args, information) {
            if (args[0] && args[1]) {
                var to = undefined;
                if (mDiscord.isUserMention(args[0])) {
                    to = mDiscord.convertMentionToUser(args[0]);
                    console.log(to);
                } else {
                    const uid = mDiscord.memberGetIDByName(args[0]);
                    console.log("id:" + uid);
                    to = mDiscord.getMemberProperties(uid);
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
                        user: mDiscord.getMemberProperties(information.userID)
                    };
                    mBotecoBo.data.scraps.push(scrapObject);
                    mBotecoBo.reply("Tudo bem, <@!" + information.userID + "> , eu darei seu recado(espero)", information);
                } else {
                    mBotecoBo.reply("Desculpa, mas não consegui achar o usuário que você pediu", information);
                }

            }
        }
    });
    mBotecoBo.commandAdd({
        name: "updateData",
        description: "Atualiza e salva os dados do Botecobo. Uso: !updateData",
        staffOnly: true,
        callback: function (args, information) {
            if (!mBotecoBo.checkRole("Staff", information.userID)) {
                mBotecoBo.violation(information);
                return;
            }
            mBotecoBo.saveData("data.json");
            mBotecoBo.updateColorFile();
        }
    });
    mBotecoBo.commandAdd({
        name: "help",
        description: "Mostra os comandos disponíveis. Uso: !help",
        staffOnly: false,
        callback: function (args, information) {
            var str = "```Comandos \n\n";
            for (var i = 0; i < mBotecoBo.data.commands.length; i++) {
                if (!mBotecoBo.data.commands[i].staffOnly) {
                    str += mBotecoBo.data.commands[i].command;
                    str += " - ";
                    if (mBotecoBo.data.commands[i].description == undefined || mBotecoBo.data.commands[i].description == "") {
                        str += "Não há descrição disponível";
                    } else {
                        str += mBotecoBo.data.commands[i].description;
                    }
                    str += "\n";
                }
            }
            str += "\n\nComandos exclusivos da Staff \n\n";

            for (var i = 0; i < mBotecoBo.data.commands.length; i++) {
                if (mBotecoBo.data.commands[i].staffOnly) {
                    str += mBotecoBo.data.commands[i].command;
                    str += " - ";
                    if (mBotecoBo.data.commands[i].description == undefined || mBotecoBo.data.commands[i].description == "") {
                        str += "Não há descrição disponível";
                    } else {
                        str += mBotecoBo.data.commands[i].description;
                    }
                    str += "\n";
                }
            }

            str += "```";

            mBotecoBo.bot.sendMessage({
                to: information.channelID,
                message: str
            });
        }
    });
    mBotecoBo.listenerAdd(function (information) {
        console.log('listener called');
        console.log(mBotecoBo.data.scraps.length);
        for (i = 0; i < mBotecoBo.data.scraps.length; ++i) {
            if (mBotecoBo.data.scraps[i].to.id == information.userID) {
                mBotecoBo.reply("Recado para você, <@!" + information.userID + "> de <@!" + mBotecoBo.data.scraps[i].user.id + "> : " + mBotecoBo.data.scraps[i].message, information);
                mBotecoBo.data.scraps.splice(i, 1);
            }
        }
    });
    mBotecoBo.updateColorFile();
    console.log(mBotecoBo.bot.servers[mBotecoBo.data.currentServer]["roles"]);
});

mBotecoBo.bot.on('disconnect', function (errMsg, code) {
    mBotecoBo.bot.connect();
});

mBotecoBo.bot.on('message', function (user, userID, channelID, message, event) {
    console.log(message);
    var information = {
        message: message,
        userID: userID,
        channelID: channelID,
        event: event,
        user: user
    };
    mBotecoBo.process(information);
});

mBotecoBo.bot.on('any', function (event) {
    switch (event.t) {
        case "GUILD_MEMBER_ADD":
            mBotecoBo.bot.sendMessage({
                to: "285851488625098752",
                message: "A wild <@" + event.d.user.id + ">" + " appears!`"
            });
            break;
        case "GUILD_MEMBER_REMOVE":
            console.log(event.d.user.id);
            if (event.d.user.id == "234825236296499213") {
                mBotecoBo.data.kickStanleyTimes++;
                mBotecoBo.bot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">`" + " continua câncer e foi banido pela " + kickStanleyTimes + "ª vez`"
                });
                mBotecoBo.saveData();
            } else {
                mBotecoBo.bot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">`" + " sumiu`"
                });
            }
            break;
        case "GUILD_ROLE_UPDATE":
            if (mBotecoBo.data.colors.indexOf(event.d.id) != -1) {
                mBotecoBo.updateColorFile();
            }
            break;
        case "GUILD_ROLE_REMOVE":
            var idx = mBotecoBo.data.colors.indexOf(event.d.id);
            if (idx != -1) {
                mBotecoBo.data.colors.splice(idx, 1);
                mBotecoBo.updateColorFile();
            }
    }
});
