const Joi = require('joi');
const JWT = require('jsonwebtoken');
const models = require('../../models');
const add = require('./add');
const delet = require('./delete')
// const like = require('./like')
const get = require('./get')
const users = require('./users')

module.exports = [
    add({ JWT, Joi, models }),
    delet({ JWT, Joi, models }),
    get({ JWT, Joi, models }),
    users({ JWT, Joi, models })

];
