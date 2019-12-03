require('dotenv').config();

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const superagent = require('superagent');
const PORT = process.env.PORT || 3001;
const apiKey = process.env.API_KEY;

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
app.use('/api/auth', authRoutes); // setup authentication routes
app.use('/api', ensureAuth); // everything that starts with "/api" below here requires an auth token!

const URL = 'https://api.open.fec.gov/v1/';

const throwError = (res, err) => {
    console.log(err);
    res.status(500).json({
        error: err.message || err
    });
};

app.post('/api/candidates', async (request, response) => {
    const year = request.body.year;
    const yearInt = parseInt(year);


    const candidateNamesURL = `${URL}elections/?sort_null_only=true&page=1&election_full=true&sort_nulls_last=true&sort=-total_receipts&cycle=${yearInt}&sort_hide_null=true&office=president&api_key=${apiKey}&per_page=20`;
    const candidateNames = await superagent.get(candidateNamesURL);
    const actualCandidateNames = JSON.parse(candidateNames.text);
    response.json(actualCandidateNames);
});
const nameData = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.log(error);
    }
};

const makeCandidateCashUrl = (candidateIdArray, yearInt) =>
    candidateIdArray
        .reduce((acc, curr) => `${acc}&candidate_id=${curr}`,
            `${URL}schedules/schedule_a/by_size/by_candidate/? per_page=100&&api_key=${apiKey}&sort_null_only=false&cycle=${yearInt}&sort_hide_null=false&sort=size&sort_nulls_last=false&election_full=true&page=1`);

app.post('/api/candidate-cash', async (request, response) => {
    const year = request.body.year;
    const yearInt = parseInt(year);
    const candidateNamesURL = `${URL}elections/?sort_null_only=true&page=1&election_full=true&sort_nulls_last=true&sort=-total_receipts&cycle=${yearInt}&sort_hide_null=true&office=president&api_key=${apiKey}&per_page=20`;
    const candidateNames = await nameData(candidateNamesURL);
    const candidateIdArray = candidateNames.results.map(({ candidate_id }) => candidate_id);


    const candidateCashURL = makeCandidateCashUrl(candidateIdArray, yearInt);
    const candidateCashData = await fetch(candidateCashURL);
    const actualCandidateCashData = await candidateCashData.json();

    response.json(actualCandidateCashData);
});


app.get('/api/favorites', async (req, res) => {
    const userId = req.userId;
    try {
        const result = await client.query(`
            SELECT * from favorites
            WHERE user_id = $1;
        `,
            [userId]
        );

        res.json(result.rows);
    }
    catch (err) {
        throwError(res, err);
    }
});

app.post('/api/favorites', async (req, res) => {
    const candidateId = req.body;
    const userId = req.userId;

    try {
        const { rows: [firstRow] } = await client.query(`
            INSERT into favorites (candidate_id, user_id)
            VALUES ($1, $2)
            RETURNING *;
        `,
            [candidateId.candidate_id, userId]
        );

        res.json(firstRow);
    }
    catch (err) {
        throwError(res, err);
    }
});

app.delete('/api/favorites', async (req, res) => {
    const candidateId = req.body;
    const userId = req.userId;

    try {
        console.log(req.body, userId);

        await client.query(`
            DELETE from favorites
            WHERE candidate_id = $1 AND user_id = $2;
        `,
            [candidateId.candidate_id, userId]
        );

        res.json({ success: true });
    }
    catch (err) {
        throwError(res, err);
    }
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});