import { getCandidateCashData, getCandidates } from '../services/api.js';
import { getFavorites } from '../services/api.js';
export const loadGraph = async(year) => {
    const removeSelect = document.querySelector('#remove');
    const favorites = await getFavorites();
    const realData = await getCandidateCashData(year);
    const realCandidates = await getCandidates(year);
    const mungedDataArray = realData.results.map(result => {
        result.from = (result.size === 0) ? '$' + result.size + ' to $200': '> $' + result.size;
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
    let displayData = (removeSelect.children[1]) ? favoriteData.flat() : mungedDataArray;
    const chart = anychart.sankey(displayData);
    chart.nodeWidth('30%');
    chart.container('chart');
    const title = chart.title();
    chart.node().labels().useHtml(true);
    chart.node().labels().format(function() {
        return "<span style='font-weight:bold'>" + this.name +
      '</span><br>' + this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            });
    });
    chart.flow().labels().format(function() {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            });
    });
    chart.node().tooltip().titleFormat(function() {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            });
    });
    chart.flow().tooltip().format(function() {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            });
    });
    chart.node().tooltip().format(function() {

        var incomeText = '';
        var outcomeText = '';
    
        for (let i = 0; i < this.income.length; i++) {
            incomeText += this.income[i].value.toLocaleString(
                'en-US',
                {
                    style: 'currency',
                    currency: 'USD',
                }) + '\n';
        }
    
        for (let i = 0; i < this.outcome.length; i++) {
            outcomeText += this.outcome.value.toLocaleString(
                'en-US',
                {
                    style: 'currency',
                    currency: 'USD',
                }) + '\n';
        }
    
        if (this.outcome.length > 0) {
            incomeText = incomeText + '\n';
        }
    
        return incomeText + outcomeText;
    });
    
  
    title.text(`Candidate Donations by Dollar Amount In The ${year} Election Cycle`);
    title.enabled(true);
    chart.draw();
};