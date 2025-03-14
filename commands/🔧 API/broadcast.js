      /*CMD
        command: broadcast
        help: Broadcast a message to all users
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

      var msg = request.query.msg;
      var userData = Bot.getProperty("userData", {});
      var userCount = 0;

      for (var userId in userData) {
        if (userCount >= 1000) break; // Limit to avoid BB timeout
        if (Libs.Guard.isBlocked(userId) || Bot.getProperty("stopped_" + userId, false)) continue;
        Bot.sendMessage(userId, msg);
        userCount++;
      }

      response.send({ success: true, usersReached: userCount });