const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '261429',
    database: 'postgres',
    port: 5434,
});
module.exports = pool;






// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
// user: process.env.DATABASE_USER,
// host: process.env.DATABASE_HOST,
// database: process.env.DATABASE_NAME,
// password: process.env.DATABASE_PASSWORD,
// port: process.env.DATABASE_PORT,
// });

// module.exports = pool;