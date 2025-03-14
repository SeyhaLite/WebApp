      /*CMD
        command: ban
        help: Ban a user
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
      Libs.Guard.block(userId);
      Bot.sendMessage(userId, "You have been banned by the admin.");
      response.send({ success: true });
      