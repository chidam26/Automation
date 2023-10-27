const assert = require('assert');
const { I } = inject();
module.exports = {
    selectors : {
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
        notesColumn: `//div[@class='toolbar_columnMenu']`,
        notesDiv: `(//div[@class='title-label'])[7]/ancestor::div[1]`,
        notesEditorContainer: `.DraftEditor-editorContainer`,
        insertTab: '//span[text()="Insert"]',
        dataInput: `//div[@class='popover-container ']/span[@id="dataInput-b"]`,
        noteHover: `//div[@class = 'indicator-div circle indicator-icon']`,
        editNote: `//div[@class = 'comment-actions']/div[@class="ms-Icon ms-Icon--Edit"]`,
        cellClick: `//div[@id='table-row-0_table-col-20']`,
        editCell: `//span[@id="insertCell-d"]/..`,
        lockCell: `//span[@class="toolbar-icon-title with-icon" and text() = "Lock this cell"]/../../..`,

    },
    
    async  getResultFromYearSeriesRegion(targetYear, targetSeries, targetRegion) {
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
    },
    
    async  clickRow(targetRegion) {
        await I.seeElement(`(//span[text()="${targetRegion}" and @role='cell'])[1]`)
        await I.click(`(//span[text()="${targetRegion}" and @role='cell'])[1]`)
    },
    
    async  selectFontStyle(fontStyle) {
        await I.click(`//div[@class='toolbar-select ']`);
        await I.click(`//div[@id='fontSizeIncrement-b']/span/span/span/span[text()="${fontStyle}"]/ancestor::span[3]`);
    },
    
    async  selectFontColor(fontColor) {
        await I.click(this.selectors.fontColor);
        await I.click(`(//*[local-name()='svg' and @class='bf-rx-colorpicker-svg'])[1]/*[local-name()='g']/*[local-name()='rect']/*[local-name()='title' and text() = "${fontColor}"]/..`);
    },
    
    async  selectFontWeight(fontWeight) {
        await I.click(this.selectors.fontWeight)
        await I.click(`//div[@id='fontSizeIncrement-d']/span/span/span/span[text()="${fontWeight}"]`)
    },
    
    async checkFontStyleApplied(targetRegion, fontStyle) {
        let appliedStyle = await I.grabCssPropertyFrom(`(//span[text()="${targetRegion}" and @role='cell'])[1]`, 'font-family');
        let cleanedFont = appliedStyle.replace(/["']/g, '');
        await I.say(appliedStyle)
        await I.say(fontStyle)
        await assert.equal(fontStyle, cleanedFont, "Font Style doesn't match")
    },

    async  setVersionMapping () {
        await I.click('//span[text()="Insert"]') //Click on insert tab
        await I.click(this.selectors.setVersion) //click on Set Version
        await I.click(this.selectors.removeMeasure1) //remove AC from the Measures
        await I.click(this.selectors.removeMeasure2) //remove PY from the Measures
        await I.dontSee(this.selectors.assertNoAC) //ensure AC is removed
        await I.dontSee(this.selectors.assertNoPY) //ensure PC is removed
    },
    
    async  enableColumnBreakdownNCheck () {
        await I.click(this.selectors.columnBreakdown) //enable column breakdown
        await I.click(`Proceed`) //Proceed with the warning message
        await I.click(this.selectors.enableAC) //enable the 2017 AC column series
        await I.click(this.selectors.enablePY) //enable the 2017 PY column series
        await I.click(this.selectors.enableAC2) //enable the 2018 AC column series
        await I.click(this.selectors.enablePY2) //enable the 2018 PY column series
        await I.seeElement(this.selectors.assertACAdded) //ensure if AC is added
        await I.seeElement(this.selectors.assertPYAdded) //ensure if PY is added
        await I.seeElement(this.selectors.assertPLAdded) //ensure if PL is added
        await I.seeElement(this.selectors.assertFCAdded) //ensure if FC is added
    },

    async landingPage () {
        await I.amOnPage('https://inforiverwebtest-dev.azurewebsites.net/?csvLocation=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.csv&config=https://sabareesh-r23.github.io/MatrixCsvAndConfig/Sanity.json&URLLoad=true');
        await I.wait(5);
    },

    async enableNotesColumn () {
        await I.click(this.selectors.notesColumn);
        await I.click('Notes Column');
    },

    async enterNotes (targetRegion, keyPress) {
        const targetRegionXpath = `//div[@class='non-sticky-grid-cells']//span[text()="${targetRegion}"]/ancestor::div[5]`;
        const targetRegionXpathId = await I.grabAttributeFrom(targetRegionXpath, 'id')
        const notesDivClass = await I.grabAttributeFrom(this.selectors.notesDiv, 'class')
        const [rowNumber, colNumber] = targetRegionXpathId.match(/\d+/g);
        const colNumberFromClass = notesDivClass.match(/\d+/g);
        const result = `table-row-${rowNumber}_table-col-${colNumberFromClass}`;
        await I.doubleClick(`//div[@id='${result}']`);
        await I.click(this.selectors.notesEditorContainer);
        await I.pressKey(keyPress);
        await I.click('Save');
        return result;
    },

    async dataInput (inputType) {
        await I.click(this.selectors.insertTab)
        await I.click(this.selectors.dataInput)
        await I.moveCursorTo(`//span[text()='${inputType}' and @class = 'toolbar-icon-title']/../../..`)
        await I.wait(2)
        await I.click(`//span[text()='Insert a new empty series']`)
        await I.click(`Create`)
    },

    async editCell () {
        await I.click(this.selectors.cellClick) //click on a cell
        await I.click(this.selectors.editCell) //click on edit cell
        await I.type(`1000`)
        await I.pressKey(`Enter`)
    },

    async lockCell() {
        await I.click(this.selectors.cellClick)
        await I.click(`//div[@class="popover-container preserve--cell-selection "]`)
        await I.click(this.selectors.lockCell)
        const background = await I.grabCssPropertyFrom(`//div[@id='table-row-0_table-col-20']`, `background`)
        assert.equal(background, `rgb(221, 221, 221) none repeat scroll 0% 0% / auto padding-box border-box`)
    },

    async addNotes () {
        await I.click(`//span[text()="Home"]`);
        await I.click(this.selectors.notesColumn);
        await I.click(`//span[text()="Add New Note"]`);
        await I.type(`Notes added`);
        await I.click('Save');
        await I.moveCursorTo(this.selectors.noteHover)
        await I.seeElement(`//div[@class = 'notes-wrapped-container quill-container table comment-popover themeLight']`) //ensure notes appears while hovering
    },

    async editNote () {
        await I.moveCursorTo(this.selectors.noteHover)
        await I.click(this.selectors.editNote)
        await I.type(` Edited Note`)
        await I.click(`Save`)
        await I.moveCursorTo(this.selectors.noteHover)
        await I.seeElement(`//div[@class = 'notes-wrapped-container quill-container table comment-popover themeLight']/div/div/div/p[text()="Notes added Edited Note"]`)
    },

    async deleteNote () {
        await I.moveCursorTo(`//div[@class = 'indicator-div circle indicator-icon']`);
        await I.click(`//div[@class = 'comment-actions']/div[@class="ms-Icon ms-Icon--Delete"]`)
        await I.dontSee(`//div[@class = 'indicator-div circle indicator-icon']`)
    }
}
