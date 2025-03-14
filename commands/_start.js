/*CMD
  command: /start
  help: Start the airdrop bot and render the Mining page
  need_reply: false
  auto_retry_time: 0
  folder: 
  answer: Welcome to the Airdrop Bot! You are now on the Mining page. Use the buttons below to navigate:
  keyboard: Mining, Top Rank, Profile, Referral, Tasks, Admin Panel
  aliases: 
  group: 
CMD*/

// Initialize global airdrop settings
var airdropSettings = Bot.getProperty("airdropSettings", {
  name: "Airdrop 2025",
  currency: "Tokens",
  withdrawAmount: 10,
  refRequirement: 5
});
Bot.setProperty("airdropSettings", airdropSettings, "json");

// Initialize tasks
var tasks = Bot.getProperty("tasks", [
  { id: 1, title: "Join Telegram Channel", description: "Join @ExampleChannel", bonus: 50, verified: false, type: "membership" },
  { id: 2, title: "Follow on X", description: "Follow @ExampleX", bonus: 30, verified: false, type: "manual" }
]);
Bot.setProperty("tasks", tasks, "json");

// Initialize user resources
var userBalance = Libs.ResourcesLib.userRes("balance");
if (!userBalance.value()) userBalance.set(0);

var userEnergy = Libs.ResourcesLib.userRes("energy");
if (!userEnergy.value()) {
  userEnergy.set(1000);
  userEnergy.growth.add({ value: 1000 / 3600, interval: 1, max: 1000 });
}

var perClick = Libs.ResourcesLib.userRes("perClick");
if (!perClick.value()) perClick.set(1);

var upgrades = User.getProperty("upgrades", { perClick: { level: 0 } }, "json");
User.setProperty("upgrades", upgrades, "json");

// Initialize user data for rankings
var userData = Bot.getProperty("userData", {});
userData[user.telegramid] = userData[user.telegramid] || {
  name: user.first_name,
  username: user.username || "N/A",
  miningClicks: 0
};
Bot.setProperty("userData", userData, "json");

// Check if user is banned or stopped
if (Libs.Guard.isBlocked(user.telegramid) || Bot.getProperty("stopped_" + user.telegramid, false)) {
  Bot.sendMessage("Your account is restricted. Please contact the admin.");
  return;
}

// Render the Mining page
try {
  WebApp.render({ template: "commands/templates/index_mining.html" });
} catch (e) {
  Bot.sendMessage("Error rendering Mining page: " + e.message);
  return;
}

// Send welcome message with navigation buttons
Bot.sendMessage("Welcome to the Airdrop Bot! You are now on the Mining page. Use the buttons below to navigate:");
Bot.sendInlineKeyboard([
  [{ text: "Mining", callback_data: "/mining" }],
  [{ text: "Top Rank", callback_data: "/toprank" }],
  [{ text: "Profile", callback_data: "/profile" }],
  [{ text: "Referral", callback_data: "/ref" }],
  [{ text: "Tasks", callback_data: "/task" }],
  [{ text: "Admin Panel", callback_data: "/adminpanel" }]
]);