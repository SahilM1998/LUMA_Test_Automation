import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import GenericSteps from './genericSteps.js';
const PAGENAME = 'CreateAccountPage';
const genericSteps = new GenericSteps(PAGENAME);

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