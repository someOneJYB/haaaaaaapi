const crypto = require('crypto');
const Boom = require('boom');
module.exports = (options) => {
    const {JWT, Joi, models} = options;
    return {
        method: 'GET',
        path: '/search/{offset}/{limit}/hot/{username?}',
        handler: async (request, reply) => {
            const {offset, limit} = request.params

            await models.book.findAll({
                where: {
                    like_num: {
                        $gt: 0
                    },
                },
                order: [
                    // Will escape username and validate DESC against a list of valid direction parameters
                    ['like_num', 'DESC'],

                ],
                offset: parseInt(offset),
                limit: parseInt(limit),
            }).then(res => {
                console.log(JSON.stringify(res))
                reply(JSON.stringify({code: 1, message: 'success', list: res}))
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
