import Component from '../Component.js';

class CandidateItem extends Component {

    onRender() {
        const candidate = this.props;
    }

    renderHTML() {
        const candidate = this.props;
        const { 'id' : candidate_id , 'name' : candidate_name } = candidate;
        return /*html*/`
        <div>
            <li>
                <h2>${name}</h2>
            </li>
        </div>
        `;
    }
}

export default CandidateItem;
