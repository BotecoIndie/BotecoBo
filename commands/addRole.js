var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "addRole",
    description: "Marca o cargo como habilidade. Uso: !addRole Cargo",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        if (args[0]) {
            var rid = utility.roleGetIDByName(args[0]);
            console.log(rid);
            if (rid) {
                if (utility.data.roles == undefined)
                {
                  utility.data.roles = [];
                }
                if (utility.data.roles.indexOf(rid) == -1) {
                    utility.data.roles.push(rid);
                    utility.saveData("./content/data.json");
                    utility.reply("Consegui! O cargo \"" + args[0] + "\" foi adicionado com sucesso!", information);
                } else {
                    utility.reply("Desculpa, mas já existe um cargo chamado \"" + args[0] + "\" na listinha <:badday:273230212651548672>", information);
                }
            } else {
                utility.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
            }
        }
    }
});
