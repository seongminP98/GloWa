const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const InvSchedule = require('../models/invSchedule');
const db = require('../models');
const User = require('../models/user');

router.post('/makeSchedule', async (req,res,next)=>{ //스케줄 만들기
    let check = await Schedule.findAll({ //중복된 스케줄 이름 확인
        where: {
            my_id: req.user.id,             //로그인한 사용자 아이디(스케줄 만들사람)
            schedule_name: req.body.name,   //만들 스케줄 이름
        }
    })
    if(check.length>0){
        return res.status(400).send({code: 400, message: '일정 이름을 변경해 주세요'})
    }

    await Schedule.create({ //스케줄 DB에 저장
        my_id: req.user.id,  //스케줄 만든 유저 아이디
        schedule_name: req.body.name, //스케줄 이름
        place: req.body.place,      //스케줄 장소
        date: req.body.date,        //스케줄 날짜,시간 / mysql에서 datetime형식
    })
    let sId = await Schedule.findOne({ //스케줄 아이디 
        attributes:['id'],
        where:{
            my_id: req.user.id, //스케줄 만든 유저 아이디
            schedule_name: req.body.name,   //만든 스케줄 이름
        }
    })
    let myId = await User.findOne({
        where:{
            id: req.user.id
        }
    })
    
    await sId.addUser(parseInt(myId.id,10)); //schedulemanage에 user와 schedule 관계설정.
    res.status(200).send({code: 200, message: '일정 등록 완료'});
})

router.get('/list', async (req,res,next)=>{ //내 스케줄 목록
    let myId = await User.findOne({
        where:{
            id: req.user.id //로그인한 사용자 아이디
        }
    })
    let schedule = await myId.getSchedules();
    let list = [];

    if(Array.isArray(schedule) && schedule.length){
        for(let i=0; i<schedule.length; i++){
            let s = await Schedule.findOne({
                where:{
                    id: schedule[i].dataValues.id
                }
            })
            let master = await User.findOne({
                where:{
                    id:schedule[i].dataValues.my_id
                }
            })
            list.push(s.dataValues);
            list[i].master_nickname = master.dataValues.nickname

        }
    }
    list.sort((a,b)=>{
        return a.date - b.date;
    });
    
    let ml = [];
    for(let i=0; i<list.length; i++){
        let memberList = [];
        let sche = await Schedule.findOne({
            where:{
                id: list[i].id
            }
        })
        let member = await sche.getUsers();
        
        for(let j=0; j<member.length; j++){
            let mem = new Object();
            mem.id = member[j].dataValues.id,
            mem.nickname = member[j].dataValues.nickname
            memberList.push(mem);

        }
        ml.push(memberList);
    }
    for(let i=0; i<list.length; i++){
        list[i].members = ml[i];
    }

    if(Array.isArray(list) && list.length){
        res.status(200).send({code: 200, result: list});
    } else{
        res.status(400).send({code:400, message: '일정 목록이 비어있습니다.'});
    }
    
})

router.post('/invite', async (req,res,next)=>{ //스케줄 초대
    
    let alreadyInv = await InvSchedule.findOne({ 
        where:{
            schedule_id: req.body.schedule_id,            //초대할 스케줄 id
            my_id: req.user.id,           //로그인된 사용자(스케줄 초대할) id, 
            friend_id: req.body.friend_id, //스케줄에 초대할 친구 id
        }
    })

    if(alreadyInv){
        return res.status(200).send({code:200, message: '이미 이 일정에 초대를 했습니다.'});
    }
    
    let friend = await User.findOne({ //스케줄에 초대한 친구의 아이디로 검색
        where:{id: req.body.friend_id}
    })
    
    let alreadySchedule = await friend.getSchedules(); //스케줄 초대한 친구의 모든 스케줄 가져오기

    if(Array.isArray(alreadySchedule) && alreadySchedule.length){
        for(let i=0; i<alreadySchedule.length; i++){                        //초대할 스케줄 id

            if(String(alreadySchedule[i].dataValues.id) === req.body.schedule_id){ //스케줄 초대한 친구가 이미 내가 초대한 스케줄에 있다면.
                return res.status(200).send({code:200, message: '이미 일정에 있습니다.'});
            }
        }
    }

    const check = await Schedule.findOne({
        where:{
            id: req.body.schedule_id,
            my_id: req.user.id
        }
    })

    if(check){
        await InvSchedule.create({
            schedule_id: req.body.schedule_id,//스케줄 이름
            my_id: req.user.id,
            friend_id: req.body.friend_id,
        })
        res.status(200).send({code: 200, message: '일정 초대 완료'});
    }
    else{
        res.status(200).send({code: 200, message: '이 일정에 대한 초대 권한이 없습니다.'});
    }
})



