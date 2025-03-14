      /*CMD
        command: trackTapWork
        help: Track tap work for mining
        need_reply: false
        auto_retry_time: 0
        folder: Testing
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
      var energy = parseFloat(request.query.energy);
      var balance = parseFloat(request.query.balance);
      if (isNaN(energy) || isNaN(balance)) {
        response.send({ error: "Invalid parameters" });
        return;
      }

      var energyRes = Libs.ResourcesLib.userRes("energy", userId);
      var currentEnergy = energyRes.value();
      if (energy > currentEnergy) {
        response.send({ error: "Not enough energy. You have only: " + currentEnergy });
        return;
      }

      if (balance <= 0) {
        response.send({ error: "Balance can't be negative" });
        return;
      }

      var currentBalance = Libs.ResourcesLib.userRes("balance", userId).value();
      if (balance < currentBalance) {
        response.send({ error: "Balance can't be decreased on TapWork" });
        return;
      }

      var perClick = Libs.ResourcesLib.userRes("perClick", userId).value();
      if (balance > currentEnergy * perClick) {
        response.send({ error: "Balance can't be more than energy * perClick" });
        return;
      }

      energyRes.set(energy);
      Libs.ResourcesLib.userRes("balance", userId).set(balance);
      var userData = Bot.getProperty("userData", {});
      userData[userId].miningClicks = (userData[userId].miningClicks || 0) + 1;
      Bot.setProperty("userData", userData, "json");
      response.send({ success: true });