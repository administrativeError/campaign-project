import Component from '../Component.js';
import CandidateItem from './CandidateItem.js';
import { getFavorites } from '../services/api.js';


class CandidateList extends Component {

    async onRender(ul) {
        const candidates = this.props.candidates;

        const favList = this.props.favList;

        candidates.results.forEach(candidate => {
            const candidateItem = new CandidateItem({ candidate : candidate, favList : favList });
            ul.appendChild(candidateItem.renderDOM());
        });

        // candidates.results.forEach(candidate => {
        //     const candidateItem = new CandidateItem(candidate);
        //     
        // });
    }

    renderHTML() {
        return /*html*/ `
        <ul class="candidate-list">

        </ul>   
        `;
    }

}

export default CandidateList;