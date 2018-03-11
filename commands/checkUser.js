var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "checkUser",
    description: "Checa o usuário selecionado. Uso: !checkUser userId",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID))
        {
            utility.violation(information);
            return;
        }
        
        if (args[0])
        {
            var mid = args[0];
            var date = utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(mid).user.createdAt;
            var username = utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(mid).user.username;
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!

            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var dateStr = dd + '/' + mm + '/' + yyyy;
            if (mid)
            {

                utility.sendMessage({
                    to: information.channelID,
                    message: "Data de criação da conta de " + args[0] + ": " + dateStr
                });   
            }
        }
    }
});
