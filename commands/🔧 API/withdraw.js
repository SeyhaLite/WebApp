      /*CMD
        command: withdraw
        help: Process a withdrawal request with currency conversion
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
      var balanceRes = Libs.ResourcesLib.userRes("balance", userId);
      if (balanceRes.value() < airdropSettings.withdrawAmount) {
        response.send({ error: "Insufficient balance for withdrawal. Need: " + airdropSettings.withdrawAmount + ", You have: " + balanceRes.value() });
        return;
      }

      var amountInUSD = Libs.CurrencyConverter.convert(airdropSettings.withdrawAmount, airdropSettings.currency, "USD");
      balanceRes.remove(airdropSettings.withdrawAmount);
      Bot.sendMessage(userId, "Withdrawal of " + airdropSettings.withdrawAmount + " " + airdropSettings.currency + " processed (~" + amountInUSD.toFixed(2) + " USD)");
      response.send({ success: true, amount: amountInUSD });
      