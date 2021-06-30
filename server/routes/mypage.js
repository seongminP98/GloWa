const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites');
const db = require('../models');

router.post('/favorites/add',async (req,res,next)=>{
    let already_check = await Favorites.findAll({
        where : {
            my_id : req.user.id,
            restaurant : req.body.restaurant,
            address : req.body.address,
            kind : req.body.kind,
        }
    })
    if(already_check.length>0){
        res.status(200).send({code: 200, message : '이미 추가한 장소입니다.'});
    }

    await Favorites.create({
        my_id : req.user.id,
        restaurant : req.body.restaurant,
        address : req.body.address,
        kind : req.body.kind,
    })

    res.status(200).send({code: 200, message: '즐겨찾기 등록 완료'});
})

router.get('/favorites/list', async (req,res,next)=>{
    let list = await Favorites.findAll({
        where : {
            my_id : req.user.id,
        }
    })
    if(list.length>0){
        res.status(200).send({code: 200, result: list});
    } else{
        res.status(200).send({code: 200, message: '즐겨찾기 리스트가 비어있습니다.'})
    }
})

router.delete('/favorites/delete', async(req,res,next)=>{
    await Favorites.destroy({
        where:{
            id: req.body.favorite_id,
        }
    })
    res.status(200).send({code: 200, message: '삭제되었습니다.'});
})