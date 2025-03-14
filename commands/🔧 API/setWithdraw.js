      /*CMD
        command: setWithdraw
        help: Set the minimum withdrawal amount
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

      var amount = parseFloat(request.query.amount);
      if (isNaN(amount) || amount <= 0) {
        response.send({ error: "Invalid amount" });
        return;
      }

      var airdropSettings = Bot.getProperty("airdropSettings");
      airdropSettings.withdrawAmount = amount;
      Bot.setProperty("airdropSettings", airdropSettings, "json");
      Bot.sendMessage("Minimum withdrawal amount updated to: " + amount);
      response.send({ success: true });
      