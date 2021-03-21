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
        to: 'rranjii4u@gmail.com',
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = sendEmail;