import Component from '../Component.js';
import { addAFavorite, getFavorites, deleteAFavorite } from '../services/api.js';

class CandidateItem extends Component {
    
    onRender(li) {
        
        
        const header2 = li.querySelector('h2');
        header2.addEventListener('click', async(event) => {
         
            let currentFavorites = await getFavorites();

            const favoriteToDelete = currentFavorites.filter(favorite => {
                return favorite.candidate_id === event.target.id;
            });
            const candidate = {
                candidate_id: event.target.id
            };
            if (!favoriteToDelete[0]) {
                addAFavorite(candidate);
            } else {
                deleteAFavorite(favoriteToDelete[0]);
            }
            
            //favList.push(event.target.id);
        });
    }
    
    
    renderHTML() {
        
        const candidate = this.props.candidate;

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } 

        return /*html*/`
        <li>
            <h2 id='${candidate.candidate_id}'>${candidate.candidate_name.split(',')[0]}</h2>
            <h3>$${numberWithCommas(Math.ceil(candidate.cash_on_hand_end_period))}</h3>
        </li>
        `;
    }
}

export default CandidateItem;