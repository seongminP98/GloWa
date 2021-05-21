const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const db = require('../models');

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
        res.status(200).send({code: 200, result: list})
    } else{
        res.status(400).send({code: 400, message: '찾는 닉네임이 없습니다'})
    }
})


router.post('/add', async (req,res,next)=>{
    let alreadyReq = await ReqFriend.findAll({
        where:{
            req_friend_id: req.body.req_id,
            my_id: req.body.id,
        }
    })
    
    if(Array.isArray(alreadyReq) && alreadyReq.length){
        return res.status(400).send({code:400, message: '이미 친구요청을 보냈습니다.'});
    }
    let user = await User.findOne({
        where:{id: req.body.id}
    })

    
    let alreadyFriend = await user.getFollowings();

    if(Array.isArray(alreadyFriend) && alreadyFriend.length){
        return res.status(400).send({code:400, message: '이미 친구입니다.'});
    }

    await ReqFriend.create({
        my_id: req.body.id,
        req_friend_id: req.body.req_id,
    })
    res.status(200).send({code:200, message: '친구 요청 완료'});
    
})

router.post('/req/list', async (req,res,next)=>{//요청받은 친구목록
    let friend = await ReqFriend.findAll({
        where:{
            req_friend_id: req.body.id
        }
    })
    let list = [];
    if(friend.length>0){
        for(let i=0; i<friend.length; i++){
            console.log(friend[i]);
            let f = await User.findOne({
                attributes:['id', 'nickname'],
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
    await myId.addFollowers(parseInt(friend.my_id,10));

    
    await ReqFriend.destroy({
        where :{
            my_id: req.body.req_id, //나한테 친구요청보낸 사람의 아이디
            req_friend_id: req.body.id
        }
    })
    res.status(200).send({code:200, message: '친구요청 수락 완료'});

})

router.post('/reject',async (req,res,next) => {
    await ReqFriend.destroy({
        where :{
            my_id: req.body.req_id, //나한테 친구요청보낸 사람의 아이디
            req_friend_id: req.body.id
        }
    })
    res.status(200).send({code:200, message: '거절되었습니다.'});
})

router.post('/list',async (req,res,next) =>{
    let user = await User.findOne({
        where:{id: req.body.id}
    })
    let friend = await user.getFollowings();
    console.log(friend);
    let list = [];
    // if(friend.length>0){
    //     for(let i=0; i<friend.length; i++){
    //         let f = await User.findOne({
    //             attributes:['id', 'nickname'],
    //             where:{
    //                 id: friend[i].followingId,
    //             }
    //         })
    //         list.push(f);
    //     }
    // }
    if(Array.isArray(list) && list.length){
        res.status(200).send({code:200, result: list});
    } else{
        res.status(400).send({code:400, message: '친구목록이 비어있습니다.'});
    }

})

module.exports = router;