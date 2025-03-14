      /*CMD
        command: stopAcc
        help: Stop a user account
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
      Bot.setProperty("stopped_" + userId, true, "boolean");
      Bot.sendMessage(userId, "Your account has been stopped by the admin.");
      response.send({ success: true });
      