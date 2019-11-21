import Component from '../Component.js';
import { addAFavorite, getFavorites, deleteAFavorite } from '../services/api.js';

class CandidateItem extends Component {
    
    onRender(li) {
        
        const header2 = li.querySelector('h2');
        header2.addEventListener('click', async(event) => {
            
            let currentFavorites = await getFavorites();

            let thisFavorite = {
                candidate_id: event.target.id
            };

            const foundMatch = currentFavorites.reduce((acc, index) => {
                if (index.candidate_id === thisFavorite.candidate_id) {
                    acc = true;
                    return acc;
                } else {
                    return acc;
                }
            }, false);

           

            if (foundMatch) {
                deleteAFavorite(thisFavorite);
                
            } else {
                addAFavorite(thisFavorite);
            }
        });
    }
    
    
    renderHTML() {
        
        const candidate = this.props.candidate;

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } 

        return /*html*/`
        <li class='candidate-item'>
            <h2 class="candidate-name" id='${candidate.candidate_id}'>${candidate.candidate_name.split(',')[0]}</h2>
            <h3><span class="cash-on-hand">Cash on hand:</span><br>$${numberWithCommas(Math.ceil(candidate.cash_on_hand_end_period))}</h3>
        </li>
        `;
    }
}

export default CandidateItem;