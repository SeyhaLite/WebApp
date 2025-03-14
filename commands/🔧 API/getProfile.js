/*CMD
  command: getProfile
  help: Fetch user profile data
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
var refTotal = Libs.ReferralLib.getReferrals(userId).length;
var userData = Bot.getProperty("userData", {});
var userInfo = userData[userId] || { name: "Anonymous", username: "N/A" };

response.send({
  balance: balance || 0,
  refTotal: refTotal,
  name: userInfo.name,
  username: userInfo.username
});