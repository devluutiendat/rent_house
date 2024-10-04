const db = require('../models');

const addSub = async (req, res, next) => {
    try {
        const { userid, message, propertyid } = req.body;
        console.log(req.body);
        
        const propertyExists = await db.Property.findByPk(propertyid);
        const userExists = await db.User.findByPk(userid);
        if (!propertyExists || !userExists) {
            return res.status(404).json({
                success: false,
                message: 'Property or user does not exist'
            });
        }

        const [sub, created] = await db.submission.findOrCreate({
            where: { 
                userId: userid,
                propertyId: propertyid
            },
            defaults: {  
                userId: userid, 
                message: message,
                propertyId: propertyid
            }
        });

        if (!created) {
            return res.status(409).json({
                success: false,
                message: 'Submission already exists'
            });
        }

        return res.status(201).json({
            success: true,
            submission: sub,
            message: 'Submission registered successfully',
        });
    } catch (error) {
        next(error);
    }
};
const deleteSub = async (req, res, next) => {
    try {
        const { subId } = req.body;        
        console.log(subId);
        
        const sub = await db.submission.findByPk(subId)
        if (!sub) {
            return res.status(404).json({
                success:false,
                message:'no submission'
            })
        }
        await db.submission.destroy({
            where:{id : subId}
        });
        return res.status(201).json({
            success: true,
            message: 'Submission delete successfully',
        });
    } catch (error) {
        next(error);
    }
};
const updateSub = async (req, res, next) => {
    try {
        const { subId,message } = req.body;
        const sub = await db.submission.findByPk(subId)
        if (!sub) {
            return res.status(404).json({
                success:false,
                message:'no submission'
            })
        }
        const newSub = await db.submission.update(
            {message:message},
            {
                where : {id : subId},   
                return : true  
            }
        );
        return res.status(201).json({
            success: true,
            submission: newSub,
            message: 'Submission update successfully',
        });
    } catch (error) {
        next(error);
    }
};
module.exports ={addSub,updateSub,deleteSub}