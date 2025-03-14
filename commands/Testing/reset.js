      /*CMD
        command: reset
        help: Reset user data for testing
        need_reply: false
        auto_retry_time: 0
        folder: Testing
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
      Libs.ResourcesLib.userRes("balance", userId).set(0);
      Libs.ResourcesLib.userRes("perClick", userId).set(1);
      var energyRes = Libs.ResourcesLib.userRes("energy", userId);
      energyRes.set(1000);
      energyRes.growth.add({ value: 1000 / 3600, interval: 1, max: 1000 });
      User.setProperty("upgrades", { perClick: { level: 0 } }, "json");
      User.deleteProperty("completedTasks");
      Bot.sendMessage(userId, "Your account has been reset.");
      response.send({ success: true });
