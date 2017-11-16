var utility = require("../botmodules/utility.js");

utility.commandAdd({
    name: "feedback",
    description: "Manda feedback para a staff sobre o servidor(uso: !feedback Texto)",
    staffOnly: false,
    callback: function (args, information) {
      if(args[1]) {
        var feedbackContent = "";
        for(i=0;i<args.length;i++) {
          feedbackContent+= args[i];
          feedbackContent+= " ";
        }
        utility.reply("Obrigado, " + "<@!" + information.userID + ">, sua sugestão foi enviada.", information);
        utility.data.bindedBot.sendMessage({
          to: "380741188275273729",
          message: "Feedback do " + information.user + ": ```" + feedbackContent + "```"
        });
      }
    }
});
