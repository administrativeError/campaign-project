import AuthApp from './LoginApp.js';
if (localStorage.getItem('USER')) {
    window.location = '../main/main.html';
    alert('Must log out to return to log in page.');
}
const app = new AuthApp();
document.body.prepend(app.renderDOM());