import Component from '../Component.js';
import Header from '../common/Header.js';
import { loadGraph } from './graph.js';
import { getFavorites, getCandidates, addAFavorite, deleteAFavorite } from '../services/api.js';
import Loading from '../common/Loading.js';

const addOrRemoveListener = async (event, callback) => {
    const id = event.target.value;
    const thisFavorite = {
        candidate_id: id
    };
    await callback(thisFavorite);
    this.update();
};


const makeOption = candidate => {
    const option = document.createElement('option');
    option.textContent = candidate.name;
    option.value = candidate.id;

    return option;
};


const addOptions = (candidates, selectToAppendTo) => {
    candidates.forEach((candidate) => {
        const option = makeOption(candidate);

        selectToAppendTo.appendChild(option);
    });
};


export class GraphApp extends Component {

    async onRender(dom) {
        const loading = new Loading({ loading: true });
        const loadingDOM = loading.renderDOM();
        dom.appendChild(loadingDOM);
        try {
            const year = parseInt(localStorage.getItem('YEAR'));
            const header = new Header();
            const headerDOM = header.renderDOM();
            dom.prepend(headerDOM);
            const favoritesIds = await getFavorites();
            const favoritesIdsObject = favoritesIds.reduce((acc, curr) => {
                acc[curr.candidate_id] = curr.candidate_id;
                return acc;
            }, {});
            const candidates = await getCandidates(year);
            const candidateNamesAndIds = candidates.results
                .map(candidate => ({
                    name: candidate.candidate_name,
                    id: candidate.candidate_id,
                })
                );
            const candidatesNotFavorites = candidateNamesAndIds.filter(candidate => {
                return candidate.id !== favoritesIdsObject[candidate.id];
            });

            const addCandidateSelect = document.getElementById('add');
            if (!addCandidateSelect.value) {
                this.update();
            }

            const candidatesAreFavorites = candidateNamesAndIds.filter(candidate => candidate.id === favoritesIdsObject[candidate.id]
            );

            const removeCandidateSelect = document.getElementById('remove');

            addOptions(candidatesNotFavorites, addCandidateSelect);
            addOptions(candidatesAreFavorites, removeCandidateSelect);
            loadGraph(year);
            addCandidateSelect.addEventListener('change', async (event) => await addOrRemoveListener(event, addAFavorite));
            removeCandidateSelect.addEventListener('change', async (event) => await addOrRemoveListener(event, deleteAFavorite));
        }
        catch (err) {
            console.log(err);
        }
        finally {

            loading.update({ loading: false });
        }

    }

    renderHTML() {
        const dom = /*html*/ `
    <div>
        <p></p>
        <form class="filter-candidates">
            <select class="select-candidate" id = 'add'>
                <option>Add a Candidate</option>                 
            </select>
            <select class="select-candidate" id ="remove">
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
