import { getCandidateCashData, getCandidates } from '../services/api.js';
import { getFavorites } from '../services/api.js';

const getFromText = size => ({
    0: `$${size} to $199`,
    200: `$${size} to $499`,
    500: `$${size} to $999`,
    1000: `$${size} to $1999`,
    2000: `$${size} and above`
})[size] || `> $${size}`;

const mungeDataArray = (results) => results.map(result => {
    result.from = getFromText(result.size);
    result.id = result.candidate_id;
    result.weight = result.total;
    return result;
});

export const loadGraph = async (year) => {
    const removeSelect = document.querySelector('#remove');
    const [
        favorites,
        realData,
        realCandidates
    ] = await Promise.all([
        getFavorites(),
        getCandidateCashData(year),
        getCandidates(year)
    ]);

    const mungedDataArray = mungeDataArray(realData);

    // not quite sure realCandidates is used anywhere?
    realCandidates.results.forEach(candidate => {
        const matches = mungedDataArray.filter(match => candidate.candidate_id === match.id);
        matches.forEach(obj => obj.to = candidate.candidate_name);
    });

    const getMatchingCandidates = fav => mungedDataArray.filter(data => fav.candidate_id === data.candidate_id);

    // seems like this is a single array inside an array?
    const favoriteData = favorites.map(fav => getMatchingCandidates(fav));
    let displayData = (removeSelect.children[1])
        ? favoriteData.flat()
        : mungedDataArray;
    const chart = anychart.sankey(displayData);
    chart.nodeWidth('30%');
    chart.container('chart');
    const title = chart.title();
    chart.node().labels().useHtml(true);
    chart.node().labels().format(() => {
        return "<span style='font-weight:bold'>" + this.name +
            '</span><br>' + this.value.toLocaleString(
                'en-US',
                {
                    style: 'currency',
                    currency: 'USD',
                }).slice(0, -3);
    });
    chart.flow().labels().format(() => {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3);
    });
    chart.node().tooltip().titleFormat(() => {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3);
    });
    chart.flow().tooltip().format(() => {
        return this.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3);
    });
    chart.node().tooltip().format(() => {

        var incomeText = '';
        var outcomeText = '';
        const valToAdd = this.outcome.value.toLocaleString(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
            }).slice(0, -3) + '\n';

        this.income.forEach(item => {
            incomeText += item.value.toLocaleString(
                'en-US',
                {
                    style: 'currency',
                    currency: 'USD',
                }).slice(0, -3) + '\n';

            outcomeText += valToAdd;

            if (this.outcome.length > 0) {
                incomeText = incomeText + '\n';
            }

            return incomeText + outcomeText;
        });


        title.text(`Candidate Donations by Dollar Amount In The ${year} Election Cycle`);
        title.enabled(true);
        chart.draw();
    };