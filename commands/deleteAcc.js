// Command: deleteAcc
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  Libs.ResourcesLib.userRes("balance", userId).set(0);
  Bot.setProperty("deleted_" + userId, true, "boolean");
  Bot.sendMessage(userId, "Your account has been deleted by the admin.");
}