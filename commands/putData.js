var utility = require("../botmodules/utility.js");
var pastebinAPI = require("pastebin-js"),
    pastebin = new pastebinAPI('c529af84e0bb548edb96054219d7cbce');

utility.commandAdd({
    name: "putData",
    description: "Imprime os dados do bot no #bot_output. Uso: !putData",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        var nData = {};
        nData.colors = utility.data.colors;
        nData.commands = utility.data.commands;
        nData.kickStanleyTimes = utility.data.kickStanleyTimes;
        var val = JSON.stringify(nData, null, 4);
        pastebin.createPaste({
            text: val,
            title: "botecobo logs",
            format: 'json',
            privacy: 0,
            expiration: 'N'
        }).then(function(data) {
            utility.output(data);
        }).catch(function(err) {
            throw err;
        });
    }
});
