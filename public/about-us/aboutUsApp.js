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
                    <img class="about-photo" src="../assets/Matt.png">
                    <p>Matt Munch</p>
                </li>
                <li class="candidate-item">
                    <img class="about-photo" src="../assets/joeseph.png">
                    <p>Joseph Tatum</p>
                </li>
                <li class="candidate-item">
                    <img class="about-photo" src="../assets/sam.jpg">
                    <p>Sam Sterns</p>
                </li>
                <li class="candidate-item">
                    <img class="about-photo" src="../assets/Alan.png">
                    <p>Alan Hermanns</p>
                </li>
                <li class="candidate-item">
                    <img class="about-photo" src="../assets/Aaron.jpg">
                    <p>Aaron Mullan</p>
                </li>
            </ul>
        </div>
        `;
    }
}
export default AboutUsApp;