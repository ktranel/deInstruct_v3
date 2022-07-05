require('dotenv').config();

const env = process.env.NODE_ENV;
const envUsername= process.env.DB_USERNAME;
const envPassword = process.env.DB_PASSWORD;
const envDatabase = process.env.DB_NAME;
const envHost = process.env.DB_HOST;
const sessionSecret = process.env.SESSION_SECRET;

// loggly
const logglySubdomain = process.env.LOGGLY_SUBDOMAIN;
const logglyToken = process.env.LOGGLY_TOKEN;

// AWS
const awsRegion = process.env.AWS_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRECT_KEY;
const awsBucket = process.env.AWS_BUCKET;



//set env variables
const development = {
    env,
    db: {
        username: envUsername,
        password: envPassword,
        database: envDatabase,
        host: envHost,
    },
    loggly: {
        token: logglyToken,
        subdomain: logglySubdomain,
    },
    aws:{
        region: awsRegion,
        accessKey: awsAccessKey,
        secretKey: awsSecretKey,
        bucket: awsBucket,
    },
    sessionSecret,
    //uncomment the below keys when using the sequelize cli
    username: envUsername,
    password: envPassword,
    database: envDatabase,
    host: envHost,
    dialect: 'mysql',

};

const testing = {
    env,
    db: {
        username: envUsername,
        password: envPassword,
        database: envDatabase,
        host: envHost,
    },
    loggly: {
        token: logglyToken,
        subdomain: logglySubdomain,
    },
    aws:{
        region: awsRegion,
        accessKey: awsAccessKey,
        secretKey: awsSecretKey,
        bucket: awsBucket,
    },
    sessionSecret,
    //uncomment the below keys when using the sequelize cli
    username: envUsername,
    password: envPassword,
    database: envDatabase,
    host: envHost,
    dialect: 'mysql',

};


const config = {
    development,
    testing,
};


module.exports = config[env];