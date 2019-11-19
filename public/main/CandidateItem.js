import Component from '../Component.js';
import { addAFavorite } from '../services/api.js';

class CandidateItem extends Component {
    
    onRender(li) {
        //const favList = this.props.favList;
        const header2 = li.querySelector('h2');
        header2.addEventListener('click', (event) => {

            const candidate = {
                candidate_id: event.target.id
            };


            addAFavorite(candidate);
            //favList.push(event.target.id);
        });
    }

    renderHTML() {
        
        const candidate = this.props;

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } 

        return /*html*/`
        <li>
            <h2>${candidate.candidate_name.split(',')[0]}</h2>
            <h3>$${numberWithCommas(Math.ceil(candidate.cash_on_hand_end_period))}</h3>
        </li>
        `;
    }
}

export default CandidateItem;