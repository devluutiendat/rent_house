
const router = require('express').Router();
const ctrls = require('../controllers/property');
const Joi = require('joi');
const validateDto = require('../middlewares/validation');
const {stringReq,typeHouseReq,arrayReq,numberReq} = require('../middlewares/joiShema');
const { verifyToken } = require('../middlewares/verifytoken');
router.post('/addProperty',
    verifyToken,
    validateDto(Joi.object({
        name :stringReq,
        description:stringReq,
        address:stringReq,
        images:arrayReq,    
        status:typeHouseReq,
        price:numberReq,
        LaterUpdate:stringReq,
        size:numberReq,
        agentId:numberReq
    })), 
    ctrls.addProperty
);

router.delete('/deleteProperty',
    //verifyToken,
    validateDto(Joi.object({
        PropertyId : numberReq,
    })), 
    ctrls.deleteProperty
);
router.put('/updateProperty',
    verifyToken,
    validateDto(Joi.object({
        name :stringReq,
        description:stringReq,
        address:stringReq,
        images:arrayReq,    
        status:typeHouseReq,
        price:numberReq,
        LaterUpdate:stringReq,
        size:numberReq,
        PropertyId : numberReq,
    })),  
    ctrls.updateProperty
);
module.exports = router