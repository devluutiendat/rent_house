// controllers/auth.js
const { throwError } = require('../middlewares/error');
const db = require('../models');

const getData = async (req, res) => {    
    try {
        const current = req.query.current
        const itemsPerPage = 9;
        const offset = (current - 1) * itemsPerPage;
        const response = await db.Property.findAll({
            attributes:{
                exclude :["description"]
            },
            where: { status: "already" },
            limit: itemsPerPage,
            offset: offset, 
        })
        return res.json({
            success: Boolean(response),
            message: response ? 'got' : 'cannot get',
            properties : response
        });
    } catch (error) {
        console.error(error); 
    }
};
const getDataId = async (req, res) => {
   const  idProperty  = parseInt(req.params.id,10);   
    try {
        const Property = await db.Property.findOne({
            where: { id: idProperty },
            attributes:{
                exclude : ["createdAt","updatedAt"]
            }
        })
        const agent = await db.User.findOne({
            where : { id : Property.agentId},
            attributes:{
                exclude : ["createdAt","updatedAt"]
            }
        })
        const sub = await db.submission.count({
            where: {propertyId: idProperty},
            attributes : {
                exclude : ["password","createdAt","updatedAt"]
            }
        })
        return res.json({
            success: Boolean(Property),
            message: Property ? 'got' : 'cannot get',
            properties : Property,
            agent : agent,
            submissions : sub,
        });
    } catch (error) {
        return res.json({
            error : error.message
        })
    }
};

module.exports = {
    getData,
    getDataId,
};