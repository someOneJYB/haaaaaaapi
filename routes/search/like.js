const crypto = require('crypto');
const Boom = require('boom');
module.exports = (options) => {
    const {JWT, Joi, models} = options;
    return {
        method: 'GET',
        path: '/search/{offset}/{limit}/hot/{username?}',
        handler: async (request, reply) => {
            const {offset, limit, username} = request.params
            // if (username) {
            //     let result = []
            //     await models.search.findAll({
            //         where: {
            //             user_id: username,
            //         },
            //     }).then(res => {
            //         console.log('resing',res[0].dataValues.search, res.length)
            //         result = res
            //     }).catch(err => {
            //         result = 'err'
            //     })
            //     if (result === 'err' || !result.length) {
            //
            //         await models.book.findAll({
            //             where: {
            //                 like_num: {
            //                     $gt: 2
            //                 },
            //             },
            //             order: [
            //                 // Will escape username and validate DESC against a list of valid direction parameters
            //                 ['like_num', 'DESC'],
            //
            //             ],
            //             offset: parseInt(offset),
            //             limit: parseInt(limit),
            //         }).then(res => {
            //             reply(JSON.stringify({code: 1, message: 'success', list: res}))
            //         }).catch(err => {
            //             reply(JSON.stringify(err))
            //         })
            //         return;
            //     }
            //
            //     const length = result.length - 1
            //     result.reverse();
            //
            //     const text = result[0].dataValues.search
            //     await models.book.findAll({
            //         where: {
            //             $or: [
            //                 {
            //                     title:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content1:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content2:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content3:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content4:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content5:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content6:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content7:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     content8:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 },
            //                 {
            //                     creator: {
            //                         $like: `%${text}%`
            //                     }
            //                 },
            //                 {
            //                     content9:
            //                         {
            //                             $like: `%${text}%`
            //                         }
            //
            //                 }
            //             ]
            //
            //         },
            //         order: [
            //             // Will escape username and validate DESC against a list of valid direction parameters
            //             ['like_num', 'DESC'],
            //
            //         ],
            //         offset: parseInt(offset),
            //         limit: parseInt(limit),
            //     }).then(res => {
            //         reply(JSON.stringify({code: 1, message: 'success', list: res}))
            //     }).catch(err => {
            //         reply(JSON.stringify(err))
            //     })
            //     return;
            // }
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
