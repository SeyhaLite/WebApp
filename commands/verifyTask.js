// Command: verifyTask
if (request.method == 'POST' && request.query.secret == bot.secret) {
  var taskId = request.query.id;
  var userId = request.query.userId;
  var tasks = Bot.getProperty("tasks", "json");
  var task = tasks.find(t => t.id == taskId);
  if (task && !task.verified) {
    task.verified = true;
    Libs.ResourcesLib.userRes("balance", userId).add(task.bonus);
    Bot.setProperty("tasks", tasks, "json");
    Bot.sendMessage(userId, "Task verified! You earned " + task.bonus + " " + Bot.getProperty("airdropSettings", "json").currency);
  }
}