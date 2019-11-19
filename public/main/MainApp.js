import Component from '../Component.js';
import CandidateList from './CandidateList.js';
import Header from '../common/Header.js';
// import Footer from '../common/Footer.js';
import { getTopSixCandidates } from '../services/api.js';
import Loading from '../common/Loading.js';

class MainApp extends Component {
    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const loading = new Loading();
        dom.appendChild(loading.renderDOM());

        // const footer = new Footer();
        // dom.appendChild(footer.renderDOM());

        const main = dom.querySelector('main');
        const candidateList = new CandidateList({ candidates: [] });
        main.appendChild(candidateList.renderDOM());

        try {
            const candidates = await getTopSixCandidates();
            candidateList.update({ candidates });
        }
        catch (err) {
            console.log('Load candidates failed\n', err);
        }
        finally {
            setTimeout(() => {
                loading.update({ loading: false });
            }, 500);
        }
        
    }



    renderHTML() {
        return /*html*/`
        <div>
            <main>
        
            </main>
        </div>
        `;
    }
}
export default MainApp;