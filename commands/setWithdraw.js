// Command: setWithdraw
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var airdropSettings = Bot.getProperty("airdropSettings", "json");
  airdropSettings.withdrawAmount = parseInt(request.query.amount);
  Bot.setProperty("airdropSettings", airdropSettings, "json");
}