const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'GET',
        path: '/feedback/get/{item_id}/{url}',
        handler: async (request, reply) => {
            // 获取凭证
            const item = request.params.item_id
            const url = request.params.url
            await models.feedback.findAll({
                where: {
                    sender: item,
                },
            }).then(res => {
                var l = [];
                res.forEach(item => {
                    if(item.robot_content) {
                        l.push({
                            _id: Math.random()*100000000,
                            text: item.robot_content,
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: 'React Native',
                                avatar: 'https://placeimg.com/140/140/any',
                            },
                        })
                    }else {
                        l.push({
                            _id: Math.random()*100000000,
                            text: item.content,
                            createdAt: new Date(),
                            user: {
                                _id: item,
                                name: 'React Native',
                                avatar: `http://127.0.0.1:8082/${url}`,
                            },
                        })
                    }
                })
                l = l.reverse()
                console.log(l)
                reply(JSON.stringify({code: 1,  list: l, message: 'success'}))
            }).catch(err => {
                console.log(err)
                reply({code: -1, num: 0, err: JSON.stringify(err), message: 'fail'})
            })
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
