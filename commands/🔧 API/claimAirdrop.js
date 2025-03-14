*CMD
        command: claimAirdrop
        help: Claim the airdrop reward
        need_reply: false
        auto_retry_time: 0
        folder: 🔧 API
        answer: 
        keyboard: 
        aliases: 
        group: 
      CMD*/

      if (request.method != 'POST' || request.query.secret != bot.secret) {
        response.send({ error: "Unauthorized access" });
        return;
      }

      if (Libs.Guard.isBlocked(request.query.userId) || Bot.getProperty("stopped_" + request.query.userId, false)) {
        response.send({ error: "Account restricted" });
        return;
      }

      var userId = request.query.userId;
      var airdropSettings = Bot.getProperty("airdropSettings");
      var cooldown = Libs.CooldownLib.getCooldown("airdrop_" + userId, 86400); // 24-hour cooldown
      if (cooldown.isActive()) {
        response.send({ error: "Airdrop claimed recently. Wait " + cooldown.timeLeft() + " seconds" });
        return;
      }

      var refCount = Libs.ReferralLib.getReferrals(userId).length;
      if (refCount < airdropSettings.refRequirement) {
        response.send({ error: "Need " + airdropSettings.refRequirement + " referrals to claim airdrop. You have " + refCount + "." });
        return;
      }

      var userTasks = User.getProperty("completedTasks", {});
      var requiredTasks = Bot.getProperty("tasks", []).filter(t => t.type === "membership").length;
      var completedTasks = Object.keys(userTasks).length;
      if (completedTasks < requiredTasks) {
        response.send({ error: "Complete all membership tasks to claim airdrop. Completed: " + completedTasks + "/" + requiredTasks });
        return;
      }

      var airdropAmount = 100; // Fixed amount; can be made dynamic
      Libs.ResourcesLib.userRes("balance", userId).add(airdropAmount);
      Libs.CooldownLib.setCooldown("airdrop_" + userId, 86400);
      Bot.sendMessage(userId, "Airdrop claimed! You received " + airdropAmount + " " + airdropSettings.currency);
      response.send({ success: true, amount: airdropAmount });
      