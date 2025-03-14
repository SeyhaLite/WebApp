// Command: ban
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  Bot.setProperty("banned_" + userId, true, "boolean");
  Bot.sendMessage(userId, "You have been banned by the admin.");
}