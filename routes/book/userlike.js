const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const {JWT, Joi, models} = options;
    return {
        method: 'GET',
        path: '/users/{username}/like',
        handler: async (request, reply) => {
            // 获取凭证


            await models.likes.findAll({
                where: {
                    like_man: request.params.username,

                }
            }).then(res => {

                    reply(JSON.stringify({code: 1, status: true, num: res.length}))


            }).catch(ec => {console.log(ec); reply(JSON.stringify({code: -1, status: false}))})


        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
