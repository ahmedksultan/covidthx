const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User Model
const Admin = require('../models/Admin');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // Match User
            Admin.findOne({ username: username })
                .then(admin => {
                    if (!admin) {
                        return done(null, false, {
                            message: 'That username is not registered'
                        });
                    }

                    // Match Password
                    bcrypt.compare(password, admin.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, admin);
                        } else {
                            return done(null, false, { message: 'Password Incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};