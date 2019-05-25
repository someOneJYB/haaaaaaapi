const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { models } = options;
    return {
        method: 'GET',
        path: '/book/getList/{offset}/{limit}/{type}',
        handler: async (request, reply) => {
            // 获取凭证
            let result = [];
            const {type, offset, limit}= request.params
            await models.book.findAll({
                where: {
                    type: type,
                },
                offset: parseInt(offset),
                limit: parseInt(limit)
            }).then(res => {
               result = res;
            }).catch(function(err){
                console.log(JSON.stringify(err))
                result = null
            })
            if(result === null) {
                return reply(JSON.stringify({code: -1, message:'失败'}))
            }
            reply(JSON.stringify({
                list: [...result],
                message: '成功'
            }))
        },
        config: {
            tags: ['api'],
            description: '获取内容',
            auth: false,
        },
    };
};
function getPopover(data) {
    for(var i = 1; i < 10; i++) {
        if(data[`image${index}`]) {
            return data[`image${index}`]
        }
    }
    return null
}
