const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'POST',
        path: '/book/dislike/{username}/',
        handler: async (request, reply) => {
            // 获取凭证
            let result = 0;
            let length = 0
            const {item_id }= request.payload
            await models.book.findOne({
                where: {
                    item_id: item_id,
                },
            }).then(res => {
                length = res.like_num - 1
                console.log(length)
            }).catch(err => {
                console.log('errrrrrrrrrrrrr',err)
            })
            await models.book.update({
                like_num: length
            },{
                where: {
                    item_id: item_id,
                },
            }).then((res) => {}).catch((res )=> {
                console.log(res)
                result = 'fali'
                reply({code: -1, message:'失败'})
            })
            if(result === 'fail') {
                console.log(0)
                return
            }
            console.log(request.params.username)
            await models.likes.destroy({
                where: {
                    like_man: request.params.username,
                    item_id: item_id
                }
            }).then(res => {
                reply({code: 100, message:'成功更新like表'})
            }).catch(err => {
                console.log('wrtehyjukilo',err)
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
