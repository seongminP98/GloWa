const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const db = require('../models');

const ReqFriend = require('../models/reqFriends');
const User = require('../models/user');

router.post('/search', async (req,res,next)=>{
    let list = await User.findAll({
        attributes:['id','nickname','image'],
        where:{ 
            [Op.and]:[
                {nickname:{
                    [Op.like]: `%${req.body.req_nickname}%` //검색할 닉네임
                }},
                {id : {[Op.notIn]:[req.user.id]}} //나는 검색목록에 제외
            ]
            
        }
    })
    if(list){
        res.status(200).send({code: 200, result: list})
    } else{
        res.status(400).send({code: 400, message: '찾는 닉네임이 없습니다'})
    }
})


router.post('/add', async (req,res,next)=>{
    let alreadyReq = await ReqFriend.findAll({ //이미 친구요청을 보냈는지 확인.
        where:{
            req_friend_id: req.body.req_id,  //친구 추가할 아이디
            my_id: req.user.id,             //내 아이디
        }
    })
    
    if(Array.isArray(alreadyReq) && alreadyReq.length){
        return res.status(400).send({code:400, message: '이미 친구요청을 보냈습니다.'});
    }
    let alreadyRes = await ReqFriend.findAll({ //내가 친구추가할 사람이 나한테 친구추가를 보냈을 때.
        where:{
            req_friend_id: req.user.id,  //내 아이디
            my_id: req.body.req_id,     //친구 추가할 아이디
        }
    })
    if(Array.isArray(alreadyRes) && alreadyRes.length){
        return res.status(400).send({code:400, message: '상대한테 친구요청을 받은 상태입니다.'});
    }


    let user = await User.findOne({
        where:{id: req.user.id} 
    })

    let alreadyFriend = await user.getFollowings();
    let check = false;
    if(Array.isArray(alreadyFriend) && alreadyFriend.length){  //이미 친구인지 확인.
        for(let i=0; i<alreadyFriend.length; i++){
            if(alreadyFriend[i].dataValues.id === req.body.req_id){
                check = true;
            }
        }
    }

    if(check){
        return res.status(400).send({code:400, message: '이미 친구입니다.'});
    }

    await ReqFriend.create({
        my_id: req.user.id,
        req_friend_id: req.body.req_id,
    })
    res.status(200).send({code:200, message: '친구 요청 완료'});
    
})

router.get('/req/list', async (req,res,next)=>{//요청받은 친구목록
    let friend = await ReqFriend.findAll({
        where:{
            req_friend_id: req.user.id
        }
    })
    let list = [];
    if(friend.length>0){
        for(let i=0; i<friend.length; i++){
            let f = await User.findOne({
                attributes:['id', 'nickname', 'image'],
                where:{
                    id: friend[i].my_id
                }
            })
            list.push(f);
        }
    }
    
    if(list){
        res.status(200).send({code:200, result: list});
    } else{
        res.status(400).send({code:400, message: '받은 친구요청이 없습니다.'});
    }

})

router.post('/accept', async (req,res,next)=>{ //친구요청 수락
    let friend = await ReqFriend.findOne({
        where:{
            req_friend_id: req.user.id, //내 아이디
            my_id: req.body.req_id, //요청보낸 사람의 아이디.
        }
    })
    let myId = await User.findOne({
        where:{
            id: friend.req_friend_id
        }
    })


    await myId.addFollowings(parseInt(friend.my_id,10)); //
    await myId.addFollowers(parseInt(friend.my_id,10));  // 친구 관계 db에 저장.

    
    await ReqFriend.destroy({ //친구가 되었으니 친구요청목록에서 삭제
        where :{
            my_id: req.body.req_id, //나한테 친구요청보낸 사람의 아이디
            req_friend_id: req.user.id
        }
    })
    res.status(200).send({code:200, message: '친구요청 수락 완료'});

})

router.post('/reject',async (req,res,next) => { //친구요청 거절하기
    await ReqFriend.destroy({
        where :{
            my_id: req.body.req_id, //나한테 친구요청보낸 사람의 아이디
            req_friend_id: req.user.id
        }
    })
    res.status(200).send({code:200, message: '거절되었습니다.'});
})

router.get('/list',async (req,res,next) =>{
    let user = await User.findOne({
        where:{id: req.user.id}
    })
    let friend = await user.getFollowings();
    let list = [];
    if(friend.length>0){
        for(let i=0; i<friend.length; i++){
            let f = await User.findOne({
                attributes:['id', 'nickname', 'image'],
                where:{
                    id: friend[i].dataValues.id,
                }
            })
            list.push(f.dataValues);
        }
    }

    if(Array.isArray(list) && list.length){
        res.status(200).send({code:200, result: list});
    } else{
        res.status(400).send({code:400, message: '친구목록이 비어있습니다.'});
    }

})

router.delete('/delete',async (req,res,next) =>{
    let user = await User.findOne({
        where:{id: req.user.id}
    })
    let friend = await User.findOne({
        where:{id: req.body.friend_id}
    })
    
    await user.removeFollowings(friend);
    await friend.removeFollowings(user);


    res.status(200).send({code:200, message:'삭제되었습니다.'});
    
})

module.exports = router;