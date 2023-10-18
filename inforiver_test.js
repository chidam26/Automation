Feature('inforiver-matrix');

Scenario('locate cell',  ({ I }) => {
    I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
    I.wait(5)
    const targetYear = '2017';
    const targetSeries = 'PY';
    const targetRegion = "Americas"
    I.seeElement('.matrix-table-header')

    // I.seeElement('.matrix-table-header')
});
// table-row-0 table-col-5 cell-container
