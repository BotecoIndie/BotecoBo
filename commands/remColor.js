var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "remColor",
    description: "Remove o cargo como cor. Uso: !remColor Cargo",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        if (args[0]) {
            var rid = utility.roleGetIDByName(args[0]);
            if (rid) {
                console.log(utility.data.bindedBot.servers[utility.data.currentServer].roles);
                var pos = utility.data.colors.indexOf(rid)
                if (pos != -1) {
                    utility.data.colors.splice(pos, 1);
                    utility.updateColorFile();
                    utility.saveData("../content/data.json");
                    utility.reply("A cor \"" + args[0] + "\" foi removida com sucesso!", information);
                } else {
                    utility.reply("Desculpa, não consegui encontrar nenhuma cor chamada \"" + args[0] + "\" na listinha de cores <:badday:273230212651548672>", information);
                }
            } else {
                utility.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
            }
        }
    }
});
