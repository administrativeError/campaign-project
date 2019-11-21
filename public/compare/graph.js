import { getCandidateCashData, getCandidates } from '../services/api.js';
import { getFavorites } from '../services/api.js';
export const loadGraph = async(year) => {
    const removeSelect = document.getElementById('remove');
    console.log(removeSelect.children[1]);
    const favorites = await getFavorites();
    
    console.log(favorites);

    const realData = await getCandidateCashData(year);
    const realCandidates = await getCandidates(year);
    const mungedDataArray = realData.results.map(result => {
        result.from = '> $' + result.size;
        result.id = result.candidate_id;
        result.weight = result.total;
        return result;
    });
    
    realCandidates.results.forEach(candidate => {
        const matches = mungedDataArray.filter(match => candidate.candidate_id === match.id);
        matches.forEach(obj => obj.to = candidate.candidate_name);
    });
    let favoriteData = [];
    favorites.forEach(fav => {
        favoriteData.push(mungedDataArray.filter(data => fav.candidate_id === data.candidate_id));
    });
    let displayData = (favorites.length > 0) ? favoriteData.flat() : mungedDataArray;
    
    // create a chart and set the data
    const chart = anychart.sankey(displayData);
  // set the width of nodes
    chart.nodeWidth('30%');
  
  // set the container id
    chart.container('chart');
  // chart.setSize('100%', '100%');
  
    const title = chart.title();
    title.text('Candidate Donations by Dollar Amount');
    title.enabled(true);

  // initiate drawing the chart
    chart.draw();
};