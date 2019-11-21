import { GraphApp } from './CompareGraphApp.js';

const graphPage = new GraphApp();
const graphPageDOM = graphPage.renderDOM();
document.body.appendChild(graphPageDOM);