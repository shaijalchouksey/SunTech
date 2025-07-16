// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');
const sendEmail = async (name, phone, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = [
    {
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL, // Your inbox
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    },
    {
      from: process.env.COMPANY_EMAIL,
      to: email, // User's inbox
      subject: 'Thanks for contacting SunTech!',
      text: `Hi ${name},\n\nThanks for reaching out to us.\n\nYour request has been registered, and someone from our team will contact you shortly.\n\nBest,\nSunTech Power Corporation`,
    }
  ];

  try {
    for (const mail of mailOptions) {
      await transporter.sendMail(mail);
    }
    console.log('✅ Emails sent to company and user');
  } catch (emailErr) {
    console.error('❌ Email sending failed:', emailErr);
    throw emailErr;
  }
};
module.exports = sendEmail;