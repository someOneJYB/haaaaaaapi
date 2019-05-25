const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { models } = options;
    return {
        method: 'GET',
        path: '/book/get/{item_id}',
        handler: async (request, reply) => {
            // 获取凭证
            const item = request.params.item_id
            await models.book.findOne({
                where: {
                    item_id: item,
                },
            }).then(res => {
                console.log('io')
                reply(JSON.stringify({code: 1, message:{res: res, item: getContent(res), data: res}, data: res}))
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

function getContent(data) {
    const list = []
    for(var i = 1; i < 10; i++) {
        list.push({img: data[`image${i}`]||'', text: data[`content${i}`]||''})
    }
    return list;
}
