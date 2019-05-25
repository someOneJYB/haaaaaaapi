const crypto = require('crypto');
const Boom = require('boom');
let data = {}

function dealValue(list) {
    var w = [];
    list.forEach(item => {
        var search = item.search
        console.log(item.times)
        if (!data[search]) {
            data[search] = {}
            data[search].times = item.times
        } else {
            data[search].times += item.times;
        }
    })

    Object.keys(data).map(i => {
        w.push({
            times: data[i].times,
            search: i,
        })
    })

    w.sort((a, b) => {
        return b.times - a.times
    })

    return w
}

module.exports = (options) => {
    const {JWT, Joi, models} = options;
    return {
        method: 'GET',
        path: '/search/{offset}/{limit}/mhot/{username?}',
        handler: async (request, reply) => {
            const {offset, limit, username} = request.params
            let result = []

            if (username) {
                await models.search.findAll({
                    where: {
                        user_id: username,
                    },
                }).then(res1 => {
                    result = dealValue(res1).map(item => {
                        return item.search
                    }).slice(0, 5)
                }).catch(err => {
                    result = 'er'
                    reply({code: -1, num: 0, err: JSON.stringify(err), message: 'fail'})
                })
                if (result === 'er') {
                    return
                }
            }
            if (!username || !result.length) {
                let list = []
                await models.search.findAll().then(res => {
                    list = dealValue(res).map(item => {
                        return item.search
                    }).slice(0, 5)
                    console.log('list', list)
                }).catch(err => {
                    console.log(err)
                    list = 'err'
                    reply(JSON.stringify(err))
                })
                if (list === 'err') {
                    return
                }
                if (list.length === 1) {

                    let word = list[0]
                    await models.book.findAll({
                        where: {
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
                                    creator: {
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
                        reply(JSON.stringify({code: -1, message: '失败'}))
                    })

                }
                if (list.length === 2) {

                    let word1 = list[0]
                    let word2 = list[1]
                    await models.book.findAll({
                        where: {

                            $or: [
                                {
                                    title:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    creator: {
                                        $like: `%${word1}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word2}%`
                                    }
                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word2}%`
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
                        reply(JSON.stringify({code: -1, message: '失败'}))
                    })

                }
                if (list.length === 3) {
                    let word1 = list[0]
                    let word2 = list[1]
                    let word3 = list[2]
                    await models.book.findAll({
                        where: {

                            $or: [
                                {
                                    title:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },

                                {
                                    content3:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    creator: {
                                        $like: `%${word1}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word2}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word3}%`
                                    }
                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word3}%`
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
                        reply(JSON.stringify({code: -1, message: '失败'}))
                    })

                }
                if (list.length === 4) {
                    let word1 = list[0]
                    let word2 = list[1]
                    let word3 = list[2]
                    let word4 = list[3]
                    await models.book.findAll({
                        where: {

                            $or: [
                                {
                                    title:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    creator: {
                                        $like: `%${word1}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word2}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word3}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word4}%`
                                    }
                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word4}%`
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
                        reply(JSON.stringify({code: -1, message: '失败'}))
                    })

                }
                if (list.length === 5) {
                    let word1 = list[0]
                    let word2 = list[1]
                    let word3 = list[2]
                    let word4 = list[3]
                    let word5 = list[4]
                    await models.book.findAll({
                        where: {
                            $or: [
                                {
                                    title:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    title:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content1:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content2:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content3:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content4:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content5:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content6:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content7:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content8:
                                        {
                                            $like: `%${word4}%`
                                        }

                                },
                                {
                                    creator: {
                                        $like: `%${word1}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word5}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word2}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word3}%`
                                    }
                                },
                                {
                                    creator: {
                                        $like: `%${word4}%`
                                    }
                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word1}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word5}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word2}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word3}%`
                                        }

                                },
                                {
                                    content9:
                                        {
                                            $like: `%${word4}%`
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
                        console.log(err)
                        reply(JSON.stringify({code: -1, message: '失败'}))
                    })

                }
                return;

            }

            let list
            console.log(result)
            if (result.length > 4) {
                list = result
            } else {
                let lists = []
                await models.search.findAll().then(res => {
                    lists = dealValue(res).map(item => {
                        return item.search
                    })

                }).catch(err => {
                    lists = 'err'
                    reply(JSON.stringify(err))
                })
                if (lists === 'err') {
                    return
                }
                let all = result.concat(lists)
                all = all.filter((item, index) => {
                    return all.indexOf(item) === index
                })
                list = all.slice(0, 5)
            }
            let word1 = list[0] || 'null'
            let word2 = list[1]||'null'
            let word3 = list[2]||'null'
            let word4 = list[3]||'null'
            let word5 = list[4]||'null'
            await models.book.findAll({
                where: {
                    $or: [
                        {
                            title:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            title:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            title:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            title:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            title:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content1:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content1:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content1:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content1:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content1:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content2:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content2:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content2:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content2:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content2:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content3:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content3:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content3:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content3:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content3:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content4:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content4:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content4:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content4:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content4:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content5:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content5:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content5:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content5:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content5:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content6:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content6:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content6:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content6:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content6:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content7:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content7:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content7:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content7:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content7:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            content8:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content8:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content8:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content8:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content8:
                                {
                                    $like: `%${word4}%`
                                }

                        },
                        {
                            creator: {
                                $like: `%${word1}%`
                            }
                        },
                        {
                            creator: {
                                $like: `%${word5}%`
                            }
                        },
                        {
                            creator: {
                                $like: `%${word2}%`
                            }
                        },
                        {
                            creator: {
                                $like: `%${word3}%`
                            }
                        },
                        {
                            creator: {
                                $like: `%${word4}%`
                            }
                        },
                        {
                            content9:
                                {
                                    $like: `%${word1}%`
                                }

                        },
                        {
                            content9:
                                {
                                    $like: `%${word5}%`
                                }

                        },
                        {
                            content9:
                                {
                                    $like: `%${word2}%`
                                }

                        },
                        {
                            content9:
                                {
                                    $like: `%${word3}%`
                                }

                        },
                        {
                            content9:
                                {
                                    $like: `%${word4}%`
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
                console.log(err)
                reply(JSON.stringify({code: -1, message: '失败'}))
            })


        },
        config: {
            tags: ['api'],
            description: '添加内容',
            auth: false,
        },
    };
};
