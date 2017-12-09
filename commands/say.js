var utility = require("../botmodules/utility.js");

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
        utility.sendMessage({
            to: information.channelID,
            message: msg
        });
    }
});
