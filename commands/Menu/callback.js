/*CMD
  command: callback
  help: Handle inline keyboard button callbacks
  need_reply: false
  auto_retry_time: 0
  folder: Menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Check if user is restricted
if (Libs.Guard.isBlocked(user.telegramid) || Bot.getProperty("stopped_" + user.telegramid, false)) {
  Bot.sendMessage("Your account is restricted. Please contact the admin.");
  Bot.answerCallbackQuery(callback_query.id);
  return;
}

// Handle callback data
if (callback_query.data.startsWith("/")) {
  var cmd = callback_query.data;
  var ADMIN_ID = 123456789; // Replace with actual admin ID
  try {
    if (cmd == "/mining") {
      WebApp.render({ template: "commands/templates/index_mining.html" });
    } else if (cmd == "/toprank") {
      WebApp.render({ template: "commands/templates/index_toprank.html" });
    } else if (cmd == "/profile") {
      WebApp.render({ template: "commands/templates/index_profile.html" });
    } else if (cmd == "/ref") {
      WebApp.render({ template: "commands/templates/index_ref.html" });
    } else if (cmd == "/task") {
      WebApp.render({ template: "commands/templates/index_task.html" });
    } else if (cmd == "/adminpanel" && user.telegramid == ADMIN_ID) {
      WebApp.render({ template: "commands/templates/admin.html" });
    } else {
      Bot.sendMessage("Access denied or invalid option.");
    }
  } catch (e) {
    Bot.sendMessage("Error rendering page: " + e.message);
  }
  Bot.answerCallbackQuery(callback_query.id);
}
