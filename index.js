//CONSERTAR O PURGE E O COLORS
var got = require('got'),
    Discord = require('discord.js'),
    utility = require('./botmodules/utility.js'),
    path = require("path"),
    fs = require('fs');

var setup = JSON.parse(fs.readFileSync('./setup.json'));
var commanddir = setup.commanddir;

//Load all command modules
fs.readdir(commanddir, (err, files) => {
    if (!err) {
        console.log("loading command scripts...");
        files.forEach(file => {
            console.log(file);
            require(commanddir + file);
        });
    } else {
        throw err;
    }
});

NODE_DEBUG = true;

setTimeout(getRequest, 1000);

function getRequest() {
    got('alwaysonbotecobo.azurewebsites.net')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            console.log(error.response.body);
        });
    setTimeout(getRequest, 600000);
}

var token = process.env.DISCORD_TOKEN || fs.readFileSync(".token",{encoding:'utf8'}).trim();

var bot = new Discord.Client();
utility.bindBot(bot);


utility.data.bindedBot.on('ready', function () {
    try {
        utility.loadData("./content/data.json");
    } catch (exception) {

    }
    utility.bindToServer(bot.guilds.first().id);
    utility.updateColorFile();
    console.log(utility.data.bindedBot.guilds.get(utility.data.currentServer).roles.array());
});

utility.data.bindedBot.on('disconnect', function (closeEvent) {
    utility.data.bindedBot.connect();
});

utility.data.bindedBot.on('message', function (message) {
    console.log(message.content);
    var information = {
        message: message.content,
        userID: message.author.id,
        channelID: message.channel.id,
        channel: message.channel,
        event: 0,
        user: message.author
    };
    try {
        utility.process(information);
    } catch(err) {
        utility.output(err);
    }
});

utility.data.bindedBot.on('guildMemberAdd', function(member){
  utility.sendMessage({
      to: "444284949894266900",
      message: "Oi, <@!" + member.id + ">" + " seja bem-vindo ao BotecoIndie! :heart: Que tal falar um pouco de você no <#444284949894266900>? Estamos ansiosos para ter você conosco!"
  });
    var mid = member.id;
    var date = utility.data.bindedBot.guilds.get(utility.data.currentServer).members.get(mid).user.createdAt;
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var dateStr = dd + '/' + mm + '/' + yyyy;
    utility.sendMessage({
        to: "286314605163053057",
        message: "<@!" + member.id + ">" + " entrou. Data de criação da conta: " + dateStr
    });
});

utility.data.bindedBot.on('guildMemberRemove', function(member){
  if (member.id == "234825236296499213") {
      utility.data.kickStanleyTimes++;
      utility.sendMessage({
          to: "285851488625098752",
          message: "<@!" + member.id + ">" + " continua câncer e foi banido pela " + utility.data.kickStanleyTimes + "ª vez"
      });
      utility.saveData("./content/data.json");
  } else {
      utility.sendMessage({
          to: "286314605163053057",
          message: "<@!" + member.id + ">" + " foi embora... <:badday:273230212651548672>"
      });
  }
});

utility.data.bindedBot.on('roleUpdate', function(oldRole,newRole){
  if (utility.data.colors.indexOf(newRole.id) != -1) {
      utility.updateColorFile();
  }
});

utility.data.bindedBot.on('roleDelete', function(role){
  var idx = utility.data.colors.indexOf(role.id);
  if (idx != -1) {
      utility.data.colors.splice(idx, 1);
      utility.updateColorFile();
  }
});

process.on('uncaughtException', function(err) {
  utility.output('Caught exception: ' + err.stack);
  console.log('Caught exception: ' + err.stack);
});

bot.login(token);
