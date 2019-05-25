const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'GET',
        path: '/book/delete/{item_id}',
        handler: async (request, reply) => {
            // 获取凭证
            let result;
            const item = request.params.item_id
            const res = await models.book.destroy({
                where: {
                    item_id: item,
                },
            }).then(res => {
                result = res
            }).catch(function(err){
                reply({code: -1, message:JSON.stringify(err)})
            })
            if(result) {
                await models.comment.update({
                    status: 'null'
                },{
                    where: {
                        item_id: item,
                    }
                }).then(res => {
                    reply({code: 1, message:'已经删除且更新评论'})
                }).catch(err => {
                    reply({code: 1, message:'已经删除更新评论失败'})
                })
            }

        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
