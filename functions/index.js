const functions = require("firebase-functions");
const admin     = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

/**
 * Fires whenever a document is created in the `notifications` collection.
 * Sends an email to the admin and marks the notification as processed.
 */
exports.sendMembershipNotification = functions.firestore
  .document("notifications/{notifId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const gmailUser = functions.config().gmail.user;
    const gmailPass = functions.config().gmail.pass;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const mailOptions = {
      from: `"Captain Randy Website" <${gmailUser}>`,
      to:   "chadtusa3@gmail.com",
      subject: "New Membership Request",
      text: `New membership request from ${data.fullName} (${data.email} / ${data.phone}) - Log in to approve: https://captainrandyandhismerryfellows.com/admin`,
    };

    try {
      await transporter.sendMail(mailOptions);
      await snap.ref.update({ processed: true });
    } catch (err) {
      functions.logger.error("Failed to send membership notification email", err);
    }
  });
