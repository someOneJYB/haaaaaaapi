const Joi = require('joi');
const JWT = require('jsonwebtoken');
const models = require('../../models');
const add = require('./add');
const delet = require('./delete')
const like = require('./likes')
const get = require('./get')
const getOver = require('./getOver')
const isLike = require('./isLike')
const dels = require('./del')
const item = require('./item')
const update = require('./update')
const dislike = require('./dislike')
const users = require('./users')
const usersl = require('./userlike')
console.log('users', users)
module.exports = [
    add({ JWT, Joi, models }),
    delet({ JWT, Joi, models }),
    like({ JWT, Joi, models }),
    get({ JWT, Joi, models }),
    getOver({ JWT, Joi, models }),
    isLike({ JWT, Joi, models }),
    dels({ JWT, Joi, models }),
    item({ JWT, Joi, models }),
    update({ JWT, Joi, models }),
    dislike({ JWT, Joi, models }),
    users({ JWT, Joi, models }),
    usersl({ JWT, Joi, models }),
];
