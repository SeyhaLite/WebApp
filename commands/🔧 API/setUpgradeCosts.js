      /*CMD
        command: setUpgradeCosts
        help: Set the cost per click for each level and maximum level limit
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

      var maxLevel = parseInt(request.query.maxLevel) || 5;
      if (maxLevel < 1 || maxLevel > 50) {
        response.send({ error: "Invalid maxLevel (must be between 1 and 50)" });
        return;
      }

      var levels = {};
      for (var i = 1; i <= maxLevel; i++) {
        var cost = parseInt(request.query[`cost_l${i}`]) || (i * 10);
        var perClick = parseInt(request.query[`perClick_l${i}`]) || i;
        if (cost < 0 || perClick < 0) {
          response.send({ error: "Invalid cost or perClick value for level " + i });
          return;
        }
        levels[`l${i}`] = { cost: cost, perClick: perClick };
      }

      var upgradeConfig = { maxLevel: maxLevel, levels: levels };
      Bot.setProperty("upgradeConfig", upgradeConfig, "json");
      Bot.sendMessage("Upgrade costs and max level updated successfully.");
      response.send({ success: true });
      