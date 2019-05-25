const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { models } = options;
    return {
        method: 'GET',
        path: '/users/{offset}/{limit}/{username}',
        handler: async (request, reply) => {
            // 获取凭证
            const item = request.params.username
            await models.book.findAll({
                where: {
                    creator: item,
                },
                offset: parseInt(request.params.offset),
                limit: parseInt(request.params.limit)
            }).then(res => {
                console.log(res)
                reply(JSON.stringify({code: 1, list: res, message:{res: res, data: res}, data: res}))
            }).catch(function(err){
                console.log(err)
                reply(JSON.stringify({code: -1, message:err}))
            })
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};

