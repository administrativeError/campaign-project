import { getCandidateCashData, getCandidates } from '../services/api.js';
const loadGraph = async () => {


const realData = await getCandidateCashData();
const realCandidates = await getCandidates();
// console.log(realCandidates);

let mungedDataArray = [];

realData.results.forEach(result => {
  result.from = '> $' + result.size;
  result.id = result.candidate_id;
  result.weight = result.total;
  mungedDataArray.push(result);
});
let namedArray = mungedDataArray.map(obj => {
  const match = realCandidates.results.find((candidate) =>{
    return candidate.candidate_id === obj.id;
    })
  const newObj = Object.assign(match, obj);
  return newObj
});
let officialNamedArray = namedArray.map(item => {
  item.to = item.candidate_name
  return item;
})

console.log(officialNamedArray);
  // create a chart and set the data
const chart = anychart.sankey(officialNamedArray);
  
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