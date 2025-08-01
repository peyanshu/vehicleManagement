const cron = require("node-cron");
const Vehicle = require("../models/Vehicle");
const EmailList = require("../models/EmailList");
const sendEmail = require("../utils/mailer");

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily expiry check...");

  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(today.getDate() + 7); 

  try {
    const vehicles = await Vehicle.find();

    for (const vehicle of vehicles) {
      const userId = vehicle.createdBy;

      const upcomingExpiries = [];

      // Check each expiry field
      const expiryFields = {
        Insurance: vehicle.insuranceExpiry,
        Fitness: vehicle.fitnessExpiry,
        Permit: vehicle.permitExpiry,
        Pollution: vehicle.pollutionExpiry,
        Tax: vehicle.taxExpiry,
      };

      for (const [type, date] of Object.entries(expiryFields)) {
        if (date && date <= deadline && date >= today) {
          upcomingExpiries.push(`${type} - ${date.toDateString()}`);
        }
      }

      // If any document is expiring soon
      if (upcomingExpiries.length > 0) {
        const emails = await EmailList.find({ addedBy: userId });

        for (const entry of emails) {
          await sendEmail(
            entry.email,
            "Vehicle Document Expiry Alert",
            `Dear User,\n\nThe following documents for vehicle "${vehicle.vehicleNumber}" are expiring soon:\n\n${upcomingExpiries.join(
              "\n"
            )}\n\nPlease renew them to avoid penalties.\n\n- White Circle Group`
          );
        }
      }
    }

    console.log("Expiry reminders sent.");
  } catch (err) {
    console.error("Failed to send expiry reminders:", err.message);
  }
});
