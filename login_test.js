const { I } = inject();
Feature('login');

Scenario('test something', async ({ I }) => {
  I.amOnPage('https://demoqa.com/text-box');
  I.seeElement("//label[@id='userName-label']");
  I.fillField("//input[@placeholder='Full Name']", 'Chidambaram Natarajan');
  I.seeElement('#userEmail-label')
  I.fillField('#userEmail', 'xyz@gmail.com');
  I.seeElement('#currentAddress-label')
  I.fillField('Current Address', 'Trichy');
  I.seeElement('#permanentAddress-label');
  I.fillField('#permanentAddress', 'Trichy');
  I.click('Submit');
  I.see('Chidambaram Natarajan', '#name');
  I.see('xyz@gmail.com', '#email'); 
  I.see('Trichy', '#currentAddress');
  I.see('Trichy', '#permanentAddress');
});

