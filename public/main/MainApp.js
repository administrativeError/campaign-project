import Component from '../Component.js';
import CandidateList from './CandidateList.js';
import CompareButton from '../common/CompareButton.js';
import Header from '../common/Header.js';
import { getCandidates, getFavorites } from '../services/api.js';
import Loading from '../common/Loading.js';

const getDynamicYear = (electionYear) => {
    while (electionYear % 4 !== 0) {
        electionYear++;
    }
    return electionYear;
};
class MainApp extends Component {

    async onRender(dom) {
        this.state.numberOfFavorites = 0;

        const currentFavorites = await getFavorites();
        this.state.numberOfFavorites = currentFavorites.length;
        const main = dom.querySelector('main');
        const header = new Header();
        dom.prepend(header.renderDOM());
        let electionYear = new Date().getFullYear();

        getDynamicYear(electionYear);

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());
        try {
            localStorage.setItem('YEAR', `${electionYear}`);
            const yearArray = [];
            for (let i = electionYear; i > 1979; i = i - 4) {
                yearArray.push(i);
            }
            const yearSelect = dom.querySelector('.select-year');
            yearArray.forEach(year => {
                const option = document.createElement('option');
                option.textContent = year;
                option.value = year;
                yearSelect.appendChild(option);
            });

            const candidates = await getCandidates(yearSelect.value);

            const candidateList = new CandidateList({
                candidates,
                onCandidateClick: (addThisNumberToState) => {
                    // cool tracking of local state!!
                    this.state.numberOfFavorites = this.state.numberOfFavorites + addThisNumberToState;
                    compareButton.update({ numberOfFavorites: this.state.numberOfFavorites });
                }
            });

            main.appendChild(candidateList.renderDOM());
            yearSelect.addEventListener('change', async (event) => {

                const value = event.target.value;
                if (localStorage.getItem('YEAR')) {
                    localStorage.removeItem('YEAR'); // seems like you could just set over instead of removing
                    localStorage.setItem('YEAR', value);
                } else localStorage.setItem('YEAR', value);

                const candidates = await getCandidates(value);

                candidateList.update({ candidates });
            });
        }
        catch (err) {
            console.log('Load candidates failed\n', err);
        }
        finally {
            loading.update({ loading: false });
        }
        const compareButton = new CompareButton({ numberOfFavorites: this.state.numberOfFavorites });
        main.appendChild(compareButton.renderDOM());
    }

    renderHTML() {
        return /*html*/`
        <div>
            <div class="select-year-container">
                <select class="select-year"></select>
            </div>   
            <main>
            </main>
        </div>
        `;
    }
}
export default MainApp;