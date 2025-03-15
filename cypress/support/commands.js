import pageMapping from './mapping/pageMapping.js';

function getSelectorFromPageMapping(pageName, field) {
  const page = pageMapping[pageName];

  if (!page) {
    return null;
  }

  if (!(field in page)) {
    return null;
  }

  const idSelector = page[field];

  return idSelector;
}

function getErrorSelectorFromPageMapping(pageName, fieldName) {
  let fieldSelector = getSelectorFromPageMapping(pageName, fieldName);
  fieldSelector = fieldName === 'Global Error' ? fieldSelector : fieldSelector + '-error';
  return fieldSelector;
}

export { getErrorSelectorFromPageMapping };

Cypress.Commands.add('InputField', (fieldName, fieldValue, pageName) => {
  const idSelector = getSelectorFromPageMapping(pageName, fieldName);
  if (fieldValue === '') {
    cy.get(idSelector).clear();
  } else {
    cy.get(idSelector).type(fieldValue);
  }
});

Cypress.Commands.add('Button', (button, pageName) => {
  const idSelector = getSelectorFromPageMapping(pageName, button);
  cy.get(idSelector).click();
});

Cypress.Commands.add('Error', (fieldName, expectedMessage, pageName) => {
  const errorSelector = getErrorSelectorFromPageMapping(pageName, fieldName);
  cy.get(errorSelector).should('be.visible').and('contain.text', expectedMessage);
});
