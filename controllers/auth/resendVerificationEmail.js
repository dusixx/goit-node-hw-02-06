import { sendVerificationEmail, HttpError } from '../../helpers/index.js';
import { HTTP_STATUS } from '../../constants/index.js';
import { User } from '../../models/index.js';

const MESSAGE = {
  userNotFound: 'User not found',
  alreadyVerified: 'Verification has already been passed',
  emailResent: 'Verification email sent',
};

export const resendVerificationEmail = async ({ body: { email } }, res) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(HTTP_STATUS.notFound, MESSAGE.userNotFound);
  }

  if (user.verified) {
    throw HttpError(HTTP_STATUS.badRequest, MESSAGE.alreadyVerified);
  }

  // повторно отправляем код
  await sendVerificationEmail(email, user.verificationCode);

  res.json({
    message: MESSAGE.emailResent,
  });
};
