const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'POST',
        path: '/comment/deleting/',
        handler: async (request, reply) => {
            // 获取凭证
            const { username, item_id} = request.payload;
            await models.comment.destroy({
               where: {
                   comment_id: username,
                   item_id: item_id
               }
            }).then(() => {
                reply(JSON.stringify({code: 10, message: 'success'}))
            }).catch(err => {
                reply(JSON.stringify({code: -10, message:JSON.stringify(err)}))
            })

        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
