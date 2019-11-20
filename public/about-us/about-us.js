import AboutUsApp from './aboutUsApp.js';

const aboutUsPage = new AboutUsApp();

const aboutUsPageDOM = aboutUsPage.renderDOM();
document.body.prepend(aboutUsPageDOM);