import { getCandidateCashData, getCandidates } from '../services/api.js';
export const loadGraph = async () => {


const realData = await getCandidateCashData();
const realCandidates = await getCandidates();
console.log(realCandidates);

const mungedDataArray = realData.results.map(result => {
  result.from = '> $' + result.size;
  result.id = result.candidate_id;
  result.weight = result.total;
return result
})

console.log(mungedDataArray);

realCandidates.results.forEach(candidate => {
      const matches = mungedDataArray.filter(match => candidate.candidate_id === match.id);
      matches.forEach(obj => obj.to = candidate.candidate_name)
});

  // create a chart and set the data
const chart = anychart.sankey(mungedDataArray);
  
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
loadGraph();