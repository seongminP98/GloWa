const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        console.log("serial");
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        console.log("deserializeUser");
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