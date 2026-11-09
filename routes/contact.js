const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const transporter = require("../utils/mailer");

router.post("/", async (req, res) => {
  try {
    const {fullName,email,companyName,phone,projectType,message,budget,timeline} = req.body;

    const info = await transporter.sendMail({
      from: `"Arshana Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Enquiry - ${fullName}`,
      text: `
        Name: ${fullName}
        Email: ${email}
        Company: ${companyName || "Not provided"}
        Phone: ${phone}
        Project: ${projectType}
        Budget: ${budget || "Not provided"}
        Timeline: ${timeline || "Not provided"}

        Message:
        ${message}
      `
    });

    console.log(
      "Preview email:",
      nodemailer.getTestMessageUrl(info)
    );

    req.flash("success", "Your enquiry has been submitted successfully!");
    return res.redirect("/");

  } 
  
  catch (error) {
    console.error("Contact form error:", error);
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/");
  }


});

module.exports = router;