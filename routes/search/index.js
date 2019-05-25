const Joi = require('joi');
const JWT = require('jsonwebtoken');
const models = require('../../models');
const get = require('./get');
const type = require('./type')
const like = require('./like')
const getNoUser = require('./getNoUser')
const may = require('./mayLike')
module.exports = [
    get({ JWT, Joi, models }),
    type({ JWT, Joi, models }),
    like({ JWT, Joi, models }),
    getNoUser({ JWT, Joi, models }),
    may({ JWT, Joi, models })
];
