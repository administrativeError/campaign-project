import Component from '../Component.js';
import { addAFavorite } from '../services/api.js';

class CandidateItem extends Component {
    
    onRender(li) {
        //const favList = this.props.favList;
        const header2 = li.querySelector('h2');
        header2.addEventListener('click', (event) => {
            addAFavorite(event.target.id);
            //favList.push(event.target.id);
        });
    }

    renderHTML() {
    
        const candidate = this.props.candidate;
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
        <li>
            <h2 id="${candidate.candidate_id}" >${sanitizeName(name)}</h2>
        </li>
        `;
    }
}

export default CandidateItem;