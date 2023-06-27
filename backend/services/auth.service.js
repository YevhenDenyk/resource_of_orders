const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Auth = require('../databases/Auth')
const ApiError = require("../error/ApiError");
const {ACCESS_SECRET, REFRESH_SECRET, ACTION_TOKEN_SECRET} = require("../configs/config");
const {tokenTypeEnums} = require('../enums');

module.exports = {

    hashPassword: async (password) => {
        return bcrypt.hash(password, 10);
    },
    comparePassword: async (password, hashPassword) => {
        const isPassSame = await bcrypt.compare(password, hashPassword);

        if (!isPassSame) {
            throw new ApiError('Wrong password', 400)
        }
    },
    compareOldPassword: (hashPassword, password) => {
        return bcrypt.compare(password, hashPassword);
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '1d'});

        return {
            accessToken,
            refreshToken
        }
    },

    checkTokenPair: (token = '', tokenType = tokenTypeEnums.ACCESS_TOKEN) => {
        try {
            let secretWord = ''

            if (tokenType === tokenTypeEnums.ACCESS_TOKEN) secretWord = ACCESS_SECRET;
            else if (tokenType === tokenTypeEnums.REFRESH_TOKEN) secretWord = REFRESH_SECRET;

            return jwt.verify(token, secretWord)

        } catch (e) {
            throw new ApiError('Token invalid', 401)
        }
    },

    generateActionToken: (dataToSign = {}) => {
        return jwt.sign(dataToSign, ACTION_TOKEN_SECRET, {expiresIn: '1d'})
    },

    checkActionToken: (actionToken) => {
        try {
            return jwt.verify(actionToken, ACTION_TOKEN_SECRET)
        } catch (e) {
            throw new ApiError('Token invalid', 401)
        }
    },


    createInBase: async (essenceId, essenceEmail, accessLevel, accessToken, refreshToken) => {
        return Auth.create({essenceId, essenceEmail, accessLevel, accessToken, refreshToken})
    },
    findByToken: async (token = {}) => {
        return Auth.findOne(token)
    },
    deleteById: async (_id) => {
        return Auth.deleteOne({_id})
    },
    deleteMany: async (filter = {}) => {
        return Auth.deleteMany(filter)
    }


}