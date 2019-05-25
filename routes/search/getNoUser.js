const crypto = require('crypto');
const Boom = require('boom');

module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'GET',
        path: '/search/get/',
        handler: async (request, reply) => {
            // 获取凭证
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
        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
