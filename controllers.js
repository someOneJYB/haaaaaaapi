const Joi=require('joi');
const controllers=require('../controllers');

let login2={
    method: 'get',
    path: '/tologin2',
    config: {
        validate:{
            query: {
                nickname:Joi.min(6).max(30)required(),//校验
            }
        },
        id: 'login2'
    },
    handler: controllers.user.login2,
};
module.exports=login2;