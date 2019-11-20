import Component from '../Component.js';
import CandidateList from './CandidateList.js';
import CompareButton from '../common/CompareButton.js'
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { getCandidates } from '../services/api.js';
import Loading from '../common/Loading.js';

class MainApp extends Component {
    async onRender(dom) {

        const main = dom.querySelector('main');

        const header = new Header();
        dom.prepend(header.renderDOM());

        const loading = new Loading();
        console.log(loading.renderDOM())
        dom.appendChild(loading.renderDOM());

        const candidates = await getCandidates();
        const candidateList = new CandidateList({ candidates });
        main.appendChild(candidateList.renderDOM());

        try {
            // const candidates = await getTopTwentyCandidates();
            // candidateList.update({ candidates });
        }
        catch (err) {
            console.log('Load candidates failed\n', err);
        }
        finally {
            setTimeout(() => {
                loading.update({ loading: false });
            }, 500);
        }

        const compareButton = new CompareButton();
        dom.appendChild(compareButton.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());
        
    }



    renderHTML() {
        return /*html*/`
        <div class="main-container">
            <main>
        
            </main>
        </div>
        `;
    }
}
export default MainApp;