const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'GET',
        path: '/comment/get/{item_id}',
        handler: async (request, reply) => {
            // 获取凭证

            const item = request.params.item_id
            await models.comment.findAll({
                where: {
                    item_id: item,
                },
            }).then(res => {
                console.log(res)
                if(res.length) {
                    reply({code: 1, num: res.length, list: res, message: 'success'})
                }else {
                    reply({code: 1, num: 0, list: [], message: 'success'})
                }
            }).catch(err => {
                reply({code: -1, num: 0, err: JSON.stringify(err), message: 'fail'})
            })
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
