Feature('inforiver-matrix');
const assert = require('assert');
const { I } = inject();
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

Scenario.skip ('locate cell',  async ({ I }) => {
    await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
    await I.wait(5)
    const targetYear =  '2018';
    const targetSeries =  'PY';
    const targetRegion = "Brazil";
    const resultCell = await getResultFromYearSeriesRegion(targetYear, targetSeries, targetRegion)
    await I.say(resultCell)
});

async function clickRow(targetRegion) {
    await I.seeElement(`(//span[text()="${targetRegion}" and @role='cell'])[1]`)
    await I.click(`(//span[text()="${targetRegion}" and @role='cell'])[1]`)
}

async function selectFontStyle(fontStyle) {
    await I.click(`//div[@class='toolbar-select ']`);
    await I.click(`//div[@id='fontSizeIncrement-b']/span/span/span/span[text()="${fontStyle}"]/ancestor::span[3]`);
}

async function selectFontColor(fontColor) {
    await I.click(`(//i[@class="icon icon--ChevronDown icons8-ChevronDown bf-ui-colorpicker-icon-dropdown"])[2]`);
    await I.click(`(//*[local-name()='svg' and @class='bf-rx-colorpicker-svg'])[1]/*[local-name()='g']/*[local-name()='rect']/*[local-name()='title' and text() = "${fontColor}"]/..`);
}

async function selectFontWeight(fontWeight) {
    await I.click(`//div[@class='toolbar_select ']`)
    await I.click(`//div[@id='fontSizeIncrement-d']/span/span/span/span[text()="${fontWeight}"]`)
}

async function checkFontStyleApplied(targetRegion, fontStyle) {
    let appliedStyle = await I.grabCssPropertyFrom(`(//span[text()="${targetRegion}" and @role='cell'])[1]`, 'font-family');
    let cleanedFont = appliedStyle.replace(/["']/g, '');
    await I.say(appliedStyle)
    await I.say(fontStyle)
    await assert.equal(fontStyle, cleanedFont, "Font Style doesn't match")
}

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