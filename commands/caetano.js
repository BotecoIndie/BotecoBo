var utility = require("../botmodules/utility.js");

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
