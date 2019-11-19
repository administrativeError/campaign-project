import staticdata from './staticdata.js';
import { getCandidateCashData } from '../services/api.js';
const realdata = getCandidateCashData();
console.log(realdata);

console.log(getCandidates());
const mungedDataArray = [];
realdata.results.forEach(result => {
  result.from = '> $' + result.size;
  result.to = result.candidate_id;
  result.weight = result.total;
  mungedDataArray.push(result);
})
console.log(mungedDataArray);
  
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