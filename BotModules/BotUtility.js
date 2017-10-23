var deps = require("./Deps.js")
var discord = require("./DiscordUtility.js");

module.exports = {
    bot : new deps.Discord.Client({autorun: true,
        token: process.env.DISCORD_TOKEN,
        messageCacheLimit: null
    }),
    data: {
        colors: [
        '357972750448721922',
        '353201730613149696',
        '347591766175645696',
        '285141552056238090',
        '285141479641317377',
        '285141212250243072',
        '285138761690382357',
        '285138592257277953',
        '285138029004193792',
        '285137773961412613',
        '285137408691929090',
        '285130625760100352',
        '284840931394322432',
        '284838208863207425',
        '284838162164088833',
        '284838120430764032',
        '284838098544754688',
        '284838028390825984',
        '284837475011002368'
        ],
        commands: [],
        listeners: [],
        currentServer: undefined,
        scraps: []
    },
    listenerAdd: function (listener) {
        fBotecoBo.data.listeners.push(listener);
    },
    reply: function(text, information) {
        bot.sendMessage({
            to: information.channelID,
            message: text
        });
    },
    saveData: function (fname) {
        var object = {};
        object["colors"] = fBotecoBo.data.colors;
        object["kickStanleyTimes"] = fBotecoBo.data.kickStanleyTimes;
        fs.writeFile(path.resolve(__dirname, fname), JSON.stringify(object, null, 4));
    },
    loadData: function (fname) {
        var ex = fs.existsSync(path.resolve(__dirname, fname));
        if (ex) {
            var data = fs.readFileSync(path.resolve(__dirname, fname));
            var jsonP = JSON.parse(data);
            fBotecoBo.data.colors = jsonP.colors;
            fBotecoBo.data.kickStanleyTimes = jsonP.kickStanleyTimes;
        }
    },
    bindToServer: function (serverID) {
        fBotecoBo.data.currentServer = serverID;
    },
    violation: function (information) {
        bot.sendMessage({
            to: information.channelID,
            message: "`Você não tem permissão pra isso, bobinho`:heart:"
        });
    }, //
    updateColorFile: function () {
        const quadSize = 200;
        console.log(fBotecoBo.data.colors.length);
        const imgWidth = quadSize * Math.ceil(Math.sqrt(fBotecoBo.data.colors.length));
        const hLen = Math.sqrt(fBotecoBo.data.colors.length);
        const imgHeight = quadSize * Math.ceil((fBotecoBo.data.colors.length / 2.0 != Math.floor(fBotecoBo.data.colors.length / 2.0)) ? hLen - 1 : hLen);
        const margin = 48;
        var image = new jimp(imgWidth, imgHeight, function (err, image) {
            if (err) {
                console.log("failure");
                console.log(err);
                fBotecoBo.output("Jimp Error: " + err);
            } else {
                image.quality(100);
                image.background(jimp.rgbaToInt(255, 255, 255, 255));
                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(function (font) {
                    // I dont know what happening here
                    jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(function (font2) {
                        var index = 0;
                        for (y = 0; y < imgHeight; y += quadSize) {
                            for (x = 0; x < imgWidth; x += quadSize) {
                                if (index >= fBotecoBo.data.colors.length) {
                                    break;
                                }
                                var roleProperties = discord.getRolePropertiesByID(fBotecoBo.data.colors[index]);
                                if (!roleProperties) {
                                    fBotecoBo.output("No role \"" + fBotecoBo.data.colors[index] + "\" found");
                                } else {
                                    var roleColor = jimp.intToRGBA(roleProperties.color);
                                    console.log(roleProperties.name + " : " + JSON.stringify(roleColor) + " : " + roleProperties.color);

                                    image.scan(x, y, quadSize, quadSize, function (x, y, idx) {
                                        this.bitmap.data[idx + 0] = roleColor.g;
                                        this.bitmap.data[idx + 1] = roleColor.b;
                                        this.bitmap.data[idx + 2] = roleColor.a;
                                        this.bitmap.data[idx + 3] = 255;
                                    });
                                    var tfont = font;
                                    if (roleColor.g + roleColor.b + roleColor.a < 40) {
                                        tfont = font2;
                                    }
                                    image.print(tfont, ((16 * roleProperties.name.length) < quadSize) ? x + (quadSize - 16 * roleProperties.name.length) / 2 : x, y, roleProperties.name, quadSize);
                                    image.scan(x, y, quadSize, quadSize, function (x, y, idx) {
                                        if (this.bitmap.data[idx + 0] != roleColor.g && this.bitmap.data[idx + 1] != roleColor.b && this.bitmap.data[idx + 2] != roleColor.a) {
                                            this.bitmap.data[idx + 0] = (255 - roleColor.g);
                                            this.bitmap.data[idx + 1] = (255 - roleColor.b);
                                            this.bitmap.data[idx + 2] = (255 - roleColor.a);
                                        }
                                    });
                                    ++index;
                                }
                            }
                        }
                        image.write(__dirname + "/colors.png", function (err) {
                            if (err) { //
                                fBotecoBo.output(err);
                                throw err;
                            } else {
                                console.log("done");
                            }
                        });
                    });
                });
            }
        });
    },
    commandAdd: function (information) {
        fBotecoBo.data.commands.push({
            command: information.name,
            description: information.description,
            staffOnly: information.staffOnly,
            callback: information.callback
        });
    },
    commandRemove: function (command) {
        for (i = 0; i < fBotecoBo.data.commands.length; ++i) {
            if (fBotecoBo.data.commands[i].command == command) {
                fBotecoBo.data.commands.splice(i, 1);
                break;
            }
        }
    },
    process: function (information) {
        var message = information.message;
        message.toLowerCase();
        if (message.substr(0, 1) == "!") {
            var messageWithoutPrefix = message.substr(1, message.length - 1);
            console.log(messageWithoutPrefix);
            var msgSplit = messageWithoutPrefix.split(" ");
            if (msgSplit[0]) {
                for (i = 0; i < fBotecoBo.data.commands.length; ++i) {
                    if (fBotecoBo.data.commands[i].command.toLowerCase() == msgSplit[0].toLowerCase()) {
                        msgSplit.splice(0, 1);
                        fBotecoBo.data.commands[i].callback((msgSplit) ? msgSplit : "", information);
                        break;
                    }
                }
            }
        }
        fBotecoBo.data.listeners.forEach(function (item, index, array) {
            item(information);
        });
    },
    checkRole: function (roleName, userID) {
        var rl = discord.getRolePropertiesByName(roleName);
        var idx = discord.getMemberRoles(userID).indexOf(rl.id);
        return idx != -1;
    },
    changeUserColor: function (uid, role) {
        var userRoles = discord.getMemberRoles(uid);
        var roleColor = {
            serverID: fBotecoBo.data.currentServer,
            userID: uid,
            roleID: discord.roleGetIDByName(role)
        };

        if (roleColor.roleID == undefined) {
            return;
        }
        for (i = 0; i < userRoles.length; ++i) {

            if (fBotecoBo.data.colors.indexOf(userRoles[i]) != -1) {
                var obj = {
                    serverID: fBotecoBo.data.currentServer,
                    userID: uid,
                    roleID: userRoles[i]
                };
                bot.removeFromRole(obj, function (err, res) {
                    if (err) {
                        console.log(JSON.stringify(obj));
                        fBotecoBo.output(err);
                        throw err;
                    }
                });
            }
        }
        if (role.toLowerCase() != "staff" && fBotecoBo.data.colors.indexOf(roleColor.roleID) != -1) {
            bot.addToRole(roleColor, function (err, res) {
                if (err) {
                    throw err;
                }
            });
        }
    },
    output: function (text) {
        bot.sendMessage({
            to: "286314605163053057", // Bot Output Channel ID
            message: text
        })
    }
};
