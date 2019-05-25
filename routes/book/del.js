const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'POST',
        path: '/comment/deletes/',
        handler: async (request, reply) => {
            // 获取凭证
            const { username, content, item_id} = request.payload;
            let result, l
            await models.book.findOne({
                where: {
                    item_id: item_id,
                },
            }).then(res => {
                console.log(res)
                l = res.dataValues.comment_num
                console.log(l)
            }).catch(function(err){
                result = '0'
                reply(JSON.stringify({code: -1, message:'无法更新book'}))
            })
            if(result === '0') {
                return
            }
            await models.book.update({
                comment_num: l - 1 < 0 ? 0 : l - 1
            },{
                where: {
                    item_id: item_id
                }
            }).then(res => {
                console.log(res)
                reply(JSON.stringify({code: 1, message:res[0] }))
            }).catch(err => {
                result = '124'
                console.log('err',err)
                reply(JSON.stringify({code: -1, message:JSON.stringify(err)}))
            })



        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
