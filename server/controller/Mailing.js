const nodemailer = require("nodemailer");
const OTPSchema = require("../models/Otp");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
    },
});

const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

const sendVerificationMail = async (req, res) => {
    try {
        const OTP = generateOTP()
        const { email } = req.user

        const OTPDoc = new OTPSchema({
            email,
            OTP
        })

        await OTPSchema.deleteMany({ email })
        await OTPDoc.save()

        const mailOptions = {
            from: "vipulr6111@gmail.com",
            to: email,
            subject: "Verify your mail for NextJob",
            html: `<p>Your Verification code is : <strong>${OTP}</strong></p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //! TODO NOT sure about this status code
                console.log(error)
                res.status(500).json({
                    message: "Internal server error"
                })
            } else {
                console.log(info)
                res.status(200).json({
                    message: "Email send, please check you inbox/spam box"
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.log(error)
    }
}

module.exports = { sendVerificationMail }