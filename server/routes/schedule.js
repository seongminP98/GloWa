const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const InvSchedule = require('../models/invSchedule');
const db = require('../models');

router.post('/makeSchedule',(req,res,next)=>{
    await Schedule.create({
        my_id: req.body.id,
        name: req.body.name, //스케줄 이름
        date: req.body.date,
        place: req.body.place,
    })
    let sId = await Schedule.findOne({
        attributes:[id],
        where:{
            my_id: req.body.id,
            name: req.body.name,
        }
    })
    await db.sequelize.models.schedulemanage.create({
        UserId: req.body.id,
        ScheduleId: sId.id,
    })
    res.status(200).send({code: 200, message: '스케줄 등록 완료'});
})

router.get('/list',(req,res,next)=>{
    let list = await Schedule.findAll({
        where:{
            my_id: req.body.id,
        }
    })
    res.status(200).send({code: 200, ...list});
})

router.post('/invite',(req,res,next)=>{
    await InvSchedule.create({
        schedule_name: req.body.name,//스케줄 이름
        my_id: req.body.id,
        invite_friend_id: req.body.invite_friend_id,
    })
    res.status(200).send({code: 200, message: '스케줄 초대 완료'});
})

router.post('/accept',(req,res,next)=>{
    let invite = await InvSchedule.findOne({
        where:{
            schedule_name: 
        }
    })
})


module.exports = router;