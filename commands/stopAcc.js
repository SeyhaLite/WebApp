// Command: stopAcc
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  Bot.setProperty("stopped_" + userId, true, "boolean");
  Bot.sendMessage(userId, "Your account has been stopped by the admin.");
}