// Command: setAirdropName
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var airdropSettings = Bot.getProperty("airdropSettings", "json");
  airdropSettings.name = request.query.name;
  Bot.setProperty("airdropSettings", airdropSettings, "json");
}