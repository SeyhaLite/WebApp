// Command: getProfile
if (request.method == 'GET' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  var res = Libs.ResourcesLib.userRes("balance", userId);
  var refTotal = Libs.ReferralLib.getReferrals(userId).length;
  var userData = Bot.getProperty("userData", "json", {});
  response.send({
    balance: res.value(),
    refTotal: refTotal,
    name: userData[userId]?.name || "Anonymous",
    username: userData[userId]?.username || "N/A"
  });
}