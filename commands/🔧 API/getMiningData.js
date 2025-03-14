/*CMD
  command: getMiningData
  help: Fetch mining data for the user
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

if (Libs.Guard.isBlocked(request.query.userId) || Bot.getProperty("stopped_" + request.query.userId, false)) {
  response.send({ error: "Account restricted" });
  return;
}

var userId = request.query.userId;
var balance = Libs.ResourcesLib.userRes("balance", userId).value();
var energy = Libs.ResourcesLib.userRes("energy", userId).value();
var perClick = Libs.ResourcesLib.userRes("perClick", userId).value();
var upgrades = User.getProperty("upgrades", { perClick: { level: 0 } }, "json");

response.send({
  balance: balance || 0,
  energy: energy || 1000,
  perClick: perClick || 1,
  perClickLevel: upgrades.perClick?.level || 0,
  upgradeConfig: Bot.getProperty("upgradeConfig", {
    maxLevel: 5,
    levels: {
      l1: { cost: 10, perClick: 1 },
      l2: { cost: 20, perClick: 2 },
      l3: { cost: 30, perClick: 3 },
      l4: { cost: 40, perClick: 4 },
      l5: { cost: 50, perClick: 5 }
    }
  })
});