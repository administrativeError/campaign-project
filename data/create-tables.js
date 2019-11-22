const client = require('../lib/client');

run();

async function run() {
    try {
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY NOT NULL,
                display_name VARCHAR(256) NOT NULL,
                email VARCHAR(256) NOT NULL UNIQUE,
                hash VARCHAR(512) NOT NULL
            );

            CREATE TABLE favorites (
                id SERIAL PRIMARY KEY NOT NULL,
                candidate_id VARCHAR(256) NOT NULL,
                user_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}