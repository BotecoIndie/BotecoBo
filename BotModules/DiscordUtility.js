var deps = require("./Deps.js");
var BotecoBo = require("./BotUtility.js");

module.exports = {
    roleGetNameByID: function (roleID) {
        var roles = BotecoBo.bot.servers[BotecoBo.data.currentServer]["roles"];
        var res = undefined;
        res = roles[(typeof (roleID) != "string") ? roleID.toString() : roleID];
        var result = undefined;
        if (res) {
            result = res.name;
        }
        return result;
    },
    roleGetIDByName: function (roleName) {
        var roles = BotecoBo.bot.servers[BotecoBo.data.currentServer]["roles"];
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
        console.log(BotecoBo.bot.users);
        var keys = Object.keys(BotecoBo.bot.servers[BotecoBo.data.currentServer].members);
        for (i = 0; i < keys.length; ++i) {
            var member = BotecoBo.bot.servers[BotecoBo.data.currentServer].members[keys[i]];
            if (member.nick) {
                if (member.nick == username) {
                    return member.id;
                }
            }
        }
        keys = Object.keys(BotecoBo.bot.users);
        for (i = 0; i < keys.length; ++i) {
            var member = BotecoBo.bot.users[keys[i]];
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
        return BotecoBo.bot.servers[BotecoBo.data.currentServer].members[userID].roles;
    },
    getMemberRoles: function (userID) {
        return BotecoBo.bot.servers[BotecoBo.data.currentServer].members[userID].roles;
    },
    getRolePropertiesByName: function (roleName) {
        return fDiscord.getRolePropertiesByID(fDiscord.roleGetIDByName(roleName));
    },
    getRolePropertiesByID: function (roleID) {
        return BotecoBo.bot.servers[BotecoBo.data.currentServer].roles[roleID];
    },
    isUserMention: function (text) {
        if (text.substr(0, 2) == "<@") {
            return true;
            return true;
        }
        return false;
    },
    getMemberProperties: function (id) {
        return BotecoBo.bot.servers[BotecoBo.data.currentServer].members[id];
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
        return fDiscord.getMemberProperties(text.substring(begIndex, endIndex));
    }
};
