import nodemailer from "nodemailer";

async function sendVerificationEmail(toEmail, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pavandwivedi35@gmail.com',
            pass: 'dliv wfxq jpwc uaci'
        }
    });

    const mailOptions = {
        from: 'pavandwivedi35@gmail.com',
        to: toEmail,
        subject: 'Email Verification',
        text: `Please verify your email by enter the correct token ${token} to this url : http://localhost:3000/verify`
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

export default sendVerificationEmail;