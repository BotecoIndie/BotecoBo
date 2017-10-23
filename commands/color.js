var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "color",
    description: "Troca a cor do nome de usuário. Uso: !color Cor",
    staffOnly: false,
    callback: function (args, information) {
        if (args[0]) {
            utility.changeUserColor(information.userID, args[0]);
        }
    }
});
