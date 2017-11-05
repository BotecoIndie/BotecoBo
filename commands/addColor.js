var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "addColor",
    description: "Marca o cargo como cor. Uso: !addColor Cargo",
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
                if (utility.data.colors.indexOf(rid) == -1) {
                    utility.data.colors.push(rid);
                    utility.updateColorFile();
                    utility.saveData("./content/data.json");
                    utility.reply("Consegui! A cor \"" + args[0] + "\" foi adicionada com sucesso!", information);
                } else {
                    utility.reply("Desculpa, mas já existe uma cor chamada \"" + args[0] + "\" na listinha <:badday:273230212651548672>", information);
                }
            } else {
                utility.reply("Não consegui obter a id da role \"" + args[0] + "\".. Você se certificou de digitar o nome correto?", information);
            }
        }
    }
});
