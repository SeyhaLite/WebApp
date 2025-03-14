// Command: getMiningData
if (request.method == 'GET' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  var res = Libs.ResourcesLib.userRes("balance", userId);
  var energy = Libs.ResourcesLib.userRes("energy", userId);
  var perClick = Bot.getProperty("perClick_" + userId, null, 1);
  response.send({
    balance: res.value(),
    energy: energy.value(),
    perClick: perClick
  });
}