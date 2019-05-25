const crypto = require('crypto');
const Boom = require('boom');
const FastScanner = require('fastscan')
const word = require('../../bad_word')

const scanner = new FastScanner(word)
module.exports = (options) => {
    const {JWT, Joi, models} = options;

    return {
        method: 'POST',
        path: '/comment/add',
        handler: async (request, reply) => {
            // 获取凭证
            let result = 0;
            let length = 0
            const {username, content, item_id, pic} = request.payload;
            const r = scanner.hits(content, {quick: true, longest: false})
            if(Object.keys(r).length) {
                reply({code: -1, message: '含有敏感词汇', word: Object.keys(r)[0]})
                return
            }
            await models.comment.findOne({
                where: {
                    comment_id: username,
                    item_id,

                }
            }).then(res => {
                result = res
                console.log(JSON.stringify(res))
            }).catch(ec => console.log(ec))
            if (result) {
                reply({code: -1, message: '一个人只能评论一次文章哦'})
                return
            }

            await models.comment.findAll({
                where: {
                    item_id: item_id,
                },
            }).catch(err => {
                console.log(err)
                result = 'fail'
                reply({code: -1, message: '失败更新'})
            }).then(res => {
                length = res.length
            })
            if (result === 'fail') {
                return
            }

            await models.comment.create({
                item_id,
                status: 'has',
                comment_id: username,
                content,
                id: result,
                comment_pic: pic || ''
            }).then(res => {
                result = 'sucees'
            }).catch(err => {
                console.log(err)
                result = 'fail1'
            })

            if (result === 'fail1') {
                reply({code: -1, message: 'fail'})
                return
            }

            console.log(result, 'AUTO_INCREMENT')
            await models.book.update({
                comment_num: length + 1
            }, {
                where: {
                    item_id: item_id,
                },
            }).catch(res => {
                console.log(10000000000)
                console.log(res)
                reply({code: -1, message: '失败'})
            }).then(res => {
                reply({code: 1, message: '评论成功'})
            })
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
