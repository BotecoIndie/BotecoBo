var utility = require("../botmodules/utility.js");

utility.commandAdd({
  name: "role",
  description: "Adiciona determinado cargo de habilidade ao usuário. Uso: !role add/remove Cargo",
  staffOnly: false,
  callback: function (args, information) {


    if (args[0] == undefined || args[1] == undefined) {
      return;
    }

    var roleColor = {
      serverID: utility.data.currentServer,
      userID: information.userID,
      roleID: utility.roleGetIDByName(args[1])
    };

    if (roleColor.roleID == undefined)
    {
      return;
    }

    if (utility.data.roles == undefined)
    {
      utility.data.roles = [];
    }

    switch(args[0])
    {
      case "add":
      if (args[1].toLowerCase() != "staff" && utility.data.roles.indexOf(roleColor.roleID) != -1)
      {
        utility.data.bindedBot.addToRole(roleColor, function (err, res) {
          if (err) {
            console.log(JSON.stringify(obj));
            throw err;
          }

        });
      }
      break;
      case "remove":
      if (args[1].toLowerCase() != "staff" && utility.data.roles.indexOf(roleColor.roleID) != -1)
      {
        utility.data.bindedBot.removeFromRole(roleColor, function (err, res) {
          if (err) {
            console.log(JSON.stringify(obj));
            throw err;
          }
        });
      }
      break;
      default:
      return;
    }
  }
});
