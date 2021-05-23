require('dotenv').config(); //
module.exports = {
    NODE_ENV:process.env.NODE_ENV,
    CLOUNDRY_NAME: process.env.CLOUNDRY_NAME,
    CLOUNDRY_API_KEY: process.env.CLOUNDRY_API_KEY,
    CLOUNDRY_API_SECRET_KEY: process.env.CLOUNDRY_API_SECRET_KEY,
    PORT: process.env.PORT,
    DATABASE_MONGO_URL: process.env.DATABASE_MONGO_URL
}