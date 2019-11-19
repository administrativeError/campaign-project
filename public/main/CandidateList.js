import Component from '../Component.js';
import CandidateItem from './CandidateItem.js';

class CandidateList extends Component {

    onRender(ul) {
        const candidates = this.props.candidates;
        candidates.results.forEach(candidate => {
            const candidateItem = new CandidateItem(candidate);
            ul.appendChild(candidateItem.renderDOM());
        });

    }

    renderHTML() {
        return /*html*/ `
        <ul class="candidate-list">

        </ul>   
        `;
    }

}

export default CandidateList;