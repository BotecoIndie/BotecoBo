var utility = require("../botmodules/utility.js");
var path = require('path');

utility.commandAdd({
    name: "colors",
    description: "Mostra as cores disponíveis. Uso: !colors",
    staffOnly: false,
    callback: function (args, information) {
        utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(information.userID).sendFile(path.resolve(utility.data.dir, "./content/colors.png"),'colors.png',":heart:");
    }
});
