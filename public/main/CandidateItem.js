import Component from '../Component.js';

class CandidateItem extends Component {
    renderHTML() {
        
        const candidate = this.props;
        console.log(candidate);
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

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } 

        return /*html*/`
        <li>
            <h2>${sanitizeName(name)}</h2>
            <h3>$${numberWithCommas(Math.ceil(candidate.cash_on_hand_end_period))}</h3>
        </li>
        `;
    }
}

export default CandidateItem;