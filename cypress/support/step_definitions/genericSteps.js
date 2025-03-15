import { Then } from '@badeball/cypress-cucumber-preprocessor';
import '.././commands.js';

let pageContext = {};

class GenericSteps {
  constructor(pageName) {
    this.pageName = pageName;
    pageContext.pageName = pageName;
  }
}

Then(/^User enters input field (.*) with (.*)$/, (fieldName, fieldValue) => {
  [fieldName, fieldValue] = [fieldName, fieldValue].map((value) => (value ? value.replace(/^['"]|['"]$/g, '') : value));
  cy.InputField(fieldName, fieldValue, pageContext.pageName);
});

Then(/^User clicks on (.*)'$/, (button) => {
  [button] = [button].map((value) => (value ? value.replace(/^['"]|['"]$/g, '') : value));
  cy.Button(button, pageContext.pageName);
});

Then(/^The error message for (.*) should be (.*)$/, (fieldNames, expectedMessages) => {
  fieldNames = fieldNames ? fieldNames.replace(/^['"]|['"]$/g, '') : '';
  expectedMessages = expectedMessages ? expectedMessages.replace(/^['"]|['"]$/g, '') : '';

  const fields = fieldNames.split(',').map((field) => field.trim());
  const messages = expectedMessages.split(':').map((msg) => msg.trim());

  if (fields.length !== messages.length) {
    throw new Error('Mismatch in number of fields and expected messages');
  }

  fields.forEach((field, index) => {
    cy.Error(field, messages[index], pageContext.pageName);
  });
});

export default GenericSteps;
