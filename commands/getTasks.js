// Command: getTasks
if (request.method == 'GET' && request.query.secret == bot.secret) {
  var tasks = Bot.getProperty("tasks", "json");
  response.send(tasks);
}