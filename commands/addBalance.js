// Command: addBalance
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  var amount = parseInt(request.query.amount);
  Libs.ResourcesLib.userRes("balance", userId).add(amount);
  Bot.sendMessage(userId, "Admin added " + amount + " " + Bot.getProperty("airdropSettings", "json").currency + " to your balance.");
}
