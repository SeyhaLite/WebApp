// Command: broadcast
if (request.method == 'POST' && request.query.secret == bot.secret) {
  Bot.sendMessageToAll(request.query.msg);
}