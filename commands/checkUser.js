var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "checkUser",
    description: "Checa o usuário selecionado. Uso: !checkUser Usuário",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID))
        {
            utility.violation(information);
            return;
        }
        
        if (args[0])
        {
            var mid = utility.memberGetIDByName(args[0]);
            var date = utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(mid).user.createdAt;
            var dateString = date.getDay() + "/" + date.getMonth() + "/" + date.getYear();
            if (mid)
            {

                utility.sendMessage({
                    to: information.channelID,
                    message: "Data de criação da conta de " + args[0] + ": " + dateString
                });   
            }
        }
    }
});
