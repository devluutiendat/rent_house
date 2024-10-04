    const router = require('express').Router();
    const ctrls = require('../controllers/submission');
    const Joi = require('joi');
    const validateDto = require('../middlewares/validation');
    const {stringReq,typeHouseReq,arrayReq,numberReq,string} = require('../middlewares/joiShema');
    const { verifyToken } = require('../middlewares/verifytoken');
    router.post('/addSubmission',
        verifyToken,
        validateDto(Joi.object({
            userid : numberReq,
            propertyid : numberReq,
            message:string
        })), 
        ctrls.addSub
    );
    router.delete('/deleteSub',
        verifyToken,
        validateDto(Joi.object({
          subId: numberReq,
        })), 
        ctrls.deleteSub
      );     
    router.put('/updateSub',
        verifyToken,
        validateDto(Joi.object({
            subId : numberReq,
            message:string
        })), 
        ctrls.updateSub
    );
    module.exports = router