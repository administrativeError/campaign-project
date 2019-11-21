import Component from '../Component.js';
import CandidateItem from './CandidateItem.js';
import { getFavorites } from '../services/api.js';


class CandidateList extends Component {

    async onRender(ul) {

        const currentFavorites = await getFavorites();

        // const favoritesIdsObject = currentFavorites.reduce((acc, curr) => {
        //     acc[curr.candidate_id] = curr.candidate_id;
        //     return acc;
        // }, {});

        const candidates = this.props.candidates;
        const favList = this.props.favList;

        candidates.results.forEach(candidate => {
            const candidateItem = new CandidateItem({ candidate, currentFavorites });
            const candidateItemDOM = candidateItem.renderDOM();

            
            currentFavorites.find(favorite => {
                if (candidate.candidate_id === favorite.candidate_id) {
                    candidateItemDOM.classList.add('candidate-favorite');
                    return;         
                }
            });

            ul.appendChild(candidateItemDOM);
        });

        // candidates.results.forEach(candidate => {
        //     const candidateItem = new CandidateItem(candidate);
        //     
        // });
    }

    renderHTML() {
        return /*html*/ `
        <ul class="candidate-list"></ul>   
        `;
    }

}

export default CandidateList;