const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const {models} = options;
    return {
        method: 'POST',
        path: '/book/update/',
        handler: async (request, reply) => {
            const {item_id, image1 = '', content1 = '', pic='', content2 = '', image2 = '', content3 = '', image3 = '', content4 = '', image4 = '', content5 = '', image5 = '', content6 = '', image6 = '', content7 = '', image7 = '', content8 = '', image8 = '', content9 = '', image9 = '',} = request.payload;
            const res = await models.book.update({
                content1: content1,
                image1: image1,
                content2: content2,
                image2: image2,
                content3: content3,
                image3: image3,
                content4: content4,
                image4: image4,
                content5: content5,
                image5: image5,
                content6: content6,
                image6: image6,
                content7: content7,
                image7: image7,
                content8: content8,
                image8: image8,
                content9: content9,
            },{
                where: {
                    item_id: item_id,
                },
            }).then(res => {
                reply(JSON.stringify({message: '成功添加'}))
            }).catch(err => {
                reply(JSON.stringify({message: '添加失败'}))
            })
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
