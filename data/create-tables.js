const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

    try {
    
        // run a query to create tables
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
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
    
}