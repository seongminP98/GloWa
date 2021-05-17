const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');


const ReqFriend = require('../models/reqFriends');
const User = require('../models/user');

router.post('/search', async (req,res,next)=>{
    let list = await User.findAll({
        attributes:['id','nickname'],
        where:{ 
            nickname:{
                [Op.like]: `%${req.body.req_nickname}%`
            }
        }
    })
    if(list){
        res.status(200).send({code: 200, ...list})
    } else{
        res.status(400).send({code: 400, message: '찾는 닉네임이 없습니다'})
    }
})


router.post('/add', async (req,res,next)=>{
    await ReqFriend.create({
        my_id: req.body.id,
        req_friend_id: req.body.req_id,
    })
    res.status(200).send({code:200, message: '친구 요청 완료'});
    
})

router.get('/req/list', async (req,res,next)=>{
    let friend = await ReqFriend.findAll({
        attributes:[my_id],
        where:{
            req_friend_id: req.body.id
        }
    })
    if(friend){
        res.status(200).send({code:200, ...friend});
    } else{
        res.status(400).send({code:400, message: '받은 친구요청이 없습니다.'});
    }

})

router.post('/accept', async (req,res,next)=>{
    let friend = await ReqFriend.findOne({
        where:{
            req_friend_id: req.body.id,
            my_id: req.body.req_id, //요청보낸 사람의 아이디.
        }
    })
    let myId = await User.findOne({
        where:{
            id: friend.req_friend_id
        }
    })
    await myId.addFollowings(parseInt(friend.my_id,10));
    let fId = await User.findOne({
        where:{
            id: friend.my_id
        }
    })
    await fId.addFollowers(parseInt(friend.req_friend_id,10))
    
    await ReqFriend.destroy({
        where :{
            req_friend_nickname: req.body.nickname
        }
    })
    res.status(200).send({code:200, message: '친구요청 수락 완료'});

})

module.exports = router;