const express = require('express');
const router = express.Router();
const Favorites = require('../models/favorites');
const db = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');

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
        return res.status(200).send({code: 200, message : '이미 추가한 장소입니다.'});
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
        return res.status(200).send({code: 200, result: list});
    } else{
        return res.status(200).send({code: 200, message: '즐겨찾기 리스트가 비어있습니다.'})
    }
})

router.delete('/favorites/delete/:favorite_id', async(req,res,next)=>{
    await Favorites.destroy({
        where:{
            id: req.params.favorite_id,
        }
    })
    res.status(200).send({code: 200, message: '삭제되었습니다.'});
})

try{
    fs.readdirSync('uploads');
} catch(error){
    console.error("uploads폴더를 생성합니다.")
    fs.mkdirSync('uploads')
}

const upload = multer({
    dest: './uploads'
});

router.post('/image', upload.single('img'), async (req,res,next)=>{ //req.file로 이미지 들어옴
    //upload.single('img') : 폼데이터의 속성명이 img이거나 폼 태그 인풋의 name이 img인 파일 하나를 받는다.
    console.log(req.flie);
    let img = `/img/${req.file.filename}`;
    await User.update(
        {image: req.file},
        {where:{id: req.user.id}}
        )
    res.status(200).send({code:200, result: img});
})



module.exports = router;