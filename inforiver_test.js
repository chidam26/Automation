Feature('inforiver-matrix');

import { getResultFromYearSeriesRegion, clickRow, selectFontStyle, selectFontColor, selectFontWeight, checkFontStyleApplied, setVersionMapping, enableColumnBreakdownNCheck } from './inforiver_resusables'

Scenario ('locate cell',  async ({ I }) => {
    await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
    await I.wait(5)
    const targetYear =  '2018';
    const targetSeries =  'PY';
    const targetRegion = "Brazil";
    const resultCell = await getResultFromYearSeriesRegion(targetYear, targetSeries, targetRegion)
    await I.say(resultCell)
});



Scenario ('apply formattings', async ({ I }) => {
    await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
    await I.wait(5)
    const targetRegion = 'USA';
    await clickRow(targetRegion)
    let fontStyle = "Times New Roman"
    await selectFontStyle(fontStyle);
    let fontColor = "White";
    await selectFontColor(fontColor);
    let fontWeight = "16";
    await selectFontWeight(fontWeight);
    await checkFontStyleApplied(targetRegion, fontStyle);
})

Scenario ('notes column', async ({ I }) => {
    await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
    await I.wait(5);
    await I.click(`//div[@class='toolbar_columnMenu']`);
    await I.click('Notes Column');
    const targetRegion = "USA"
    const targetRegionXpath = `//div[@class='non-sticky-grid-cells']//span[text()="${targetRegion}"]/ancestor::div[5]`;
    const targetRegionXpathId = await I.grabAttributeFrom(targetRegionXpath, 'id')
    const notesDiv = `(//div[@class='title-label'])[7]/ancestor::div[1]`
    const notesDivClass = await I.grabAttributeFrom(notesDiv, 'class')
    const [rowNumber, colNumber] = targetRegionXpathId.match(/\d+/g);
    const colNumberFromClass = notesDivClass.match(/\d+/g);
    const result = `table-row-${rowNumber}_table-col-${colNumberFromClass}`;
    await I.doubleClick(`//div[@id='${result}']`);
    await I.click(`.DraftEditor-editorContainer`);
    await I.pressKey(`U`);
    await I.click('Save');
    await I.see('U', `//div[@id='table-row-2_table-col-17']/div/div/div/p`);
    pause()
})

Scenario ('set version', async ({ I }) => {
    await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true')
    await I.wait(5);
    await setVersionMapping()
    await enableColumnBreakdownNCheck()
    await I.dragAndDrop(`//div[text()="2017 PY" and @class = "measure-mapping-content-input-filled-value"]/..`, `//span[text()="Actuals"]/../following-sibling::div`)
})