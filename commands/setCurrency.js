// Command: setCurrency
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var airdropSettings = Bot.getProperty("airdropSettings", "json");
  airdropSettings.currency = request.query.currency;
  Bot.setProperty("airdropSettings", airdropSettings, "json");
}