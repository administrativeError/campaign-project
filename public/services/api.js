const BASE_URL = '/api';

const URL = 'https://api.open.fec.gov/v1/schedules/schedule_a/by_size/by_candidate/?per_page=40&sort_hide_null=false&sort=size&sort_nulls_last=false&election_full=true&page=1&candidate_id=P80001571&candidate_id=P60007168&candidate_id=P00009621&candidate_id=P00010298&candidate_id=P80000722&candidate_id=P00012716&cycle=2020&api_key=7LKTy3yhFpkqLFdWu53uNRbbKghO2S2aokyPUX0o&sort_null_only=false';

let token = '';
const json = localStorage.getItem('USER');
if (json) {
    const user = JSON.parse(json);
    token = user.token;
}

if (!token && location.pathname !== '/index.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `/index.html?${searchParams.toString()}`;
}

async function fetchWithError(url, options) {
    if (token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
}

export function getData() {
    return fetchWithError(URL);
}

export function signUp(user) {
    const url = `${BASE_URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
}

export function signIn(credentials) {
    const url = `${BASE_URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}
