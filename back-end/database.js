/*

See to that you have installed every extension

npm install
npm install pg
npm install cors
npm install bcrypt
npm install cookie-parser
npm install jsonwebtoken

*/

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres", // super user on tava aga kui teil muu pange see 
    password: "123", //add your password, pange enda oma
    database: "testWad", // enda db nimi
    host: "localhost",
    port: "5433"      // muutke seda kui teine port postgressil
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
};

const createUserTable = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
    );`; // kui tahab username'i ss peab lisama siia

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id SERIAL PRIMARY KEY,
        body TEXT NOT NULL,
        likes INT4 NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
    );`;

execute(createUserTable).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});

execute(createPostsTable).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

module.exports = pool;