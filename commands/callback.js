// Callback handler
if (callback_query.data.startsWith("/")) {
  var cmd = callback_query.data;
  var ADMIN_ID = 123456789; // Replace with actual admin ID
  if (cmd == "/mining") {
    WebApprender({ template: "index_mining.html" });
  } else if (cmd == "/toprank") {
    WebApprender({ template: "index_toprank.html" });
  } else if (cmd == "/profile") {
    WebApprender({ template: "index_profile.html" });
  } else if (cmd == "/ref") {
    WebApprender({ template: "index_ref.html" });
  } else if (cmd == "/task") {
    WebApprender({ template: "index_task.html" });
  } else if (cmd == "/adminpanel" && user.id == ADMIN_ID) {
    WebApprender({ template: "admin.html" });
  } else {
    Bot.sendMessage("Access denied or invalid option.");
  }
  Bot.answerCallbackQuery(callback_query.id);
}