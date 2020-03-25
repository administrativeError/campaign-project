import { getCandidateCashData, getCandidates } from '../services/api.js';
import { getFavorites } from '../services/api.js';
export const loadGraph = async(year) => {
    const removeSelect = document.querySelector('#remove');
    const favorites = await getFavorites();
    const realData = await getCandidateCashData(year);
    const realCandidates = await getCandidates(year);
    const mungedDataArray = realData.results.map(result => {
        result.from = (result.size === 0) ? '$' + result.size + ' to $199' : '> $' + result.size;
        result.from = (result.size === 200) ? '$' + result.size + ' to $499' : result.from;
        result.from = (result.size === 500) ? '$' + result.size + ' to $999' : result.from;
        result.from = (result.size === 1000) ? '$' + result.size + ' to $1999' : result.from;
        result.from = (result.size === 2000) ? '$' + result.size + ' and above' : result.from;
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
    const chart = anychart.sankey(displayData); // eslint-disable-line
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
            }).slice(0, -3);
    });
    chart.flow().labels().format(function() {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3);
    });
    chart.node().tooltip().titleFormat(function() {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3);
    });
    chart.flow().tooltip().format(function() {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3);
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
                }).slice(0, -3) + '\n';
        }
    
        for (let i = 0; i < this.outcome.length; i++) {
            outcomeText += this.outcome.value.toLocaleString(
                'en-US',
                {
                    style: 'currency',
                    currency: 'USD',
                }).slice(0, -3) + '\n';
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