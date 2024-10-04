// controllers/auth.js
const { Op } = require('sequelize');
const db = require('../models');
const getSearch = async (req, res) => {
    try {
        const { minSize,maxSize,minPrice,maxPrice,address,current} = req.query;
        console.log(req.query);
                
        const a = `%${address}%`
        const itemsPerPage = 9;
        const offset = (current - 1) * itemsPerPage;
        whereConditions = {};
        
        if (!maxSize == '') {
            whereConditions.size = {
                [Op.between]: [minSize, maxSize]
            };
        }
        if (!maxPrice == '') {
            whereConditions.price = {
                [Op.between]: [minPrice, maxPrice]
            };
        }
        if (!address == '') {
            const a = `%${address.replace(/\n/g, '')}%`;
            whereConditions.address = {
                [Op.like]: a
            };
        }
console.log(whereConditions);

        const response = await db.Property.findAll({
            attributes:{
                exclude :["description"]
            },  
            where: whereConditions,
            limit: itemsPerPage,
            offset: offset, 
        })
          return res.json({
            success: Boolean(response),
            message: response ? 'got' : 'cannot get',
            properties : response
        });
    } catch (error) {
        return res.json({
            message : "cannot get"
        })
    }
};
module.exports = {
    getSearch,
};