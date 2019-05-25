const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const {JWT, Joi, models} = options;

    return {
        method: 'POST',
        path: '/islike/',
        handler: async (request, reply) => {
            // 获取凭证

            const {username, item_id} = request.payload;

            await models.likes.findOne({
                where: {
                    like_man: username,
                    item_id,
                }
            }).then(res => {
                console.log(res)
                if(!res.length) {
                    reply(JSON.stringify({code: 1, status: true}))
                }else {
                    reply(JSON.stringify({code: 1, status: false}))
                }

            }).catch(ec => {console.log(ec); reply(JSON.stringify({code: -1, status: false}))})


        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
