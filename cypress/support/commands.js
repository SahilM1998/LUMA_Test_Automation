// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import pageMapping  from './mapping/pageMapping.js';

function getSelectorFromPageMapping(pageName, field) {
    console.log("🔹 Page Name:", pageName);
    console.log("🔹 Field Name:", field);
    console.log("🔹 Full Page Mapping:", pageMapping);

    const page = pageMapping[pageName];
    
    if (!page) {
        console.error(`❌ Page mapping not found for: ${pageName}`);
        return null;
    }

    console.log("✅ Page Object Found:", page);

    if (!(field in page)) {
        console.error(`❌ Selector not found for field: "${field}" in page: ${pageName}`);
        console.log("✅ Available fields:", Object.keys(page));  // Show available fields
        return null;
    }

    const idSelector = page[field];

    console.log("✅ Returning Selector:", idSelector);
    return idSelector;
}




Cypress.Commands.add('InputField', (fieldName, fieldValue, pageName)=>{
    const idSelector = getSelectorFromPageMapping(pageName,fieldName);
    console.log(idSelector);
    cy.get(idSelector).type(fieldValue);
});

Cypress.Commands.add('Button', (button, pageName)=>{
    const idSelector = getSelectorFromPageMapping(pageName,button);
    cy.get(idSelector).click();
});