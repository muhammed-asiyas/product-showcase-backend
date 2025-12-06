const { Resend } = require('resend');


if (!process.env.RESEND_API_KEY) {
console.warn('RESEND_API_KEY is not set. Emails will fail until you set it.');
}


const resend = new Resend(process.env.RESEND_API_KEY);
module.exports = resend;