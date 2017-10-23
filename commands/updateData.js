var utility = require('../botmodules/utility.js');

utility.commandAdd({
    name: "updateData",
    description: "Atualiza e salva os dados do Botecobo. Uso: !updateData",
    staffOnly: true,
    callback: function (args, information) {
        if (!utility.checkRole("Staff", information.userID)) {
            utility.violation(information);
            return;
        }
        utility.saveData("content/data.json");
        utility.updateColorFile();
    }
});
