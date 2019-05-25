const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'POST',
        path: '/login',
        handler: async (request, reply) => {
            // 获取凭证
            // const { username, password } = request.payload.userInfo;
            const { username, password } = request.payload;
            const encryptedPasswd = crypto.createHmac('sha256', process.env.PASSWD_SECRET).update(password).digest('hex');
            let reponseMess
            const res = models.user.findOne({
                where: {
                    username: username,
                    password: encryptedPasswd
                },
            }).then(result => {
                console.log(result)
                if(result!==null){
                    reponseMess={
                        code:1,
                        message:'已经在数据库中查询到',
                        password: result.password,
                        pic: result.pic
                    }
                }else{
                    reponseMess={
                        code:-1,
                        message:'未在数据库中查询到'
                    }
                }
                reply(reponseMess);
            })

        },
        config: {
            tags: ['api'],
            description: '用户登录并创建 JWT',
            // validate: {
            //     payload: {
            //         username: Joi.string().max(30).required().description('用户名'),
            //         password: Joi.string().min(8).max(30).required().description('密码'),
            //     },
            // },
            auth: false,
        },
    };
};
