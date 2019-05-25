const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { models } = options;
    return {
        method: 'GET',
        path: '/book/get/{item_id}/detail',
        handler: async (request, reply) => {
            // 获取凭证
            const item = request.params.item_id
            await models.book.findOne({
                where: {
                    item_id: item,
                },
            }).then(res => {
                reply(JSON.stringify({code: 1, res: res}))
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


