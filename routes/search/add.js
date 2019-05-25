const crypto = require('crypto');
const Boom = require('boom');
module.exports = (options) => {
    const { models } = options;
    return {
        method: 'POST',
        path: '/search/add/',
        handler: async (request, reply) => {
            let result = false
            let times = 0;
            const {word, username} = request.params.word
            await models.search.findOne({
                where:{
                    user_id: username,
                    search: word,
                }
            }).then(res => {
                if(res === null) {
                    result = true
                }else {
                    result = false
                    times = res.times + 1
                }
            }).catch(() => {
                result = false
            })
            if(!result || !result.length) {
                await models.search.create({
                    user_id: username,
                    search: word,

                }).then( () => {
                    reply(JSON.stringify({message: '成功'}))
                }).catch(err => {
                    reply(JSON.stringify({message: 'fail'}))
                })
            }else {
                await models.search.update({

                    times: times
                },{
                    where: {
                        user_id: username,
                        search: word,
                    }
                }).then( () => {
                    reply(JSON.stringify({message: '成功增加'}))
                }).catch(err => {
                    reply(JSON.stringify({message: 'fail了'}))
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
