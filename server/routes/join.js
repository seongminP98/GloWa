const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

router.post('/id',async(req,res,next)=>{ //id중복확인
    const exUser = await User.findOne({where:{user_id: req.body.id}});
    if(!exUser){
        res.status(200).send({conde: 200, message: '사용가능한 아이디 입니다.'});
    } else{
        res.status(400).send({code: 400, message: '이미 사용 중인 아이디입니다.'});
    }
})

router.post('/nick',async(req,res,next)=>{ //nickname중복확인
    const exUser = await User.findOne({where:{nickname: req.body.nickname}});
    if(!exUser){
        res.status(200).send({conde: 200, message: '사용가능한 닉네임 입니다.'});
    } else{
        res.status(400).send({code: 400, message: '이미 사용 중인 닉네임입니다.'});
    }
})

router.post('/',async(req,res,next)=>{
    try{
        const exUser = await User.findOne({where:{user_id: req.body.id}});
        const hash = await bcrypt.hash(req.body.password,12);
        await User.create({
            user_id: req.body.user_id,
            nickname: req.body.nickname,
            password: hash,
        });
        const user = await User.findOne({user_id: req.body.id});
        req.login(user,(err)=>{
            return res.status(200).send({code: 200, ...user});
        })
        
    } catch(error){
        return next(error);
    }
})

module.exports = router;