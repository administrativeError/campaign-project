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

app.post('/api/test', (req, res) => {
    res.json({
        message: `the user's id is ${req.userId}`
    });
});
app.post('/api/candidates', async(request, response) => {
    const year = request.body.year;
    const yearInt = parseInt(year);
    
    
    const candidateNamesURL = `https://api.open.fec.gov/v1/elections/?sort_null_only=true&page=1&election_full=true&sort_nulls_last=true&sort=-total_receipts&cycle=${yearInt}&sort_hide_null=true&office=president&api_key=${apiKey}&per_page=20`;
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


app.post('/api/candidate-cash', async(request, response) => {
    const year = request.body.year;
    const yearInt = parseInt(year);
    const candidateNamesURL = `https://api.open.fec.gov/v1/elections/?sort_null_only=true&page=1&election_full=true&sort_nulls_last=true&sort=-total_receipts&cycle=${yearInt}&sort_hide_null=true&office=president&api_key=${apiKey}&per_page=20`;
    const candidateNames = await nameData(candidateNamesURL);
    const candidateIdArray = candidateNames.results.map(({ candidate_id }) => candidate_id);
    const candidateCashURL = `https://api.open.fec.gov/v1/schedules/schedule_a/by_size/by_candidate/?per_page=100&sort_hide_null=false&sort=size&sort_nulls_last=false&election_full=true&page=1&candidate_id=${candidateIdArray[0]}&candidate_id=${candidateIdArray[1]}&candidate_id=${candidateIdArray[2]}&candidate_id=${candidateIdArray[3]}&candidate_id=${candidateIdArray[4]}&candidate_id=${candidateIdArray[5]}&candidate_id=${candidateIdArray[6]}&candidate_id=${candidateIdArray[7]}&candidate_id=${candidateIdArray[8]}&candidate_id=${candidateIdArray[9]}&candidate_id=${candidateIdArray[10]}&candidate_id=${candidateIdArray[11]}&candidate_id=${candidateIdArray[12]}&candidate_id=${candidateIdArray[13]}&candidate_id=${candidateIdArray[14]}&candidate_id=${candidateIdArray[15]}&candidate_id=${candidateIdArray[16]}&candidate_id=${candidateIdArray[17]}&candidate_id=${candidateIdArray[18]}&candidate_id=${candidateIdArray[19]}&api_key=${apiKey}&sort_null_only=false&cycle=${yearInt}`;
    const candidateCashData = await fetch(candidateCashURL);
    const actualCandidateCashData = await candidateCashData.json();

    response.json(actualCandidateCashData);

});


app.get('/api/favorites', async(req, res) => {
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
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/api/favorites', async(req, res) => {
    const candidateId = req.body;
    const userId = req.userId;
    
    try {
        const result = await client.query(`
            INSERT into favorites (candidate_id, user_id)
            VALUES ($1, $2)
            RETURNING *;
        `,
        [candidateId.candidate_id, userId]
        );

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }  
});

app.delete('/api/favorites', async(req, res) => {
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
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }  
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});