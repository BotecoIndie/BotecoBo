var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "cookies",
    description: "É.",
    staffOnly: false,
    callback: function (args, information) {
        utility.sendMessage({
            to: information.channelID,
            message: "https://streamable.com/joqi8"
        });
    }
});
