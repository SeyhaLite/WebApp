     /*CMD
       command: getTasks
       help: Fetch available tasks
       need_reply: false
       auto_retry_time: 0
       folder: 🔧 API
       answer: 
       keyboard: 
       aliases: 
       group: 
     CMD*/

     if (request.method != 'GET' || request.query.secret != bot.secret) {
       response.send({ error: "Unauthorized access" });
       return;
     }

     var tasks = Bot.getProperty("tasks", []);
     response.send(tasks);