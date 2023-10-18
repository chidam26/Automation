Feature('checktodo');

Scenario('check a todo',  ({ I }) => {
    I.amOnPage('https://todomvc.com/examples/angularjs/#/');
    I.fillField('What needs to be done?', 'Go to shop');
    I.pressKey('Enter');
    I.see('Go to shop', '.todo-list');
    I.see('1 item left', '.todo-count');
    I.click('.todo-list input.toggle');
    I.see('0 items left', '.todo-count');
});
