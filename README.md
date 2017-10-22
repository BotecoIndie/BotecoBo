# BotecoBo  - V 0.9

Public repository of the bot previously developed by GoldenBunny for BotecoIndie.

## Discord functions
`fDiscord.roleGetNameByID(roleID)` - With this function you can get the name of a role by id(specified in roleID).

`fDiscord.roleGetIDByName(roleName)` - This allows you get ID of a role by name(specified in roleName).

`fDiscord.memberGetIDByName(username)` - With this you can get ID of any user(regardless if it is either nick or real Discord username) specified by username.

`fDiscord.userGetRoles(userID)` - With this you can you get an array of roles of determined user id.

`fDiscord.getMemberRoles(userID)` - It do the same of fDiscord.userGetRoles(), well.. I don't know why I did it.

`fDiscord.getRolePropertiesByName(roleName)` - With it, you can get the properties of a role by name(specified in roleName field).

`fDiscord.getRolePropertiesByID(roleID)` - This do same thing of fDiscord.getPropertiesByName(), but with ID(specified in roleID field).

`fDiscord.isUserMention(text)` - This allows you to check if determined text is an user mention(specified in text field).

`fDiscord.getMemberProperties(id)` - With this you can get properties of determined member by user id(specified in id field).

`fDiscord.convertMentionToUser(text)` - This will convert an user mention in a member properties.

## Bot data

`fBotecoBo.data.colors` - This will contain the registered colors.

`fBotecoBo.data.commands` - This will contain our commands.

`fBotecoBo.data.listeners` - This will contain our listeners(listeners are called ever that a new message is received).

`fBotecoBo.data.currentServer` - This contains the current server id of bot.

`fBotecoBo.data.scraps` - This storage all scraps.

## Bot functions

`fBotecoBo.listenerAdd(listener)` - register a listener.

`fBotecoBo.reply(text, information)` - Reply an user with a message(specified in text field).

`fBotecoBo.saveData(fname)` - Storage data in a JSON file at name specified in fname field.

`fBotecoBo.loadData(fname)` - This will load data saved by fBotecoBo.saveData() function.

`fBotecoBo.bindToServer(serverID)` - This will bind bot to server specified in serverID field.

`fBotecoBo.updateColorFile()` - This will update "colors.jpg" file(that contains the colors stored by fBotecoBo.data.colors member).

`fBotecoBo.commandAdd(information, callback)` - This will register a command in bot. Information is an object with "name", "description" and "staffOnly" keys. The callback function is specified in callback field.

`fBotecoBo.commandRemove(command)` - This will remove determined command by name specified in fBotecoBo.commandAdd() function.

Callbacks has an information of message and that is passed in information argument of callback.

`fBotecoBo.process(information)` - This will process the message and also call the callback.

`fBotecoBo.checkRole(roleName, userID)` - This will check if a determined user(specified by an id in userID) has determined role by the name of this(specified in roleName field).

`fBotecoBo.changeUserColor(uid, role)` - This will change the color of an user(specified by his id in uid field) to a role color specified in role field.

`fBotecoBo.output(text)` - This will print the fBotecoBo.data on console and send a message with this in bot output channel.

# Discord:

https://discord.gg/sPsp7qv
