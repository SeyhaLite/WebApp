// Command: withdraw
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  var airdropSettings = Bot.getProperty("airdropSettings", "json");
  var res = Libs.ResourcesLib.userRes("balance", userId);
  if (res.value() >= airdropSettings.withdrawAmount) {
    res.minus(airdropSettings.withdrawAmount);
    Bot.sendMessage(userId, "Withdrawal of " + airdropSettings.withdrawAmount + " " + airdropSettings.currency + " processed.");
  }
}