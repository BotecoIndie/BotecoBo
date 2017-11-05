var utility = require("../botmodules/utility.js");
var path = require('path');

utility.commandAdd({
    name: "colors",
    description: "Mostra as cores disponíveis. Uso: !colors",
    staffOnly: false,
    callback: function (args, information) {
        utility.data.bindedBot.uploadFile({
            to: information.userID,
            file: path.resolve(__dirname, "content/colors.png"),
            message: ":heart:"
        });
    }
});
