const nodeMailer = require('nodemailer');
//TODO change with Gmail settings
const sendEmail = async options => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_EMAIL_HOST,
        port: process.env.SMTP_EMAIL_PORT,
        auth: {
            user: process.env.SMTP_EMAIL_USER,
            pass: process.env.SMTP_EMAIL_PASSWORD
        }
    });

    const message = {
        from: `${process.env.SMTP_FROM_EMAIL} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
}

module.exports = sendEmail;