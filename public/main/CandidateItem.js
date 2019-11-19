import Component from '../Component.js';

class CandidateItem extends Component {
    renderHTML() {
        
        const candidate = this.props;
        const name = candidate.candidate_name;
        const capitalize = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        const sanitizeName = (name) => {
            let splitName = name.split(', ');
            const firstName = capitalize(splitName[1].toLowerCase());
            const lastName = capitalize(splitName[0].toLowerCase());
            return `${firstName + ' ' + lastName}`;
        };
        //const id = candidate.candidate_id;
        return /*html*/`
        <div>
            <li>
                <h2>${sanitizeName(name)}</h2>
            </li>
        </div>
        `;
    }
}

export default CandidateItem;