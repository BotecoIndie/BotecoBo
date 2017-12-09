var utility = require("../botmodules/utility.js");
/*
utility.commandAdd({
    name: "purge", //
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
                    utility.sendMessage({
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
*/
