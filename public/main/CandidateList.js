import Component from '../Component.js';
import CandidateItem from './CandidateItem.js';
import { getFavorites } from '../services/api.js';


class CandidateList extends Component {

    async onRender(ul) {

        const currentFavorites = await getFavorites();

        const candidates = this.props.candidates;
        
        candidates.results.forEach(candidate => {
            const candidateItem = new CandidateItem({
                candidate,
                candidateList: this,
                onCandidateClick: this.props.onCandidateClick
            });
            const candidateItemDOM = candidateItem.renderDOM();

            currentFavorites.find(favorite => {
                if (candidate.candidate_id === favorite.candidate_id) {
                    candidateItemDOM.classList.add('favorite-candidate');
                    return;         
                }
            });
            ul.appendChild(candidateItemDOM);
        });
    }

    renderHTML() {
        return /*html*/ `
        <ul class="candidate-list"></ul>   
        `;
    }

}

export default CandidateList;