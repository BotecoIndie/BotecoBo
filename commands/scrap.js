var utility = require("../botmodules/utility.js");

var scraps = [];

utility.commandAdd({
    name: "scrap",
    description: "Envia uma mensagem para um usuário. Uso: !scrap User Msg",
    staffOnly: false,
    callback: function (args, information) {
        if (args[0] && args[1]) {
            var to = undefined;
            if (utility.isUserMention(args[0])) {
                to = utility.convertMentionToUser(args[0]);
                console.log(to);
            } else {
                const uid = utility.memberGetIDByName(args[0]);
                console.log("id:" + uid);
                to = utility.getMemberProperties(uid);
            }
            if (to) {
                var message = "";
                for (i = 1; i < args.length; ++i) {
                    message += " ";
                    message += args[i];
                }
                var scrapObject = {
                    message: message,
                    to: to,
                    user: utility.getMemberProperties(information.userID)
                };
                scraps.push(scrapObject);
                utility.reply("Tudo bem, <@!" + information.userID + "> , eu darei seu recado(espero)", information);
            } else {
                utility.reply("Desculpa, mas não consegui achar o usuário que você pediu", information);
            }

        }
    }
});

utility.listenerAdd(function (information) {
    console.log('listener called');
    console.log(scraps.length);
    for (i = 0; i < scraps.length; ++i) {
        if (scraps[i].to.id == information.userID) {
            utility.reply("Recado para você, <@!" + information.userID + "> de <@!" + scraps[i].user.id + "> : " + scraps[i].message, information);
            scraps.splice(i, 1);
        }
    }
});
