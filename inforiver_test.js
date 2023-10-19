Feature('inforiver-matrix');

async function getResultFromYearSeriesRegion(targetYear, targetSeries, targetRegion) {
    const { I } = inject();
    await I.seeElement('.matrix-table-header');
    const targetRegionXpath = `//div[@class='non-sticky-grid-cells']//span[text()="${targetRegion}"]/ancestor::div[5]`;
    const targetRegionXpathId = await I.grabAttributeFrom(targetRegionXpath, 'id')
    const targetSeriesYearXpath = `//*[contains(@id, '${targetYear}') and contains(@id,'${targetSeries}')]/div/div/div`
    const targetSeriesYearClass = await I.grabAttributeFrom(targetSeriesYearXpath, 'class')
    await I.say(targetRegionXpathId)
    await I.say(targetSeriesYearClass)
    const [rowNumber, colNumber] = targetRegionXpathId.match(/\d+/g);
    const colNumberFromClass = targetSeriesYearClass.match(/\d+/g);
    const result = `table-row-${rowNumber}_table-col-${colNumberFromClass}`;
    await I.say(result)
    const resultCell = await I.grabTextFrom(`//div[@id='${result}']/div/span`)
    return resultCell
}

Scenario ('locate cell',  async ({ I }) => {
    await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
    await I.wait(5)
    const targetYear =  '2018';
    const targetSeries =  'PY';
    const targetRegion = "Brazil";
    const resultCell = await getResultFromYearSeriesRegion(targetYear, targetSeries, targetRegion)
    await I.say(resultCell)
});
