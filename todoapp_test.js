Feature('todoapp');

// 1. Add to-do is working. (Verify if the item is added to the list )
Scenario('add todo',  ({ I }) => {
    I.amOnPage('https://todomvc.com/examples/angularjs/#/')
    I.fillField('What needs to be done?', 'Update my blog');
    I.pressKey('Enter');
    I.see('Update my blog', '.todo-list');
    I.see('item left', '.todo-count');
    I.see('All', '.filters');
});

// // 2. Marking an item as complete works. (Verify if the item is crossed out and verify the
// // counter on the bottom-left)
Scenario('check a todo', async  ({ I }) => {
    await I.amOnPage('https://todomvc.com/examples/angularjs/#/');
    await I.fillField('What needs to be done?', 'Go to shop');
    await I.pressKey('Enter');
    await I.see('Go to shop', '.todo-list');
    await I.see('1 item left', '.todo-count');
    await I.click('.todo-list input.toggle');
    await I.see('0 items left', '.todo-count');
    await I.seeElement(`//label[@class='ng-binding']`)
    const count = await I.grabCssPropertyFrom(`//label[@class='ng-binding']`, 'text-decoration') //verfies if the item is crossed or not
    await I.say(count)
});

// 3. Delete a to-do (Verify if the item is removed from the list)
Scenario('delete a todo', ({ I }) => {
    I.amOnPage('https://todomvc.com/examples/angularjs/#/')
    I.fillField('What needs to be done?', 'Update my blog');
    I.pressKey('Enter');
    I.moveCursorTo('.todo-list');
    I.click('.todo-list button.destroy');
    I.dontSee('Update my blog');
})

// 4. Filtering a to-do is working (Click on the Active button and verify if it shows the Active
// items. Click on Completed and verify if it shows the completed items)
Scenario('filter a todo', ({ I }) => {
    I.amOnPage('https://todomvc.com/examples/angularjs/#/')
    I.fillField('What needs to be done?', 'Update my blog');
    I.pressKey('Enter');
    I.fillField('What needs to be done?', 'Do the chores')
    I.pressKey('Enter');
    I.click('.todo-list input.toggle');
    I.click('Active');
    I.dontSee('Update my blog')
    I.click('Completed');
    I.dontSee('Do the chores')
})