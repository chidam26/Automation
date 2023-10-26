const inforiver_resusables = require('./inforiver_resusables.js')
Feature('inforiver-matrix');


Scenario ('locate cell',  async ({ I }) => {
    await inforiver_resusables.landingPage();
    const targetYear =  '2018';
    const targetSeries =  'PY';
    const targetRegion = "Brazil";
    const resultCell = await getResultFromYearSeriesRegion(targetYear, targetSeries, targetRegion)
    await I.say(resultCell)
});

Scenario ('apply formattings', async ({ I }) => {
    await inforiver_resusables.landingPage()
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
    await inforiver_resusables.landingPage()
    const targetRegion = "USA";
    const keyPress = "U"
    await inforiver_resusables.enableNotesColumn()
    const result = await inforiver_resusables.enterNotes(targetRegion, keyPress)
    await I.see(keyPress, `//div[@id='${result}']/div/div/div/p`);
})

Scenario ('set version', async ({ I }) => {
    await inforiver_resusables.landingPage()
    await inforiver_resusables.setVersionMapping()
    await inforiver_resusables.enableColumnBreakdownNCheck()
    await I.dragAndDrop(`//div[text()="2017 PY" and @class = "measure-mapping-content-input-filled-value"]/..`, `//span[text()="Actuals"]/../following-sibling::div`)
})

Scenario.only ('data input', async ({ I }) => {
    const inputType = "Number"
    await inforiver_resusables.landingPage()
    await inforiver_resusables.dataInput(inputType)
    await inforiver_resusables.editCell()
    await inforiver_resusables.lockCell()
    await inforiver_resusables.addNotes()
    await inforiver_resusables.editNote()
})