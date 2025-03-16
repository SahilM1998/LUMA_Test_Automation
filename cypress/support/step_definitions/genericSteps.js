import { Then } from '@badeball/cypress-cucumber-preprocessor';
import '.././commands.js';

let pageContext = {};

class GenericSteps {
  constructor(pageName) {
    this.pageName = pageName;
    pageContext.pageName = pageName;
  }
}

function generateDynamicEmail(email) {
  const [localPart, domain] = email.split('@');
  return `${localPart}_${Date.now()}@${domain}`;
}

Then(/^User enters input field (.*) with (.*)$/, (fieldName, fieldValue) => {
  [fieldName, fieldValue] = [fieldName, fieldValue].map((value) => (value ? value.replace(/^['"]|['"]$/g, '') : value));
  if (fieldName.toLowerCase() === 'email' && fieldValue === 'DYNAMIC') {
    fieldValue = generateDynamicEmail('testuser@example.com');
  }
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
  const messages = expectedMessages.split('-').map((msg) => msg.trim());

  if (fields.length !== messages.length) {
    throw new Error('Mismatch in number of fields and expected messages');
  }

  fields.forEach((field, index) => {
    cy.Error(field, messages[index], pageContext.pageName);
  });
});

Then('All links should return a valid status code', () => {
  cy.get('a').each(($el) => {
    const href = $el.attr('href');

    if (href && href.startsWith('https://magento.softwaretestingboard.com/')) {
      cy.request(href).then((response) => {
        expect(response.status).to.be.oneOf([200, 301, 302]);
      });
    }
  });
});

Then('All links should navigate to the correct URL', () => {
  cy.get('a').then(($links) => {
    const hrefs = [];
    $links.each((index, el) => {
      const href = Cypress.$(el).attr('href');
      if (href && href.startsWith('https://magento.softwaretestingboard.com/')) {
        hrefs.push(href);
      }
    });
    console.log(`Total links to check: ${hrefs}`);

    const normalizeUrl = (url) => (url.endsWith('/') ? url.slice(0, -1) : url);

    cy.wrap(hrefs).each((href) => {
      cy.visit(href);

      cy.location('href').then((currentUrl) => {
        const normalizedCurrent = normalizeUrl(currentUrl);
        const normalizedExpected = normalizeUrl(href);
        expect(normalizedCurrent).to.eq(normalizedExpected);
      });

      cy.go('back');
    });
  });
});

export default GenericSteps;
