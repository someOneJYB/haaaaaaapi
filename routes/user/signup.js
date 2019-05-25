const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { Joi, models } = options;
    return {
        method: 'POST',
        path: '/signup/',
        handler: async (request, reply) => {
            // todo ip 注册次数限制
            // 获取凭证
            const { username, password, pic } = request.payload;
            const res = await models.user.findOne({
                where: { username }
            });
            if (res && res.username) {
                reply(JSON.stringify({
                    code: -1,
                    message: '用户名重复'
                }));
                return
            } else {
                const encryptedPasswd = crypto.createHmac('sha256', process.env.PASSWD_SECRET).update(password).digest('hex');
                await models.user.create({
                    username,
                    password: encryptedPasswd,
                    pic,
                }).then(res => {
                    reply(JSON.stringify({code: 1, token: encryptedPasswd}))
                }).catch(err => (JSON.stringify({code: 1, err: err})));

            }
        },
        config: {
            tags: ['api'],
            description: '用户注册',
            auth: false,
        },
    };
};
