// Command: /start
// Initialize user resources
var res = Libs.ResourcesLib.userRes("balance");
var energy = Libs.ResourcesLib.userRes("energy");
if (!res.value()) res.set(0);
if (!energy.value()) energy.set(100);

// Initialize user data for rankings
var userData = Bot.getProperty("userData", "json", {});
userData[user.id] = { name: user.first_name, username: user.username || "N/A", miningClicks: 0 };
Bot.setProperty("userData", userData, "json");

// Initialize airdrop settings
var airdropSettings = Bot.getProperty("airdropSettings", "json", {
  name: "Airdrop 2025",
  currency: "Tokens",
  withdrawAmount: 10,
  refRequirement: 10
});
Bot.setProperty("airdropSettings", airdropSettings, "json");

// Initialize tasks
var tasks = Bot.getProperty("tasks", "json", [
  { id: 1, title: "Join Telegram Channel", description: "Join @Example", bonus: 50, verified: false },
  { id: 2, title: "Follow on X", description: "Follow @ExampleX", bonus: 30, verified: false }
]);
Bot.setProperty("tasks", tasks, "json");

// Render the Mining page as the first page
WebApprender({ template: "index_mining.html" });

// Send inline keyboard for navigation
Bot.sendMessage("Welcome to the Airdrop Bot! You are now on the Mining page. Use the buttons below to navigate:");
Bot.sendInlineKeyboard([
  [{ text: "Mining", callback_data: "/mining" }],
  [{ text: "Top Rank", callback_data: "/toprank" }],
  [{ text: "Profile", callback_data: "/profile" }],
  [{ text: "Referral", callback_data: "/ref" }],
  [{ text: "Tasks", callback_data: "/task" }],
  [{ text: "Admin Panel", callback_data: "/adminpanel" }]
]);