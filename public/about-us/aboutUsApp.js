import Component from '../Component.js';
import Header from '../common/Header.js';

class AboutUsApp extends Component {

    onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);
    }
    renderHTML(){
        return /*html*/ `
        <div>
            <ul class="candidate-list">
                <li class="candidate-item">
                    <a href="https://www.linkedin.com/in/matt-munch-8157a2194"><img class="about-photo" src="../assets/Matt.png"></a>
                    <p>Matt Munch</p>
                </li>
                <li class="candidate-item">
                    <a href="https://www.linkedin.com/in/josephwtatum/"><img class="about-photo" src="../assets/joeseph.png"></a>
                    <p>Joseph Tatum</p>
                </li>
                <li class="candidate-item">
                    <a href="https://www.linkedin.com/in/samsterns/"><img class="about-photo" src="../assets/sam.jpg"></a>
                    <p>Sam Sterns</p>
                </li>
                <li class="candidate-item">
                    <a href="https://www.linkedin.com/in/alanhermanns"><img class="about-photo" src="../assets/Alan.png"></a>
                    <p>Alan Hermanns</p>
                </li>
                <li class="candidate-item">
                    <a href="https://çwww.linkedin.com/in/aaron-mullan"><img class="about-photo" src="../assets/aaron.jpg"></a>
                    <p>Aaron Mullan</p>
                </li>
            </ul>
        </div>
        `;
    }
}
export default AboutUsApp;