router.get('/invite/list', async (req,res,next)=>{ //초대받은 스케줄 목록
    let schedule = await InvSchedule.findAll({
        where :{
            friend_id: req.user.id //로그인 된 내 아이디  
        }
    })
    let list = [];

    if(Array.isArray(schedule) && schedule.length){
        for(let i=0; i<schedule.length; i++){
            let s = await Schedule.findOne({
                where:{
                    id: schedule[i].schedule_id //스케줄 초대한 사람의 id
                },
                include:[
                    {model: User, required: true, attributes:['nickname']}
                ]
            })
            let master = await User.findOne({
                where:{
                    id:schedule[i].dataValues.my_id
                }
            })
            list.push(s.dataValues);
            list[i].master_nickname = master.dataValues.nickname
        }
    }

    if(Array.isArray(list) && list.length){
        res.status(200).send({code:200, result: list});
    }
    else{
        res.status(400).send({code:400, message: '초대받은 일정이 없습니다.'});
    }
})

router.post('/accept', async (req,res,next)=>{ //초대받은 스케줄 수락
    let inv= await InvSchedule.findOne({
        where:{
            schedule_id: req.body.schedule_id, //초대받은 스케줄 아이디  //초대받은 스케줄목록에 있는 schedule_id
            my_id: req.body.friend_id,  //초대한 친구 아이디 
            friend_id: req.user.id   //내 아이디
        }
    })
    if(!inv){
        return res.status(400).send({code:400, message:'잘못된 접근입니다.'});
    }
    let myId = await User.findOne({
        where:{
            id: req.user.id //내 아이디 
        }
    })

    await myId.addSchedule(parseInt(req.body.schedule_id),10); //스케줄 아이디 invite/list에 있는 그냥 id

    await InvSchedule.destroy({
        where:{
            schedule_id: inv.schedule_id,
            my_id: req.body.friend_id, //초대한 사람 아이디
            friend_id: req.user.id
        }
    })
    res.status(200).send({code: 200, message: '일정 수락 완료'});
})

router.post('/reject', async(req, res,next)=>{ //초대받은 스케줄 거절
    let inv= await InvSchedule.findOne({
        where:{
            schedule_id: req.body.schedule_id, //초대받은 스케줄 아이디  //초대받은 스케줄목록에 있는 schedule_id
            my_id: req.body.friend_id,  //초대한 친구 아이디 
            friend_id: req.user.id   //내 아이디
        }
    })
    if(!inv){
        return res.status(400).send({code:400, message:'잘못된 접근입니다.'});
    }

    await InvSchedule.destroy({
        where:{
            schedule_id: inv.schedule_id,
            my_id: req.body.friend_id, //초대한 사람 아이디
            friend_id: req.user.id
        }
    })
    res.status(200).send({code: 200, message: '일정 거절 완료'});

})

router.delete('/delete/:schedule_id', async(req,res,next)=>{ //스케줄 만든사람이 스케줄 삭제
    let schedule = await Schedule.findOne({
        where:{
            id : req.params.schedule_id
        }
    })
    if(schedule.dataValues.my_id === req.user.id){
        await Schedule.destroy({
            where:{
                id : req.params.schedule_id,
                my_id : req.user.id
            }
        })
        res.status(200).send({code: 200, message: '일정 삭제 완료'});
    } else{
        res.status(200).send({code: 200, message: '이 일정을 삭제할 권한이 없습니다.'});
    }
    
})

router.delete('/exit/:schedule_id', async(req,res,next)=>{ //스케줄 나가기
    let schedule = await Schedule.findOne({
        where :{
            id : req.params.schedule_id
        }
    })
    let user = await User.findOne({
        where :{
            id : req.user.id
        }
    })
    if(schedule.dataValues.my_id === req.user.id){
        res.status(200).send({code:200, message: '일정권한 양도 후 가능합니다.'}); 
    }else{
        await user.removeSchedules(schedule);
        res.status(200).send({code:200, message:'일정 탈퇴 완료'});
    }
})

