import nodemailer from "nodemailer";

export const otp = async (req, res) => {
  try {
    const email  = req.body.email;
    if (!email) return res.status(400).json({
         success: false,
          message: "Email is required"
         });
    

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // Send the OTP email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Store OTP in your database or cache (optional)
    // For demonstration, we are just sending it back in the response
    // In production, never send the OTP in the response.

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
      email
    });

  } catch (error) {
    console.error("error :", error)
    res.status(500).
    json({ 
        success: false, 
        message: error.message 
    });
  }
};
