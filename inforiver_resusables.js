const assert = require('assert');
const { I } = inject();

const selectors = {
    fontColor: `(//i[@class="icon icon--ChevronDown icons8-ChevronDown bf-ui-colorpicker-icon-dropdown"])[2]`,
    fontWeight: `//div[@class='toolbar_select ']`,
    setVersion: `//span[@class="toolbar-button setMeasure mr_0 "]`,
    removeMeasure1: `(//div[@class="measure-mapping-content-input-filled-close"])[1]`,
    removeMeasure2: `(//div[@class="measure-mapping-content-input-filled-close"])`,
    assertNoAC: `//div[@class="measure-mapping-content-input-filled-value" and text() = "AC"]`,
    assertNoPY: `//div[@class="measure-mapping-content-input-filled-value" and text() = "PY"]`,
    columnBreakdown: `//div[text()="Column Breakdown"]//following-sibling::label`,
    enableAC: `//div[text()="2017 AC"]/../div`,
    enablePY: `//div[text()="2017 PY"]/../div`,
    enableAC2: `//div[text()="2018 AC"]/../div`,
    enablePY2: `//div[text()="2018 PY"]/../div`,
    assertACAdded: `//span[text()="Actuals"]/../following-sibling::div/div/div`,
    assertPYAdded: `//span[text()="Previous Year"]/../following-sibling::div/div/div`,
    assertPLAdded: `//span[text()="Plan"]/../following-sibling::div/div/div`,
    assertFCAdded: `//span[text()="Forecast"]/../following-sibling::div/div/div`,

}

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

async function clickRow(targetRegion) {
    await I.seeElement(`(//span[text()="${targetRegion}" and @role='cell'])[1]`)
    await I.click(`(//span[text()="${targetRegion}" and @role='cell'])[1]`)
}

async function selectFontStyle(fontStyle) {
    await I.click(`//div[@class='toolbar-select ']`);
    await I.click(`//div[@id='fontSizeIncrement-b']/span/span/span/span[text()="${fontStyle}"]/ancestor::span[3]`);
}

async function selectFontColor(fontColor) {
    await I.click(selectors.fontColor);
    await I.click(`(//*[local-name()='svg' and @class='bf-rx-colorpicker-svg'])[1]/*[local-name()='g']/*[local-name()='rect']/*[local-name()='title' and text() = "${fontColor}"]/..`);
}

async function selectFontWeight(fontWeight) {
    await I.click(selectors.fontWeight)
    await I.click(`//div[@id='fontSizeIncrement-d']/span/span/span/span[text()="${fontWeight}"]`)
}

async function checkFontStyleApplied(targetRegion, fontStyle) {
    let appliedStyle = await I.grabCssPropertyFrom(`(//span[text()="${targetRegion}" and @role='cell'])[1]`, 'font-family');
    let cleanedFont = appliedStyle.replace(/["']/g, '');
    await I.say(appliedStyle)
    await I.say(fontStyle)
    await assert.equal(fontStyle, cleanedFont, "Font Style doesn't match")
}

async function setVersionMapping () {
    await I.click('//span[text()="Insert"]') //Click on insert tab
    await I.click(selectors.setVersion) //click on Set Version
    await I.click(selectors.removeMeasure1) //remove AC from the Measures
    await I.click(selectors.removeMeasure2) //remove PY from the Measures
    await I.dontSee(selectors.assertNoAC) //ensure AC is removed
    await I.dontSee(selectors.assertNoPY) //ensure PC is removed
}

async function enableColumnBreakdownNCheck () {
    await I.click(selectors.columnBreakdown) //enable column breakdown
    await I.click(`Proceed`) //Proceed with the warning message
    await I.click(selectors.enableAC) //enable the 2017 AC column series
    await I.click(selectors.enablePY) //enable the 2017 PY column series
    await I.click(selctors.enableAC2) //enable the 2018 AC column series
    await I.click(selectors.enablePY2) //enable the 2018 PY column series
    await I.seeElement(selectors.assertACAdded) //ensure if AC is added
    await I.seeElement(selectors.assertPYAdded) //ensure if PY is added
    await I.seeElement(selectors.assertPLAdded) //ensure if PL is added
    await I.seeElement(selectors.assertFCAdded) //ensure if FC is added
}

module.exports = {
    getResultFromYearSeriesRegion,
    clickRow,
    selectFontStyle,
    selectFontColor,
    selectFontWeight,
    checkFontStyleApplied,
    setVersionMapping,
    enableColumnBreakdownNCheck
}