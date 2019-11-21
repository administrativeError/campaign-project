import Component from '../Component.js';
import Header from '../common/Header.js';
import { loadGraph } from './graph.js';
import { getFavorites, getCandidates, addAFavorite, deleteAFavorite } from '../services/api.js';
import Loading from '../common/Loading.js';


export class GraphApp extends Component {

    async onRender(dom) {
        const loading = new Loading({ loading: true });
        const loadingDOM = loading.renderDOM();
        dom.appendChild(loadingDOM);
        try {

            const year = parseInt(localStorage.getItem('YEAR'));
            loadGraph(year);
            const header = new Header();
            const headerDOM = header.renderDOM();
            dom.prepend(headerDOM);
            const favoritesIds = await getFavorites();
            const favoritesIdsObject = favoritesIds.reduce((acc, curr) => {
                acc[curr.candidate_id] = curr.candidate_id; 
                return acc;
            }, {});
            const candidates = await getCandidates(year);
            const candidateNamesAndIds = candidates.results.map(candidate =>{
                return { name : candidate.candidate_name, id: candidate.candidate_id };
            });
            const candidatesNotFavorites = candidateNamesAndIds.filter(candidate => {
                return candidate.id !== favoritesIdsObject[candidate.id];
            });
            
            const addCandidateSelect = document.getElementById('add');
            if (!addCandidateSelect.value) {
                this.update();
            }
            candidatesNotFavorites.forEach(candidate => {
                const option = document.createElement('option');
                option.textContent = candidate.name;
                option.value = candidate.id;
                addCandidateSelect.appendChild(option);
            });
            const candidatesAreFavorites = candidateNamesAndIds.filter(candidate => {
                return candidate.id === favoritesIdsObject[candidate.id];
            });
            const removeCandidateSelect = document.getElementById('remove');
            candidatesAreFavorites.forEach(candidate => {
                const option = document.createElement('option');
                option.textContent = candidate.name;
                option.value = candidate.id;
                removeCandidateSelect.appendChild(option);
            });
            
    
            addCandidateSelect.addEventListener('change', async(event) => {
                const id = event.target.value;
                const thisFavorite = {
                    candidate_id: id
                };
                await addAFavorite(thisFavorite);
                this.update();
            });
            removeCandidateSelect.addEventListener('change', async(event) => {
                const id = event.target.value;
                const thisFavorite = {
                    candidate_id: id
                };
                await deleteAFavorite(thisFavorite);
                this.update();
            });
        }
        catch (err){
            console.log(err);
        }
        finally {

            loading.update({ loading: false });
        }

    }

    renderHTML(){
        const dom = /*html*/ `
    <div>
        <form class="filter-candidates">
                <select class="select-candidate" id = 'add'>
                <option>Add a Candidate</option>                 
                </select>
               
                <select class="select-candidate" id = 'remove'>
                <option>Remove a Candidate</option> 
                </select>
        </form>
        <section class = "graph">
            <div id="container">
                <div id="chart"></div>
            </div>
        </section>   
    </div>
        `;
        return dom;
    }

}
