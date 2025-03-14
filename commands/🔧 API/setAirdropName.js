      /*CMD
        command: setAirdropName
        help: Set the name of the airdrop
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
      airdropSettings.name = request.query.name;
      Bot.setProperty("airdropSettings", airdropSettings, "json");
      Bot.sendMessage("Airdrop name updated to: " + request.query.name);
      response.send({ success: true });
      