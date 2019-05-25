const crypto = require('crypto');
const Boom = require('boom');
const FastScanner = require('fastscan')
const moment = require('moment')
const word = require('../../bad_word')
const scanner = new FastScanner(word)

module.exports = (options) => {
    const {models} = options;
    return {
        method: 'POST',
        path: '/book/add/{type}/',
        handler: async (request, reply) => {
            // 获取凭证
            let result;
            const type = request.params.type
            var contents = ''
            const {username, title, image1 = '', content1 = '', pic='', content2 = '', image2 = '', content3 = '', image3 = '', content4 = '', image4 = '', content5 = '', image5 = '', content6 = '', image6 = '', content7 = '', image7 = '', content8 = '', image8 = '', content9 = '', image9 = '',} = request.payload;
            contents = content1 + content2 + content3 + content4 + content5 + content6 + content7 + content8 + content9
            const r = scanner.hits(contents, {quick: true, longest: false})
            // if(Object.keys(r).length) {
            //     reply({code: -10, message: '含有敏感词汇'})
            //     return
            // }
            const res = await models.book.findAll({
                where: {
                    creator: username,
                },
            }).then(res => {
                result = res
            }).catch(err => {
                console.log('err', err)
            })
            var index = result.length+1
            const id = username + type + index
            console.log('content1content1content1content1content1content1content1',content1)
            await models.book.create({
                item_id: id,
                title: title,
                content1: content1,
                image1: image1,
                content2: content2,
                image2: image2,
                content3: content3,
                image3: image3,
                content4: content4,
                image4: image4,
                creator: username,
                content5: content5,
                image5: image5,
                content6: content6,
                image6: image6,
                content7: content7,
                image7: image7,
                content8: content8,
                image8: image8,
                content9: content9,
                like_mum: 0,
                image9: image9,
                comment_num: 0,
                type: type,
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                pic,
            }).then(res => {
                reply(JSON.stringify({message: '成功添加'}))
            }).catch(err => {
                console.log('添加失败7912345678901234567890qwertyuio',err)
                reply(JSON.stringify({message: '添加失败', err: err}))
            })
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
