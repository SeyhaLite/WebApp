/*CMD
  command: getTop
  help: Fetch top users for mining and balance rankings
  need_reply: false
  auto_retry_time: 0
  folder: 🔧 API
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (request.method != 'GET' || request.query.secret != bot.secret) {
  response.send({ error: "Unauthorized access" });
  return;
}

var userData = Bot.getProperty("userData", {});
var miningTop = Libs.TopBoardLib.getTopUsers("miningClicks", 50, userData);
var balanceTop = Libs.TopBoardLib.getTopUsers("balance", 50, userData, (userId) => Libs.ResourcesLib.userRes("balance", userId).value() || 0);

response.send({ miningTop, balanceTop });