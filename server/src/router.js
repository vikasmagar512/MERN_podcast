import passport from 'passport';
import { signin, signup, verifiEmail, resendVerification } from './controllers/authController';
import {resetPassword, verifyResetPassword, resetPasswordNew, convertT2S} from './controllers/resetPasswordController';
import { fetchProfile, fetchUsers } from './controllers/usersController';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', requireAuth, fetchUsers);
  app.get('/profile', requireAuth, fetchProfile);
  app.post('/signup', signup);
  app.post('/signup/verify-email', verifiEmail);
  app.post('/resend-verify-code', resendVerification);
  app.post('/signin', requireSignin, signin);
  app.post('/reset-password', resetPassword);
  app.post('/reset-password/verify', verifyResetPassword);
  app.post('/reset-password/new', resetPasswordNew);
  app.post('/convertT2S', convertT2S);
};

export default router;
