const router = require('express').Router();
const ctrls = require('../controllers/user');
const Joi = require('joi');
const validateDto = require('../middlewares/validation');
const {stringReq,typeHouseReq,arrayReq,numberReq,string} = require('../middlewares/joiShema');
const { verifyToken } = require('../middlewares/verifytoken');
router.post('/getAgent',
    verifyToken,
    validateDto(Joi.object({
        current : numberReq,
        userid : numberReq,
    })), 
    ctrls.getAgent
);
router.post('/getUser',
    verifyToken,
    validateDto(Joi.object({
        userid : numberReq,
    })), 
    ctrls.getUser
);
router.put('/updateUser',
    verifyToken,
    validateDto(Joi.object({
        UserId : numberReq,
        phone:stringReq,
        name:stringReq,
        avatar:stringReq,
        oldPassword:stringReq,
        email:stringReq,
        password:string,
    })), 
    ctrls.updateUser
);
module.exports = router