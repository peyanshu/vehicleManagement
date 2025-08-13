const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("0 0 * * *", async () => {
  await sendExpiryReminders();
});

