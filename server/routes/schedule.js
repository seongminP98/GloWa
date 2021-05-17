const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const InvSchedule = require('../models/invSchedule');
const db = require('../models');

router.post('/makeSchedule', async (req,res,next)=>{ 
    let check = await Schedule.findAll({ //중복된 스케줄 이름 확인
        where: {
            my_id: req.body.user_id,
            name: req.body.name,
        }
    })
    if(check){
        res.status(400).send({code: 400, message: '스케줄 이름을 변경해 주세요'})
    }

    await Schedule.create({ //스케줄 만들기
        my_id: req.body.user_id,  //스케줄 만든 유저 아이디
        schedule_name: req.body.schedule_name, //스케줄 이름
        date: req.body.date,
        place: req.body.place,
    })
    let sId = await Schedule.findOne({ //스케줄 아이디 
        attributes:[id],
        where:{
            my_id: req.body.user_id,
            schedule_name: req.body.schedule_name,
        }
    })

    await db.sequelize.models.schedulemanage.create({
        UserId: req.body.id,
        ScheduleId: sId.id,
    })
    res.status(200).send({code: 200, message: '스케줄 등록 완료'});
})

router.get('/list', async (req,res,next)=>{ //내 스케줄 목록
    let list = await Schedule.findAll({
        where:{
            my_id: req.body.id,
        }
    })
    res.status(200).send({code: 200, ...list});
})

router.post('/invite', async (req,res,next)=>{ //스케줄 초대
    await InvSchedule.create({
        schedule_name: req.body.schedule_name,//스케줄 이름
        my_id: req.body.id,
        friend_id: req.body.friend_id,
    })
    res.status(200).send({code: 200, message: '스케줄 초대 완료'});
})

router.get('/invite/list', async (req,res,next)=>{ //초대받은 스케줄 목록
    let list = await InvSchedule.findAll({
        where :{
            friend_id: req.body.user_id
        }
    })
    if(list){
        res.status(200).send({code:200, ...list});
    }
    else{
        res.status(400).send({code:400, message: '초대받은 스케줄이 없습니다.'});
    }
})

router.post('/accept', async (req,res,next)=>{ //초대받은 스케줄 수락
    let inv= await InvSchedule.findOne({
        where:{
            id: req.body.id //스케줄 아이디
            // schedule_name: req.body.schedule_name,
            // my_id: req.body.friend_id,  //초대한 친구 아이디 
            // friend_id: req.body.user_id   //내 아이디
        }
    })
    await db.sequelize.models.schedulemanage.create({
        UserId: req.body.user_id,
        ScheduleId: inv.id,
    })
    await InvSchedule.destroy({
        where:{
            id: inv.id,
        }
    })
    res.status(200).send({code: 200, message: '스케줄 수락 완료'});
})


module.exports = router;