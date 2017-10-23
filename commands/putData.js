var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "putData",
    description: "Imprime os dados do bot no #bot_output. Uso: !putData",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        var val = JSON.stringify(utility.data, null, 4);
        console.log(val);
        utility.output('```json\n' + val + "```");
    }
});
