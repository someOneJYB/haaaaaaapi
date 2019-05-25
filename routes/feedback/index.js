const Joi = require('joi');
const JWT = require('jsonwebtoken');
const models = require('../../models');
const get = require('./get')


module.exports = [

    get({ JWT, Joi, models }),


];
