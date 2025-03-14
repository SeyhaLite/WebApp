// Command: broadcastPic
if (request.method == 'POST' && request.query.secret == bot.secret) {
  Bot.sendPhotoToAll(request.query.pic, request.query.link);
}