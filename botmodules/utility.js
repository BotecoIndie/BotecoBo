var jsonfile = require("jsonfile"),
    path = require("path"),
    fs = require("fs"),
    jimp = require("jimp");

var exports = module.exports = {
    data: {
        colors: [
        "285141552056238090",
        "285141479641317377",
        "285138761690382357",
        "285138592257277953",
        "285138029004193792",
        "285137773961412613",
        "285137408691929090",
        "285130625760100352",
        "284840931394322432",
        "284838208863207425",
        "284838162164088833",
        "284838120430764032",
        "284838028390825984",
        "284837475011002368",
        "284838098544754688",
        "285141212250243072"
        ],
        commands: [],
        listeners: [],
        currentServer: undefined,
        scraps: [],//
        bindedBot: undefined
    },
    bindBot:    function (bbot) {
        exports.data.bindedBot = bbot;
    },
    listenerAdd: function (listener) {
        exports.data.listeners.push(listener);
    },
    reply: function(text, information) {
        exports.data.bindedBot.sendMessage({
            to: information.channelID,
            message: text
        });
    },
    saveData: function (fname) {
        var object = {};
        object["colors"] = exports.data.colors;
        object["kickStanleyTimes"] = exports.data.kickStanleyTimes;
        fs.writeFile(path.resolve(__dirname, fname), JSON.stringify(object, null, 4));
    },
    loadData: function (fname) {
        var ex = fs.existsSync(path.resolve(__dirname, fname));
        if (ex) {
            var data = fs.readFileSync(path.resolve(__dirname, fname));
            var jsonP = JSON.parse(data);
            exports.data.colors = jsonP.colors;
            exports.data.kickStanleyTimes = jsonP.kickStanleyTimes;
        }
    },
    bindToServer: function (serverID) {
        exports.data.currentServer = serverID;
    },
    violation: function (information) {
        exports.data.bindedBot.sendMessage({
            to: information.channelID,
            message: "`Você não tem permissão pra isso, bobinho`:heart:"
        });
    },
    updateColorFile: function () {
        const quadSize = 200;
        const imgWidth = quadSize * Math.ceil(Math.sqrt(exports.data.colors.length));
        const hLen = Math.sqrt(exports.data.colors.length);
        const imgHeight = quadSize * Math.ceil((exports.data.colors.length / 2.0 != Math.floor(exports.data.colors.length / 2.0)) ? hLen - 1 : hLen);
        const margin = 48;
        var image = new jimp(imgWidth, imgHeight, function (err, image) {
            if (err) {
                console.log("failure");
                console.log(err);
                exports.output("Jimp Error: " + err);
            } else {
                image.quality(100);
                image.background(jimp.rgbaToInt(255, 255, 255, 255));
                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(function (font) {
                    // I dont know what happening here
                    jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(function (font2) {
                        var index = 0;
                        for (y = 0; y < imgHeight; y += quadSize) {
                            for (x = 0; x < imgWidth; x += quadSize) {
                                if (index >= exports.data.colors.length) {//
                                    break;
                                }
                                var roleProperties = exports.getRolePropertiesByID(exports.data.colors[index]);
                                if (!roleProperties) {
                                    exports.output("No role \"" + exports.data.colors[index] + "\" found");
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
                        image.write(path.resolve(__dirname, "../content/colors.png"), function (err) {
                            if (err) {
                                exports.output(err);
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
        exports.data.commands.push({
            command: information.name,
            description: information.description,
            staffOnly: information.staffOnly,
            callback: information.callback
        });
    },
    commandRemove: function (command) {
        for (i = 0; i < exports.data.commands.length; ++i) {
            if (exports.data.commands[i].command == command) {
                exports.data.commands.splice(i, 1);
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
                for (i = 0; i < exports.data.commands.length; ++i) {
                    if (exports.data.commands[i].command.toLowerCase() == msgSplit[0].toLowerCase()) {
                        msgSplit.splice(0, 1);
                        exports.data.commands[i].callback((msgSplit) ? msgSplit : "", information);
                        break;
                    }
                }
            }
        }
        exports.data.listeners.forEach(function (item, index, array) {
            item(information);
        });
    },
    checkRole: function (roleName, userID) {
           var rl = exports.getRolePropertiesByName(roleName);
            var idx = exports.getMemberRoles(userID).indexOf(rl.id);
            return idx!=-1;
        },
    changeUserColor: function (uid, role) {
        var userRoles = exports.getMemberRoles(uid);
        var roleColor = {
            serverID: exports.data.currentServer,
            userID: uid,
            roleID: exports.roleGetIDByName(role)
        };

        if (roleColor.roleID == undefined)
        {
          return;
        }
        for (i = 0; i < userRoles.length; ++i) {

          if (exports.data.colors.indexOf(userRoles[i]) != -1) {
              var obj = {
                serverID: exports.data.currentServer,
                userID: uid,
                roleID: userRoles[i]
            };
            exports.data.bindedBot.removeFromRole(obj, function (err, res) {
              if (err) {
                console.log(JSON.stringify(obj));
                exports.output(err);
                throw err;
              }
          });
        }
      }
      if (role.toLowerCase() != "staff" && exports.data.colors.indexOf(roleColor.roleID) != -1)
        {
          exports.data.bindedBot.addToRole(roleColor, function (err, res) {
            if (err) {
              throw err;
              }
        });
      }
    },
    output: function (text) {
        exports.data.bindedBot.sendMessage({
            to: "286314605163053057", // Bot Output Channel ID
            message: text
        })
    },
    roleGetNameByID: function (roleID) {
        var roles = exports.data.bindedBot.servers[exports.data.currentServer]["roles"];
        var res = undefined;
        res = roles[(typeof (roleID) != "string") ? roleID.toString() : roleID];
        var result = undefined;
        if (res) {
            result = res.name;
        }
        return result;
    },
    roleGetIDByName: function (roleName) {
        var roles = exports.data.bindedBot.servers[exports.data.currentServer]["roles"];
        var keys = Object.keys(roles);
        var rid = undefined;
        for (i = 0; i < keys.length; ++i) {
            if (roles[keys[i]].name.toLowerCase() == roleName.toLowerCase()) {
                rid = roles[keys[i]].id;
                break;
            }
        }
        return rid;
    },
    memberGetIDByName: function (username) {
        console.log(exports.data.bindedBot.users);
        var keys = Object.keys(exports.data.bindedBot.servers[exports.data.currentServer].members);
        for (i = 0; i < keys.length;++i ) {
             var member = exports.data.bindedBot.servers[exports.data.currentServer].members[keys[i]];
            if(member.nick) {
                if(member.nick == username) {
                    return member.id;
                }
            }
        }
        keys = Object.keys(exports.data.bindedBot.users);
        for (i = 0; i < keys.length; ++i) {
            var member = exports.data.bindedBot.users[keys[i]];
            console.log(member);
            if (member) {
                if (member.username == username) {
                    return member.id;
                }
            }
        }
        return undefined;
    },
    userGetRoles: function (userID) {
        return exports.data.bindedBot.servers[exports.data.currentServer].members[userID].roles;
    },
    getMemberRoles: function (userID) {
        return exports.data.bindedBot.servers[exports.data.currentServer].members[userID].roles;
    },
    getRolePropertiesByName: function (roleName) {
        return exports.getRolePropertiesByID(exports.roleGetIDByName(roleName));
    },
    getRolePropertiesByID: function (roleID) {
        return exports.data.bindedBot.servers[exports.data.currentServer].roles[roleID];
    },
    isUserMention: function (text) {
        if (text.substr(0, 2) == "<@") {
            return true;
            return true;
        }
        return false;
    },
    getMemberProperties: function (id) {
        return exports.data.bindedBot.servers[exports.data.currentServer].members[id];
    },
    convertMentionToUser: function (text) {
        var begIndex = undefined;
        var endIndex = undefined;
        for (i = 0; i < text.length; ++i) {
            if (!isNaN(text.substr(i, 1))) {
                begIndex = i;
                break;
            }
        }
        endIndex = text.length - 1;
        console.log("result: " + text.substr(begIndex, endIndex));
        console.log("sauce:  " + text);
        return exports.getMemberProperties(text.substring(begIndex, endIndex));
    }
};