router.patch('/modify', async(req,res,next)=>{ //스케줄 수정
    let schedule = await Schedule.findOne({
        where :{
            id : req.body.schedule_id
        }
    })

    if(schedule.dataValues.my_id !== req.user.id){
        res.status(200).send({code:200, message:'이 일정을 수정할 권한이 없습니다.'});
    }

    let check = await Schedule.findAll({ //중복된 스케줄 이름 확인
        where: {
            my_id: req.user.id,             
            schedule_name: req.body.name,   //수정 할 스케줄 이름
        }
    })
    if(req.body.name !== schedule.dataValues.schedule_name){
        if(check.length>0){
            return res.status(400).send({code: 400, message: '일정 이름을 변경해 주세요'})
        }
    }
    
    await Schedule.update(
        {
            schedule_name : req.body.name,
            date : req.body.date,
            place: req.body.place},
            {where:{
                id: req.body.schedule_id
            }
        }
    )
    res.status(200).send({code:200, message:'일정 수정이 완료되었습니다.'});
   
})

router.post('/transferSchedule', async(req,res,next)=>{ //스케줄 권한 넘기기
    let schedule = await Schedule.findOne({
        where :{
            id : req.body.schedule_id //이 스케줄 아이디
        }
    })
    let members = await schedule.getUsers();
    let check = false;

    for(let i=0; i<members.length; i++){
        if(req.body.friend_id === members[i].dataValues.id){
            check = true;
        }
    }
    
    if(schedule.my_id !== req.user.id){
        return res.status(200).send({code:200, message:'이 일정에 대한 권한양도를 할 권한이 없습니다.'});
    }
    else if(req.user.id===req.body.friend_id){
        return res.status(200).send({code:200, message:'자기 자신한테는 권한을 넘길 수 없습니다.'});
    } 
    else{
        if(!check){
            return res.status(200).send({code:200, message:'먼저 이 일정에 초대해주세요.'});
        }
        else{
            await Schedule.update({
                my_id : req.body.friend_id},  //권한을 넘길 사람 아이디
                {where:{
                    id : req.body.schedule_id
                }
            })
        }
        return res.status(200).send({code:200, message:'일정 권한을 넘겼습니다.'});
    }
})

router.post('/kick', async(req,res,next)=>{ //스케줄에서 추방
    let schedule = await Schedule.findOne({
        where:{
            id: req.body.schedule_id
        }
    })
    let check = false;
    if(schedule.dataValues.my_id === req.user.id){
        check = true;
    }
    if(!check){
        return res.status(200).send({code:200, message:'추방할 권한이 없습니다.'});
    }
    if(req.user.id === req.body.target_id){
        return res.status(200).send({code:200, message:'자기 자신은 추방할 수 없습니다.'});
    }

    let target = await User.findOne({
        where:{
            id: req.body.target_id
        }
    })
    target.removeSchedules(schedule);
    res.status(200).send({code:200,message:'추방되었습니다.'});
})

router.get('/:schedule_id', async(req,res,next)=>{ //스케줄 디테일
    let schedule = await Schedule.findOne({
        where:{
            id:req.params.schedule_id
        }
    })
    let memberCheck = await schedule.getUsers();
    let check = false;
    let members = [];
    for(let i=0; i<memberCheck.length; i++){
        let member = new Object();
        if(req.user.id===memberCheck[i].dataValues.id){
            check = true;
        }
        member.id = memberCheck[i].dataValues.id;
        member.nickname = memberCheck[i].dataValues.nickname;
        member.image = memberCheck[i].dataValues.image;
        members.push(member);   
    }
    if(!check){
        res.status(200).send({code:200, message:'이 일정을 볼 권한이 없습니다.'})
    }
    
    else{
        
        let master = await User.findOne({
            where:{
                id:schedule.dataValues.my_id
            }
        })
        schedule.dataValues.master_nickname = master.dataValues.nickname
        schedule.dataValues.member = members;

        res.status(200).send({code:200, result:schedule})
    }
})

module.exports = router;