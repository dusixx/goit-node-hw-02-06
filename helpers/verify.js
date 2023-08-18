import 'dotenv/config';
import { uuid, sendEmail } from './index.js';

const { BASE_URL: host } = process.env;

export const sendVerificationEmail = async (to, verificationCode = uuid()) => {
  await sendEmail({
    to,
    subject: 'Email verification',
    html: [
      `<a href="${host}/api/auth/verify/${verificationCode}"`,
      ` target="_blank" rel="noopener noreferrer nofollow">`,
      `Click to verify email address`,
      `</a>`,
    ].join(''),
  });

  return verificationCode;
};
