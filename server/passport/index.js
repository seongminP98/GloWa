const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        console.log("serial",user.id);
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        console.log("deserializeUser");
        try{
            const user = User.findOne({where: {id: id}})
            done(null, user);
        }  catch(error){
            console.log(error);
            done(error);
        }
    });
    
    local();
};