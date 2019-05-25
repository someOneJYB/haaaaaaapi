const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'POST',
        path: '/book/like/{username}/',
        handler: async (request, reply) => {
            // 获取凭证
            let result = 0;
            let length = 0
            const {item_id }= request.payload
            await models.likes.findOne({
                where: {
                    like_man: request.params.username,
                    item_id: item_id
                },
            }).then(res => {
                if(res !== null) {
                    reply({code: 500, message:'不可以重复喜欢'})
                    result = null
                }else {
                    result = '120'
                }

            }).catch(err => {
                result = null
                console.log(err)
                reply({code: -1, message:'投票查询错误'})
            })
            if(result == null) {
                return
            }

            await models.book.findOne({
                where: {
                    item_id: item_id,
                },
            }).then(res => {
                console.log('res', res)
                length = res.like_num + 1
            }).catch(err => {
                console.log('errrrrrrrrrrrrr',err)
            })
            await models.book.update({
               like_num: length
            },{
                where: {
                    item_id: item_id,
                },
            }).catch(res => {
                result = 'fali'
                reply({code: -1, message:'失败'})
            })
            if(result === 'fail') {
                return
            }
            await models.likes.create({
                like_man: request.params.username,
                item_id: item_id
            }).then(res => {
                reply({code: 100, message:'成功更新like表'})
            }).catch(err => {
                reply({code: -1, message:'成功但是未更新like表'})
            })

        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
