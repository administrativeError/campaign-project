import Component from '../Component.js';
import Header from '../common/Header.js';

class AboutUsApp extends Component {

    onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);
    }
    renderHTML(){
        return /*html*/ `<ul>
            <li>
                Matt <img src="../assets/Matt.png">
            </li>
            <li>
                Joseph <img src="../assets/joeseph.png">
            </li>
            <li>
                Sam <img src="../assets/sam.png">
            </li>
            <li>
                Alan <img src="../assets/Alan.png">
            </li>
            <li>
                Aaron <img src="../assets/Aaron.png">
            </li>
        </ul>`;
    }
}
export default AboutUsApp;