// Command: cutBalance
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  var amount = parseInt(request.query.amount);
  Libs.ResourcesLib.userRes("balance", userId).minus(amount);
  Bot.sendMessage(userId, "Admin deducted " + amount + " " + Bot.getProperty("airdropSettings", "json").currency + " from your balance.");
}