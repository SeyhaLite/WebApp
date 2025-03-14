// Command: confirmTerms
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var userId = request.query.userId;
  Bot.setProperty("refConfirmed_" + userId, true, "boolean");
}