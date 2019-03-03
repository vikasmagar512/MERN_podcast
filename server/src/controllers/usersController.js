import User from '../models/user';

/**
 * Fetch user firstnames
 */
export const fetchUsers = (req, res, next) => {
  User.find({}, 'firstname', (err, users) => {
    if (err) { return next(err); }

    res.json(users);
  });
};
/**
 * Fetch user firstnames
 */
export const fetchProfile = (req, res, next) => {
  const { email} = req.user;

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

    const { email, firstname, lastname } = user;

    res.json({ email, firstname, lastname });
  });
};
