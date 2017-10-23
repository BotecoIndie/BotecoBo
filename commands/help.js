var utility = require("../botmodules/utility.js");

utility.commandAdd({
        name: "help",
        description: "Mostra os comandos disponíveis. Uso: !help",
        staffOnly: false,
        callback: function (args, information) {
            var str = "```Comandos \n\n";
            for (var i = 0; i < utility.data.commands.length; i++) {
                if (!utility.data.commands[i].staffOnly) {
                    str += utility.data.commands[i].command;
                    str += " - ";
                    if (utility.data.commands[i].description == undefined || utility.data.commands[i].description == "") {
                        str += "Não há descrição disponível";
                    } else {
                        str += utility.data.commands[i].description;
                    }
                    str += "\n";
                }
            }
            str += "\n\nComandos exclusivos da Staff \n\n";

            for (var i = 0; i < utility.data.commands.length; i++) {
                if (utility.data.commands[i].staffOnly) {
                    str += utility.data.commands[i].command;
                    str += " - ";
                    if (utility.data.commands[i].description == undefined || utility.data.commands[i].description == "") {
                        str += "Não há descrição disponível";
                    } else {
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
