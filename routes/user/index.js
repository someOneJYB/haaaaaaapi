const Joi = require('joi');
const JWT = require('jsonwebtoken');
const models = require('../../models');
const login = require('./login');
const signup = require('./signup')

const GROUP_NAME = 'user';

module.exports = [
    login({ JWT, Joi, models }),
    signup({ Joi, models }),
];
