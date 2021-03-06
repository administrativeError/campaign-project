import Component from '../Component.js';
import { addAFavorite, getFavorites, deleteAFavorite } from '../services/api.js';

class CandidateItem extends Component {
    
    onRender(li) {

        li.addEventListener('click', async(event) => {
            li.classList.toggle('favorite-candidate');
            
            let thisFavorite = { candidate_id: event.currentTarget.id };
            let currentFavorites = await getFavorites();

            const foundMatch = currentFavorites.reduce((acc, index) => {
                if (index.candidate_id === thisFavorite.candidate_id) {
                    acc = true;
                    return acc;
                } else {
                    
                    return acc;
                }
            }, false);
           
            if (foundMatch) {
                await deleteAFavorite(thisFavorite);
                this.props.onCandidateClick(-1);
                    
            } else {
                await addAFavorite(thisFavorite);
                this.props.onCandidateClick(1);
            }
        });
    }
    
    
    renderHTML() {
        
        const candidate = this.props.candidate;

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } 

        return /*html*/`
            <li class="candidate-item" id='${candidate.candidate_id}'>
                <h2 class="candidate-name">${candidate.candidate_name.split(',')[0]}</h2>
                <h3><span class="cash-on-hand">Cash on hand:</span><br>$${numberWithCommas(Math.ceil(candidate.cash_on_hand_end_period))}</h3>
            </li>
        `;
    }
}

export default CandidateItem;