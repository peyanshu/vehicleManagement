// utils/sendWhatsapp.js
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendWhatsapp(to, message) {
  try {
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:${to}`, // user phone with country code
      body: message,
    });
    console.log(`WhatsApp sent to ${to}`);
  } catch (err) {
    console.error(`WhatsApp failed to ${to}:`, err.message);
  }
}

module.exports = sendWhatsapp;
