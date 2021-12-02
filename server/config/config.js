require('dotenv').config();

const env = process.env.NODE_ENV;
const envUsername= process.env.DB_USERNAME;
const envPassword = process.env.DB_PASSWORD;
const envDatabase = process.env.DB_NAME;
const envHost = process.env.DB_HOST;



//set env variables
const development = {
    env,
    db: {
        username: envUsername,
        password: envPassword,
        database: envDatabase,
        host: envHost,
    },

    //uncomment the below keys when using the sequelize cli
    username: envUsername,
    password: envPassword,
    database: envDatabase,
    host: envHost,
    dialect: 'mysql',

};



const config = {
    development,
};


module.exports = config[env];