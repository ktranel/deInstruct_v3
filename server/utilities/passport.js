const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// utilities
const { Logger } = require('../utilities/logger');

// controllers
const {User} = require('../controllers/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const user = new User();
    user.getUser({id})
        .then(() => {
            if (user.id) return done(null, user);
        })
        .catch(e => {
            const log = new Logger();
            log.error(e,{});
        })
});

// LOCAL STRATEGY
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function verify(email, password, done){
        const user = new User();
        user.getUser({email})
            .then(() => {
                if (user.id) {
                   user.getPassword()
                       .then(hash => {
                           bcrypt.compare(password, hash)
                               .then(match => {
                                   if(match) return done(null, user);
                                   return done(null, false);
                               })
                       })
                } else {
                    done(null, false);
                }

            })
            .catch(e=>{
                done(e)
            });
    }
));