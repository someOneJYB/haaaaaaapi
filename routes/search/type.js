const crypto = require('crypto');
const Boom = require('boom');
module.exports = (options) => {
    const { JWT, Joi, models } = options;
    return {
        method: 'GET',
        path: '/search/{word}/{offset}/{limit}/{type}/{username?}',
        handler: async (request, reply) => {
            let result = false
            var time = 0
            const {type,offset, limit, word, username} = request.params
            console.log('username==============', username)
            if(username && username!== 'undefined') {
                await models.search.findOne({
                    where:{
                        user_id: username,
                        search: word,
                    }
                }).then(res => {
                    console.log('findinging........................................................',res)
                    if(res === null) {
                        result = true
                    }else {
                        console.log('sha',res.times)
                        time = res.times + 1
                        result = false

                    }
                }).catch((err) => {
                    console.log(err)
                    result = false
                })
                if(result) {
                    console.log('nonononono..///////////////////////////////////////////////////')
                    await models.search.create({
                        user_id: username,
                        search: word,
                        times: 1,
                    })
                }
                await models.search.update({
                    times: time
                },{
                    where: {
                        user_id: username,
                        search: word,
                    },


                })

            }
            await models.book.findAll({
                    where: {
                            type: type,
                        $or: [
                                    {
                                        title:
                                        {
                                            $like: `%${word}%`
                                        }

                                    },

                                {
                                    content1:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word}%`
                                        }

                                },
                            {
                                creator:  {
                                    $like: `%${word}%`
                                }
                            },
                                {
                                    content9:
                                        {
                                            $like: `%${word}%`
                                        }

                                }
                            ]

                    },
                    offset: parseInt(offset),
                    limit: parseInt(limit),
                }).then(res => {
                    console.log('resing', res)
                reply(JSON.stringify({code: 1, list: res}))
                }).catch(err => {
                    console.log(90000000000000000000000000)
                    console.log(err)
                reply(JSON.stringify({code: -1, message:'失败'}))
                })

        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
