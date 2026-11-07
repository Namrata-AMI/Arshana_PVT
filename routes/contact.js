const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailer");

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      companyName,
      phone,
      projectType,
      message,
      budget,
      timeline
    } = req.body;

    // Basic validation
    if (!fullName || !email || !phone || !projectType || !message) {
      req.flash("error", "Please fill in all required fields.");
      return res.redirect("/contact");
    }

    await transporter.sendMail({
      from: `"Arshana Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Project Enquiry - ${fullName}`,

      text: `
New Project Enquiry

Name: ${fullName}
Email: ${email}
Company / Organisation: ${companyName || "Not provided"}
Phone: ${phone}

Service Required: ${projectType}

Project Location & Scope:
${message}

Budget: ${budget || "Not provided"}
Timeline: ${timeline || "Not provided"}
      `
    });

    req.flash(
      "success",
      "Your project enquiry has been submitted successfully. Our team will contact you soon."
    );

    return res.redirect("/contact");

  } catch (error) {
    console.error("Contact email error:", error);

    req.flash(
      "error",
      "Unable to submit your enquiry right now. Please try again later."
    );

    return res.redirect("/contact");
  }
});

module.exports = router;