const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const Friends = require('../models/friends');

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