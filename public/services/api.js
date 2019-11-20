
const BASE_URL = '/api';

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
export function getCandidates(year) {
    const url = `${BASE_URL}/candidates`;
    return fetchWithError(url, {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({ year })
    });
}
export function getCandidateCashData(year) {
    const url = `${BASE_URL}/candidate-cash`;
    return fetchWithError(url, {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(year)
    });
}

export function addAFavorite(favorite){
    const url = `${BASE_URL}/favorites/`;
    return fetchWithError(url, {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(favorite)
    });
}

export function getFavorites(){
    const url = `${BASE_URL}/favorites/`;
    return fetchWithError(url);
}

export function deleteAFavorite(favorite){
    const url = `${BASE_URL}/favorites/`;
    return fetchWithError(url, {
        method : 'DELETE',
        headers :{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(favorite)
    });
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


