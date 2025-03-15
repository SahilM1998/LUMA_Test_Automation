import { Then } from '@badeball/cypress-cucumber-preprocessor';
import '.././commands.js'; 

let pageContext = {};

class GenericSteps{
    constructor(pageName){
        this.pageName = pageName;
        pageContext.pageName = pageName;
    }

}

Then(/^User enters input field (.*) with (.*)$/, (fieldName, fieldValue) => {
    console.log('before - ' + fieldName + ' - ' + fieldValue);
    [fieldName, fieldValue] = [fieldName, fieldValue].map(value => value ? value.replace(/^['"]|['"]$/g,''): value);
    console.log('after - ' + fieldName + ' - ' + fieldValue);
    cy.InputField(fieldName, fieldValue, pageContext.pageName);
});

Then(/^User clicks on (.*)'$/, (button) => {
    [button] = [button].map(value => value ? value.replace(/^['"]|['"]$/g,''): value);
    cy.Button(button,pageContext.pageName);
  });

export default GenericSteps;
