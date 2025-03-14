// Command: getRef
if (request.method == 'GET' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  var referrals = Libs.ReferralLib.getReferrals(userId);
  var earned = Libs.ReferralLib.getEarnedBalance(userId);
  response.send({ referrals, earned });
}