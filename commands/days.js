var utility = require("../botmodules/utility.js");

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
            message: "<@!180478465659764737> " + "`Dias para molhar o biscoito: " + difDays + "`"
        });
    }
});
