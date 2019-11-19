const url = 'https://api.open.fec.gov/v1/elections/?sort_null_only=true&page=1&election_full=true&sort_nulls_last=true&sort=-total_receipts&cycle=2020&sort_hide_null=true&office=president&api_key=zOLscs4pSBuWuW1Um5FSdzojowh8cDemamFwaWYe&per_page=20';

export async function getTopSixCandidates() {
    const response = await fetch(url);
    const data = await response.json();
    let topSixArray = [];
    for (let i = 0; i < 6; i++){
        topSixArray.push(data['results'][i]);
    }
    return topSixArray;
}