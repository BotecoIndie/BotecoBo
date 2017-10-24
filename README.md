# BotecoBo  - V 1.0



## Utility module members
`roleGetNameByID(roleID)` - With this function you can get the name of a role by id(specified in roleID).

`roleGetIDByName(roleName)` - This allows you get ID of a role by name(specified in roleName).

`memberGetIDByName(username)` - With this you can get ID of any user(regardless if it is either nick or real Discord username) specified by username.

`userGetRoles(userID)` - With this you can you get an array of roles of determined user id.

`getMemberRoles(userID)` - It do the same of fDiscord.userGetRoles(), well.. I don't know why I did it.

`getRolePropertiesByName(roleName)` - With it, you can get the properties of a role by name(specified in roleName field).

`getRolePropertiesByID(roleID)` - This do same thing of fDiscord.getPropertiesByName(), but with ID(specified in roleID field).

`isUserMention(text)` - This allows you to check if determined text is an user mention(specified in text field).

`getMemberProperties(id)` - With this you can get properties of determined member by user id(specified in id field).

`convertMentionToUser(text)` - This will convert an user mention in a member properties.

`data.colors` - This will contain the registered colors.

`data.commands` - This will contain our commands.

`data.listeners` - This will contain our listeners(listeners are called ever that a new message is received).

`data.currentServer` - This contains the current server id of bot.

`data.scraps` - This storage all scraps.

`listenerAdd(listener)` - register a listener.

`reply(text, information)` - Reply an user with a message(specified in text field).

`saveData(fname)` - Storage data in a JSON file at name specified in fname field.

`loadData(fname)` - This will load data saved by fBotecoBo.saveData() function.

`bindToServer(serverID)` - This will bind bot to server specified in serverID field.

`updateColorFile()` - This will update "colors.jpg" file(that contains the colors stored by fBotecoBo.data.colors member).

`commandAdd(information, callback)` - This will register a command in bot. Information is an object with "name", "description", "staffOnly" and "callback" keys.

The callback is called with following parameters:

args        - An array that contain the arguments of the command(splitted by space).

information - This contain the information of received message, which is:
{

  userID,     //contain the id of user
  
  message,    //contain the text of message
  
  event,      //contain the event of the message.
  
  channelID,  //contain the id of the channel in which the message has been received.
  
  user       //an object that has the general information of user.

}

`commandRemove(command)` - This will remove determined command by name specified in fBotecoBo.commandAdd() function.

Callbacks has an information of message and that is passed in information argument of callback.

`process(information)` - This will process the message and also call the callback.

`checkRole(roleName, userID)` - This will check if a determined user(specified by an id in userID) has determined role by the name of this(specified in roleName field).

`changeUserColor(uid, role)` - This will change the color of an user(specified by his id in uid field) to a role color specified in role field.

`output(text)` - This will print the fBotecoBo.data on console and send a message with this in bot output channel.

# Discord:

https://discord.gg/sPsp7qv
