var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "remRole",
    description: "Remove o cargo como habilidade. Uso: !remRole Cargo",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        if (args[0]) {
            var rid = utility.roleGetIDByName(args[0]);
            if (rid) {
              if (utility.data.roles == undefined)
              {
                utility.data.roles = [];
              }
                console.log(utility.data.bindedBot.servers[utility.data.currentServer].roles);
                var pos = utility.data.roles.indexOf(rid)
                if (pos != -1) {
                    utility.data.roles.splice(pos, 1);
                    utility.saveData("./content/data.json");
                    utility.reply("O cargo \"" + args[0] + "\" foi removido com sucesso!", information);
                } else {
                    utility.reply("Desculpa, não consegui encontrar nenhum cargo chamado \"" + args[0] + "\" na listinha <:badday:273230212651548672>", information);
                }
            } else {
                utility.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
            }
        }
    }
});
