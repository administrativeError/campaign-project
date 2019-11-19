import staticdata from '/staticdata.js';


staticdata.forEach(function(element) {
    if(candidate_id.value === 'P00009621') {
    candidate.name = 'Elizabeth Warren'
    } 
});
console.log(staticdata);

const data = [
    {from: "> $2000",  to: "Wernie Wanders",  weight:  2230000},
    {from: "> $1000",  to: "Wernie Wanders", weight:  1990000},
    {from: "> $500",  to: "Wernie Wanders",   weight:  1180000},
    {from: "> $200",  to: "Wernie Wanders",   weight:   990000},
    {from: "< $200",     to: "Wernie Wanders",  weight:   950000},

    {from: "> $2000",  to: "Bamala Berris",  weight:  1230000},
    {from: "> $1000",  to: "Bamala Berris", weight:  2290000},
    {from: "> $500",  to: "Bamala Berris",   weight:  1380000},
    {from: "> $200",  to: "Bamala Berris",   weight:   940000},
    {from: "< $200",     to: "Bamala Berris",  weight:   1950000},
    
   
  ];
 

  
  // create a chart and set the data
  const chart = anychart.sankey(data);
  
  // set the width of nodes
  chart.nodeWidth("30%");
  
  // set the container id
  chart.container("container");
  
  // initiate drawing the chart
  chart.draw();