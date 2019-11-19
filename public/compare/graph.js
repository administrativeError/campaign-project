import staticdata from './staticdata.js';

const mungedDataArray = [];
staticdata.results.forEach(result => {
  result.from = result.size;
  result.to = result.candidate_id;
  result.weight = result.total;
  mungedDataArray.push(result);
})
console.log(mungedDataArray);
  
  // create a chart and set the data
  const chart = anychart.sankey(mungedDataArray);
  
  // set the width of nodes
  chart.nodeWidth("30%");
  
  // set the container id
  chart.container("chart");
  // chart.setSize('100%', '100%');
  
  // initiate drawing the chart
  chart.draw();