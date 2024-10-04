const joi = require('joi')

exports.string = joi.string().allow(null ,'')
exports.stringReq = joi.string().required()
exports.number = joi.number().allow(null ,'')
exports.numberReq = joi.number().required()
exports.array = joi.array().allow(null ,'')
exports.arrayReq = joi.array().required()
exports.typeReq = joi.string().valid('user', 'agent').required();
exports.typeHouseReq = joi.string().valid('already', 'updating', 'pending').required();
