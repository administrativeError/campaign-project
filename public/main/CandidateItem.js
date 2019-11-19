import Component from '../Component.js';

class CandidateItem extends Component {
    renderHTML() {
        
        const candidate = this.props;
        console.log(candidate);
        const name = candidate.candidate_name;
       
        //const id = candidate.candidate_id;

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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