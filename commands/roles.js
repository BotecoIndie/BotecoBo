var utility = require("../botmodules/utility.js");

utility.commandAdd({
  name: "roles",
  description: "Envia os cargos de habilidades ao usuário. Uso: !roles",
  staffOnly: false,
  callback: function(args, information) {
    var roleNames = [];
    var messaget = "Lista dos cargos disponíveis: :heart: ```css\n";
    for(var i=0; i < utility.data.roles.length; ++i) {
      messaget += utility.roleGetNameByID(utility.data.roles[i]) + "\n";
    }
    messaget+="```";
    utility.sendMessage({
      to: information.userID,
      message: messaget
    });
  }
});
