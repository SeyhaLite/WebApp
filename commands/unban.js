// Command: unban
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  Bot.setProperty("banned_" + userId, false, "boolean");
  Bot.sendMessage(userId, "You have been unbanned by the admin.");
}