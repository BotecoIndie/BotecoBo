var got = require('got'),
    Discord = require('discord.io'),
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

var bot = new Discord.Client({
    autorun: true,
    token: token,
    messageCacheLimit: null
});

utility.bindBot(bot);

utility.data.bindedBot.on('ready', function (event) {
    try {
        utility.loadData("./content/data.json");
    } catch (exception) {

    }
    utility.bindToServer(event.d.guilds[0].id);
    utility.updateColorFile();
    console.log(utility.data.bindedBot.servers[utility.data.currentServer]["roles"]);
});

utility.data.bindedBot.on('disconnect', function (errMsg, code) {
    utility.data.bindedBot.connect();
});

utility.data.bindedBot.on('message', function (user, userID, channelID, message, event) {
    console.log(message);
    var information = {
        message: message,
        userID: userID,
        channelID: channelID,
        event: event,
        user: user
    };
    try {
        utility.process(information);
    } catch(err) {
        utility.output(err);
    }//
});

utility.data.bindedBot.on('any', function (event) {
    switch (event.t) {
        case "GUILD_MEMBER_ADD":
            utility.data.bindedBot.sendMessage({
                to: "285851488625098752",
                message: "Oi, <@!" + event.d.user.id + ">" + " seja bem-vindo ao BotecoIndie! :heart:"
            });
            break;
        case "GUILD_MEMBER_REMOVE":
            if (event.d.user.id == "234825236296499213") {
                utility.data.kickStanleyTimes++;
                utility.data.bindedBot.sendMessage({
                    to: "285851488625098752",
                    message: "<@" + event.d.user.id + ">" + " continua câncer e foi banido pela " + utility.data.kickStanleyTimes + "ª vez"
                });
                utility.saveData("./content/data.json");
            } else {
                utility.data.bindedBot.sendMessage({
                    to: "285851488625098752",
                    message: "<@!" + event.d.user.id + ">" + " foi embora... <:badday:273230212651548672>"
                });
            }
            break;
        case "GUILD_ROLE_UPDATE":
            if (utility.data.colors.indexOf(event.d.id) != -1) {
                utility.updateColorFile();
            }
            break;
        case "GUILD_ROLE_REMOVE":
            var idx = utility.data.colors.indexOf(event.d.id);
            if (idx != -1) {
                utility.data.colors.splice(idx, 1);
                utility.updateColorFile();
            }
    }
});

process.on('uncaughtException', function(err) {
  utility.output('Caught exception: ' + err.stack);
  console.log('Caught exception: ' + err.stack);
});
