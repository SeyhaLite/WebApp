/*CMD
  command: getRef
  help: Fetch referral data for the user
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
var referrals = Libs.ReferralLib.getReferrals(userId);
var earned = Libs.ReferralLib.getEarnedBalance(userId) || 0;
var refData = referrals.map(r => ({
  name: r.first_name,
  username: r.username || "N/A",
  balance: Libs.ResourcesLib.userRes("balance", r.telegramid).value() || 0
}));
response.send({ referrals: refData, earned: earned });