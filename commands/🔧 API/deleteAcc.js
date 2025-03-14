      /*CMD
        command: deleteAcc
        help: Delete a user account
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

      var userId = request.query.userId;
      var userData = Bot.getProperty("userData", {});
      delete userData[userId];
      Bot.setProperty("userData", userData, "json");
      Libs.ResourcesLib.userRes("balance", userId).set(0);
      Libs.ResourcesLib.userRes("energy", userId).set(0);
      Libs.ResourcesLib.userRes("perClick", userId).set(0);
      User.deleteProperty("upgrades");
      User.deleteProperty("completedTasks");
      Bot.sendMessage(userId, "Your account has been deleted by the admin.");
      response.send({ success: true });