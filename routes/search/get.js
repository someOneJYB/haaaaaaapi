const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'GET',
        path: '/search/get/{username}',
        handler: async (request, reply) => {
            // 获取凭证
            let result = []
            const username = request.params.username
            await models.search.findAll({
                where: {
                    user_id: username,
                },
            }).then(res1 => {
                result = res1;
                console.log('0000000000000000000000000000000000', res1)
            }).catch(err => {
                console.log(err)
                reply({code: -1, num: 0, err: JSON.stringify(err), message: 'fail'})
            })
            if(result.length) {
                reply({code: 1, list: result, message: 'success'})
                return
            }
            if(!result.length) {
                console.log('length...............',0)
                await models.search.findAll({
                    where: {
                        times: {
                            $gt: 0
                        },
                    },
                    order: [
                        // Will escape username and validate DESC against a list of valid direction parameters
                        ['times', 'DESC'],

                    ]
                }).then(res => {
                    console.log(JSON.stringify(res))
                    reply(JSON.stringify({code: 1, message: 'success', list: res.slice(0, 10)}))
                }).catch(err => {
                    reply(JSON.stringify(err))
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
