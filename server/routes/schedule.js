const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const InvSchedule = require('../models/invSchedule');
const db = require('../models');
const User = require('../models/user');

router.post('/makeSchedule', async (req,res,next)=>{ 
    let check = await Schedule.findAll({ //중복된 스케줄 이름 확인
        where: {
            my_id: req.body.id,
            schedule_name: req.body.name,
        }
    })
    if(check){
        return res.status(400).send({code: 400, message: '스케줄 이름을 변경해 주세요'})
    }

    await Schedule.create({ //스케줄 만들기
        my_id: req.body.id,  //스케줄 만든 유저 아이디
        schedule_name: req.body.name, //스케줄 이름
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
    let myId = await User.findOne({
        where:{
            id: req.body.id
        }
    })
    
    await sId.addUser(parseInt(myId.id,10));
    // await db.sequelize.models.schedulemanage.create({
    //     UserId: req.body.id,
    //     ScheduleId: sId.id,
    // })
    res.status(200).send({code: 200, message: '스케줄 등록 완료'});
})

router.get('/list', async (req,res,next)=>{ //내 스케줄 목록
    let myId = await User.findOne({
        where:{
            id: req.body.id
        }
    })
    let schedule = await myId.getSchedule();
    let list = [];
    if(Array.isArray(schedule) && schedule.length){
        for(let i=0; i<schedule.length; i++){
            let s = await Schedule.findOne({
                where:{
                    id: schedule[i].dataValues.id
                }
            })
            list.push(f.dataValues);
        }
    }
    // let list = await Schedule.findAll({
    //     where:{
    //         my_id: req.body.id,
    //     }
    // })
    if(Array.isArray(list) && list.length){
        res.status(200).send({code: 200, result: list});
    } else{
        res.status(400).send({code:400, message: '스케줄 목록이 비어있습니다.'});
    }
    
})

router.post('/invite', async (req,res,next)=>{ //스케줄 초대
    
    let alreadyInv = await InvSchedule.findOne({ /** */
        where:{
            schedule_name: req.body.name,
            my_id: req.body.id,
            friend_id: req.body.friend_id,
        }
    })
    if(alreadyInv){
        return res.status(400).send({code:400, message: '이미 이 스케줄에 초대를 했습니다.'});
    }
    
    let friend = await User.findOne({ //스케줄에 초대한 친구의 아이디로 검색
        where:{id: req.body.friend_id}
    })
    
    let alreadySchedule = await friend.getSchedules(); //스케줄 초대한 친구의 모든 스케줄 가져오기
    let check = false;
    if(Array.isArray(alreadySchedule) && alreadySchedule.length){
        for(let i=0; i<alreadySchedule.length; i++){
            if(alreadySchedule[i].dataValues.id === req.body.schedule_id){ //스케줄 초대한 친구가 이미 내가 초대한 스케줄에 있다면.
                check = true;
            }
        }
    }
    if(check){
        return res.status(400).send({code:400, message: '이미 스케줄에 있습니다.'});
    }


    await InvSchedule.create({
        schedule_name: req.body.schedule_name,//스케줄 이름
        my_id: req.body.id,
        friend_id: req.body.friend_id,
    })
    res.status(200).send({code: 200, message: '스케줄 초대 완료'});
})

router.get('/invite/list', async (req,res,next)=>{ //초대받은 스케줄 목록
    let schedule = await InvSchedule.findAll({
        where :{
            friend_id: req.body.id
        }
    })
    let list = [];
    if(Array.isArray(schedule) && schedule.length){
        for(let i=0; i<schedule.length; i++){
            let s = await Schedule.findOne({
                where:{
                    my_id: schedule[i].my_id
                }
            })
            list.push(s);
        }
    }
    if(Array.isArray(list) && list.length){
        res.status(200).send({code:200, result: list});
    }
    else{
        res.status(400).send({code:400, message: '초대받은 스케줄이 없습니다.'});
    }
})

router.post('/accept', async (req,res,next)=>{ //초대받은 스케줄 수락
    let inv= await InvSchedule.findOne({
        where:{
            id: req.body.schedule_id //스케줄 아이디
            // schedule_name: req.body.schedule_name,
            // my_id: req.body.friend_id,  //초대한 친구 아이디 
            // friend_id: req.body.user_id   //내 아이디
        }
    })
    let myId = await User.findOne({
        where:{
            id: req.body.id
        }
    })
    await myId.addSchedule(parseInt(inv.id),10);
    // await db.sequelize.models.schedulemanage.create({
    //     UserId: req.body.user_id,
    //     ScheduleId: inv.id,
    // })
    await InvSchedule.destroy({
        where:{
            id: inv.id,
            my_id: req.body.friend_id,
            friend_id: req.body.id
        }
    })
    res.status(200).send({code: 200, message: '스케줄 수락 완료'});
})


module.exports = router;