import AuthApp from './LoginApp.js';

const app = new AuthApp();
document.body.prepend(app.renderDOM());