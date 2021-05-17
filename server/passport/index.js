const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');
const Schedule  = require('../models/schedule');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        User.findOne({where: {id: id},
        include:[{
            model: User,
            attributes: ['nickname'],
            as: 'Followers'
        }]})
        .then((user) => done(null, user))
        .catch((err) => done(err));
    });
    
    local();
};