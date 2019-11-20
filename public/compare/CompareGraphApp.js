import Componenet from '../Component.js';
import Header from '../common/Header.js';
import { loadGraph } from './graph.js';
import { getFavorites, getCandidates } from '../services/api.js';


class GraphApp extends Componenet {

    onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);
        const graphSection = dom.querySelector('.graph');
        const graph = loadGraph();
        graphSection.appendChild(graph);
        const favoritesIds = getFavorites();
        // let i = 0;
        const favoritesIdsObject = favoritesIds.reduce((acc, curr) => {
            acc[curr] = curr; 
            // i ++;
            return acc;
        }, {});
        const candidates = getCandidates();
        const candidateNamesAndIds = candidates.results.map(candidate =>{
            return { name : candidate.candidate_name, id: candidate.candidate_id };
        });
        const candidatesNotFavorites = candidateNamesAndIds.filter(candidate => {
            return candidate.id !== favoritesIdsObject[candidate.id];
        });
        const addCandidateSelect = document.getElementById('add');
        candidatesNotFavorites.forEach(candidate => {
            const option = document.createElement('option');
            option.textContent(candidate.name);
            addCandidateSelect.appendChild(option);
        });
    }

    renderHTML(){
        return /*html*/ `
        <div>
            <!-- <form>
                <label>Add a Candidate</label>
                <select id = 'add'>
                    
                <select>
                <label>Remove a Candidate</label>
                <select id = 'remove'>
                    
                <select>
            </form> -->
        <section class="graph">

        </section>   
        <div>
        `;
    }
}

export default GraphApp;