const express = require('express');
const passport = require('passport');
const router = express.Router();

const Friends = require('../models/friends');
const ReqFriend = require('../models/reqFriends');
const Schedule = require('../models/schedule');
router.post('/add',(req,res,next)=>{
    await ReqFriend.create({
        my_nickname: req.body.nickname,
        req_friend_nickname: req.body.req_nickname,
    })
    res.status(200).send({code:200, message: '친구 요청 완료'});
    
})

router.post('/accept',(req,res,next)=>{
    let friend = await ReqFriend.findAll({
        where:{
            req_friend_nickname: req.body.nickname
        }
    })
    await Friends.create({
        my_nickname: friend.my_nickname,
        req_friend_nickname: friend.req_friend_nickname,
    })
    await Friends.create({
        my_nickname: friend.req_friend_nickname,
        req_friend_nickname: friend.my_nickname,
    })
    await ReqFriend.destroy({
        where :{
            req_friend_nickname: req.body.nickname
        }
    })
    res.status(200).send({code:200, message: '친구 수락 완료'});

})

router.get('/makeSchedule',(req,res,next)=>{
    let friend = await Friends.findAll({
        attributes:[friend_nickname],
        where:{
            my_nickname: req.body.nickname
        }
    })
    res.status(200).send({code:200, ...friend});
})

router.post('/madeSchedule',(req,res,next)=>{
    await Schedule.create({
        my_nickname: req.body.nickname,
        friend_nickname: req.body.friend_nickname,
        date: req.body.date,
        place: req.body.place,
    })
    res.status(200).send({code: 200, message: '스케줄 등록 완료'});
})

router.post('/showSchedule',(req,res,next)=>{
    let schedule = await Schedule.findAll({
        where:{
            my_nickname: req.body.nickname
        }
    })
    res.status(200).send({code: 200, ...schedule});
})

router.post('/searchSchedule',(req,res,next)=>{
    let schedule = await Schedule.findAll({
        where:{
            my_nickname: req.body.nickname,
            friend_nickname: req.body.friend_nickname
        }
    })
    res.status(200).send({code: 200, ...schedule});
})

module.exports = router;