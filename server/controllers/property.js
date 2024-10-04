const { where } = require('sequelize');
const db = require('../models');

const addProperty = async (req, res, next) => {
    try {
        const { agentId , description,address, images,laterUpdate, price, status,size,name} = req.body;
        const typeUser = await db.User.findByPk(agentId, {
            attributes: ['role'],
        });
        
        if (typeUser === null || typeUser.role !== "agent") {
            return res.status(403).send('Forbidden');
        }
        
        const [Property, created] = await db.Property.findOrCreate({
            where:{address : address},
            defaults: {  ...req.body
            }
        });

        if (!created) {
            return res.status(409).json({
                success: false,
                message: 'can not create'
            });
        }

        return res.status(200).json({
            success: true,
            Property: Property,
            message: 'Property registered successfully',
        });
    } catch (error) {
        next(error);
    }
};
const deleteProperty = async (req, res, next) => {
    try {
        const { PropertyId } = req.body;    
        console.log(req.body);
        
        const Property = await db.Property.findByPk(PropertyId)
        if (!Property) {
            return res.status(404).json({
                success:false,
                message:'no Property'
            })
        }
        const proDelete = await db.Property.destroy({
            where:{id : PropertyId}
        });
        return res.status(200).json({
            success: true,
            message: 'Property delete successfully',
        });
    } catch (error) {
        next(error);
    }
};
const updateProperty = async (req, res, next) => {
    try {
        const {message ,name, description,address, images,laterUpdate, price, status,size,PropertyId} = req.body;
        const Property = await db.Property.findByPk(PropertyId)
        if (!Property) {
            return res.status(404).json({
                success:false,
                message:'no Property'
            })
        }
        const newProperty = await db.Property.update(
            {...req.body},
            {
                where : {id : PropertyId},   
                return : true  
            }
        );
        return res.status(201).json({
            success: true,
            Property: newProperty,
            message: 'Property update successfully',
        });
    } catch (error) {
        next(error);
    }
};
module.exports ={addProperty,updateProperty,deleteProperty}