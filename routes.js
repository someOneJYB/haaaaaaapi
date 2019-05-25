const login = require('./routes/user/index')
const book = require('./routes/book/index')
const search  = require('./routes/search/index')
const comment = require('./routes/comment/index')
const feedback = require('./routes/feedback/index')
const fs = require('fs');
var exec = require('child_process').exec;

module.exports = [
    {
        method: 'POST',
        path: '/submit/{index}/{title}/',
        handler: (request, reply) => {
        const {title, index} = request.params
            const data = request.payload;
            if (data.file) {
                const name = data.file.hapi.filename;
                const path = __dirname + `/uploads/${title}-${index}.jpg`;
                const file = fs.createReadStream(name.slice(7));

                data.file.on('error', (err) => console.error(err));

                data.file.pipe(fs.createWriteStream(path));

               data.file.on('end', (err) => {
                   const cmd = `cp ${name.slice(7)} ${path}`
                   fs.writeFileSync(path, fs.readFileSync(name.slice(7)));
                    const ret = {
                        url: `http://127.0.0.1:8082/${title}-${index}.jpg`,
                        headers: data.file.hapi.headers
                    }
                    console.log(JSON.stringify({ret}))
                    reply(JSON.stringify({ret}));
                })
            }

        },
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
            tags: ['api', 'tests'],
            description: '测试hello-hapi',
        },
    },
    {
        method: 'GET',
        path: '/like',
        handler: (request, reply) => {
            reply('youlike');
        },
        config: {
            tags: ['api', 'tests'],
            description: '测试like',
        },
    },
    {
        method: 'GET',
        path: '/vote',
        handler: (request, reply) => {
            reply('vote');
        },
        config: {
            tags: ['api', 'tests'],
            description: '测试vote',
        },
    },
    {
        method: 'GET',
        path: `/content/{type}`,
        handler: (request, reply) => {
            reply('content');
        },
        config: {
            tags: ['api', 'tests'],
            description: '测试content',
        },
    },
    {
        method: 'POST',
        path: `/content/{type}/add`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '创建内容',
        },
    },
    {
        method: 'POST',
        path: `/content/{type}/{item_id}/edit`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '编辑某条订单',
        },

    },
    {
        method: 'POST',
        path: `/content/{type}/{item_id}/delete`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '删除某内容',
        },
    },
    {
        method: 'POST',
        path: `/content/{type}/{item_id}/like`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '删除某内容',
        },
    },
    {
        method: 'POST',
        path: `/vote/{item_id}/{detailId}/vote`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '删除某内容',
        },
    },
    {
        method: 'POST',
        path: `/vote/{item_id}/cancel`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '删除某内容',
        },
    },
    {
        method: 'POST',
        path: `/vote/{item_id}/for`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            tags: ['api'],
            description: '删除某内容',
        },
    },
    ...login,
    ...book,
    ...search,
    ...comment,
    ...feedback,
]