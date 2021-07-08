const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login',(req, res, next)=>{
    passport.authenticate('local',(err, user, info)=>{
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(400).send({code: 400, message: info.message})
        }
        req.login(user,(loginError)=>{
            if(loginError){
                return next(loginError);
            }
            return req.session.save((err)=>{
                if(err){
                    return next(err);
                }
                return res.status(200).send({code: 200, data: user});
            })
        })
    })(req,res,next);
})

router.get('/login',(req,res,next)=>{
    if (req.user) {
        res.status(200).send({ code: 200, data: req.user });
    } else {
        res.status(400).send({ code: 400, error: 'not login' });
    }
})

router.get('/logout',(req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.status(200).send({code: 200});
})

module.exports = router;