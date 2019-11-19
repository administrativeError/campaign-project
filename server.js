require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const superagent = require('superagent');
const PORT = process.env.PORT || 3001;
const client = require('./lib/client');

const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT *
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
        INSERT into users (email, display_name, hash)
        VALUES ($1, $2, $3)
        RETURNING id, email, display_name as "displayName";
        `,
        [user.email, user.displayName, hash]
        ).then(result => result.rows[0]);
        
    }
});

app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data
// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

app.post('/api/favs', async(req, res) => {
    const candidateId = req.body;
    const userId = req.headers.id;
    console.log(userId);
    console.log(candidateId);
    const result = await client.query(`
    INSERT INTO favorites 
    (candidate_id, 
    user_id)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [candidateId, userId]);
    res.json(result.rows[0]);
    
});

app.get('/api/test', (req, res) => {
    res.json({
        message: `the user's id is ${req.userId}`
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});