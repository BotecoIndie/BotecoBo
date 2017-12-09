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
        utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(roleColor.userID).addRole(roleColor.roleID).then(function(){console.log('Sucesso')});
      }
      break;
      case "remove":
      if (args[1].toLowerCase() != "staff" && utility.data.roles.indexOf(roleColor.roleID) != -1)
      {
        utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(roleColor.userID).removeRole(roleColor.roleID).then(function(){console.log('Sucesso')});
      }
      break;
      default:
      return;
    }
  }
});
