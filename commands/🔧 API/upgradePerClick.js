      /*CMD
        command: upgradePerClick
        help: Upgrade the per click value for the user
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
      var upgrades = User.getProperty("upgrades", { perClick: { level: 0 } }, "json");
      var curLevel = upgrades.perClick.level || 0;
      var upgradeConfig = Bot.getProperty("upgradeConfig");

      if (curLevel >= upgradeConfig.maxLevel) {
        response.send({ error: "Maximum level reached: " + upgradeConfig.maxLevel });
        return;
      }

      var neededMoney = upgradeConfig.levels[`l${curLevel + 1}`]?.cost;
      if (!neededMoney) {
        response.send({ error: "No cost defined for level " + (curLevel + 1) });
        return;
      }

      var balanceRes = Libs.ResourcesLib.userRes("balance", userId);
      if (!balanceRes.have(neededMoney)) {
        response.send({ error: "Not enough money. Needs: " + neededMoney + ", You have: " + balanceRes.value() });
        return;
      }

      balanceRes.remove(neededMoney);
      upgrades.perClick.level = curLevel + 1;
      User.setProperty("upgrades", upgrades, "json");
      var newPerClick = upgradeConfig.levels[`l${curLevel + 1}`].perClick;
      Libs.ResourcesLib.userRes("perClick", userId).set(newPerClick);
      Bot.sendMessage(userId, "Per click upgraded to level " + (curLevel + 1) + "!");
      response.send({ success: true, perClick: newPerClick });