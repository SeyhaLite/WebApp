      /*CMD
        command: setCurrency
        help: Set the currency of the airdrop
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

      var airdropSettings = Bot.getProperty("airdropSettings");
      airdropSettings.currency = request.query.currency;
      Bot.setProperty("airdropSettings", airdropSettings, "json");
      Bot.sendMessage("Airdrop currency updated to: " + request.query.currency);
      response.send({ success: true });
      