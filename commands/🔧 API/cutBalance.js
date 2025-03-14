      /*CMD
        command: cutBalance
        help: Cut balance from a user
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
      var amount = parseFloat(request.query.amount);
      if (isNaN(amount) || amount <= 0) {
        response.send({ error: "Invalid amount" });
        return;
      }
      var res = Libs.ResourcesLib.userRes("balance", userId);
      if (!res.have(amount)) {
        response.send({ error: "Insufficient balance" });
        return;
      }
      res.remove(amount);
      Bot.sendMessage(userId, "Admin deducted " + amount + " from your balance.");
      response.send({ success: true });
      