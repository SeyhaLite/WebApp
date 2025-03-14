// Command: getTop
if (request.method == 'GET' && request.query.secret == bot.secret) {
  var allUsers = Bot.getProperty("userData", "json", {});
  var miningTop = [];
  var balanceTop = [];
  for (var userId in allUsers) {
    var userData = allUsers[userId];
    miningTop.push({ user: userData.name || "Anonymous", value: userData.miningClicks || 0 });
    balanceTop.push({ user: userData.name || "Anonymous", value: Libs.ResourcesLib.userRes("balance", userId).value() || 0 });
  }
  miningTop.sort((a, b) => b.value - a.value);
  balanceTop.sort((a, b) => b.value - a.value);
  response.send({ miningTop: miningTop.slice(0, 50), balanceTop: balanceTop.slice(0, 50) });
}