import Component from '../Component.js';
import CandidateList from './CandidateList.js';
import CompareButton from '../common/CompareButton.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import { getCandidates, getFavorites } from '../services/api.js';
import Loading from '../common/Loading.js';

class MainApp extends Component {
    
    async onRender(dom) {
        this.state.numberOfFavorites = 0;

        const currentFavorites = await getFavorites();
        this.state.numberOfFavorites = currentFavorites.length;
        // console.log(numberOfFavorites);
        const main = dom.querySelector('main');

        const header = new Header();
        dom.prepend(header.renderDOM());

        const loading = new Loading();
        
        dom.appendChild(loading.renderDOM());
        localStorage.setItem('YEAR', '2020');
        const yearArray = [];
        for (let i = 2020; i > 1979; i = i - 4){
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
                this.state.numberOfFavorites = this.state.numberOfFavorites + addThisNumberToState;
                compareButton.update({numberOfFavorites: this.state.numberOfFavorites});
                console.log(this.state.numberOfFavorites);
            }     
        });
        
        main.appendChild(candidateList.renderDOM());
        
        // const compareButtonListener = dom.querySelectorAll('#compare-button-bottom');
        
   
        // compareButtonListener.addEventListener('click', () => {
        //     window.location='../compare/compare-graph.html';
        // });

        yearSelect.addEventListener('change', async(event) => {

            const value = event.target.value;
            if (localStorage.getItem('YEAR')){
                localStorage.removeItem('YEAR');
                localStorage.setItem('YEAR', value);
            } else localStorage.setItem('YEAR', value);
            
            const candidates = await getCandidates(value);
            
            candidateList.update({ candidates });
        });
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
        const compareButton = new CompareButton({numberOfFavorites: this.state.numberOfFavorites});
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