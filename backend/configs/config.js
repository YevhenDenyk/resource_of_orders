module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://0.0.0.0/3000',

}