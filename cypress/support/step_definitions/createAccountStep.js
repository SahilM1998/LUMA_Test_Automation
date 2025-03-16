import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import GenericSteps from './genericSteps.js';
const PAGENAME = 'CreateAccountPage';
const genericSteps = new GenericSteps(PAGENAME);
let failingResponses = [];

Given('User is on the LUMA Home page', () => {
  cy.visit('https://magento.softwaretestingboard.com/');
});

Given('User clicks on create account', () => {
  cy.contains('a', 'Create an Account').click();
});

Then('User should be logged in and see the success message', () => {
  cy.url().should('include', '/customer/account/');
  cy.get('.message-success').should('be.visible').and('contain.text', 'Thank you for registering with Main Website Store');
});

Given('User clicks on forgot password', () => {
  cy.contains('a', 'click here').click();
  cy.url().should('include', '/customer/account/forgotpassword/');
});

Then('The search field should be visible with placeholder {string}', (placeholderText) => {
  cy.get('input#search').should('be.visible').and('have.attr', 'placeholder', placeholderText);
});

Then('The store logo should be visible', () => {
  cy.get('a.logo').should('be.visible').find('img').should('be.visible');
});

Then('I should see {string} inside the main container', (expectedText) => {
  cy.get('main#maincontent').should('be.visible').and('contain.text', expectedText);
});

Then('The copyright text should be {string}', (expectedText) => {
  cy.get('small.copyright').should('be.visible').and('contain.text', expectedText);
});

Then('I should see {string} inside the footer', (expectedText) => {
  cy.get('footer.page-footer').should('be.visible').and('contain.text', expectedText);
});

Then('The cart option should be visible', () => {
  cy.get('a.action.showcart').should('be.visible').and('contain.text', 'My Cart');
});

Given('I intercept all network calls to the domain', () => {
  const domain = 'https://magento.softwaretestingboard.com'
  failingResponses = [];
  cy.intercept(domain + '/**', (req) => {
    req.reply((res) => {
      if (res.statusCode >= 400) {
        failingResponses.push({ url: req.url, status: res.statusCode });
        cy.log(`Error: ${req.url} returned ${res.statusCode}`);
      }
    });
  }).as('apiCalls');
});

Then('No network call should return a status code of 400 or 500', () => {
  cy.log(`Failing responses: ${JSON.stringify(failingResponses)}`);
  expect(failingResponses, 'No failing network calls').to.have.length(0);
});
