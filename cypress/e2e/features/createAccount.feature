Feature: As a user i want to create an account on LUMA snd sign up

  Background:
    Given User is on the LUMA Home page
    Given User clicks on create account

  Scenario: Successful Create account with valid details
    Then User enters input field 'First Name' with <First Name>
    And User enters input field 'Last Name' with <Last Name>
    And User enters input field 'Email' with <Email>
    And User enters input field 'Password' with <Password>
    And User enters input field 'Confirm Password' with <Confirm Password>
    Then User clicks on 'Create an account'
    Then User should be logged in and see the success message

    Examples:
      | First Name | Last Name  | Email   | Password     | Confirm Password |
      | sahil0987  | mehta0987  | DYNAMIC | Qwerty@0987  | Qwerty@0987      |
      | sahil09872 | mehta09822 | DYNAMIC | Qwerty@09872 | Qwerty@09872     |

  Scenario Outline: Attempt to create an account with invalid data
    Then User enters input field 'First Name' with <First Name>
    And User enters input field 'Last Name' with <Last Name>
    And User enters input field 'Email' with <Email>
    And User enters input field 'Password' with <Password>
    And User enters input field 'Confirm Password' with <Confirm Password>
    Then User clicks on 'Create an account'
    Then The error message for <Field to Check> should be <Expected Error Message>

    Examples:
      | First Name | Last Name | Email                | Password         | Confirm Password | Field to Check            | Expected Error Message                                                                                                                                       |
      | sahil      | mehta     | valid@example.com    |              123 |              123 | Password                  | Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.                                           |
      | sahil      | mehta     | valid@example.com    |       1234567891 |       1234567891 | Password                  | Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.                      |
      | sahil      | mehta     | valid@example.com    | sahilmehta12345  | sahilmehta12345  | Password                  | Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.                      |
      | sahil      | mehta     | valid@example.com    | sahilMehta@12345 |              123 | Confirm Password          | Please enter the same value again.                                                                                                                           |
      |            | mehta     | valid@example.com    | Valid@123        | Valid@123        | First Name                | This is a required field.                                                                                                                                    |
      | sahil      |           | valid@example.com    | Valid@123        | Valid@123        | Last Name                 | This is a required field.                                                                                                                                    |
      | sahil      | mehta     |                      | Valid@123        | Valid@123        | Email                     | This is a required field.                                                                                                                                    |
      | sahil      | mehta     | valid@example.com    |                  | Valid@123        | Password,Confirm Password | This is a required field.-Please enter the same value again.                                                                                                 |
      | sahil      | mehta     | valid@example.com    | Valid@123        |                  | Confirm Password          | This is a required field.                                                                                                                                    |
      | sahil      | mehta     | invalidEmail         | Valid@123        | Valid@123        | Email                     | Please enter a valid email address (Ex: johndoe@domain.com).                                                                                                 |
      | sahil      | mehta     | @gmail.com           | Valid@123        | Valid@123        | Email                     | Please enter a valid email address (Ex: johndoe@domain.com).                                                                                                 |
      | John       | Doe       | valid@example.com    | Valid@123        | Different123     | Confirm Password          | Please enter the same value again.                                                                                                                           |
      | John       | Doe       | toofankhan@gmail.com | Valid@123        | Valid@123        | Global Error              | There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account. |

  Scenario Outline: Forgot password on account already exists
    Then User enters input field 'First Name' with <First Name>
    And User enters input field 'Last Name' with <Last Name>
    And User enters input field 'Email' with <Email>
    And User enters input field 'Password' with <Password>
    And User enters input field 'Confirm Password' with <Confirm Password>
    Then User clicks on 'Create an account'
    Then The error message for <Field to Check> should be <Expected Error Message>
    Then User clicks on forgot password

    Examples:
      | First Name | Last Name | Email                | Password  | Confirm Password | Field to Check | Expected Error Message                                                                                                                                       |
      | John       | Doe       | toofankhan@gmail.com | Valid@123 | Valid@123        | Global Error   | There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account. |

  Scenario: Validate all links are working and navigate correctly
    Then All links should return a valid status code
    Then All links should navigate to the correct URL

    Examples:
      |  |
      |  |

  Scenario: Verify Fields and Texts are Visible
    Then The search field should be visible with placeholder "Search entire store here..."
    And The store logo should be visible
    And I should see 'Create New Customer Account' inside the main container
    And I should see 'Personal Information' inside the main container
    And I should see 'First Name' inside the main container
    And I should see 'Last Name' inside the main container
    And I should see 'Sign-in Information' inside the main container
    And I should see 'Email' inside the main container
    And I should see 'Password' inside the main container
    And I should see 'Confirm Password' inside the main container
    And I should see 'Notes' inside the footer
    And I should see 'Practice API Testing using Magento 2' inside the footer
    And I should see 'Write for us' inside the footer
    And I should see 'Subscribe' inside the footer
    And I should see 'Search Terms' inside the footer
    And I should see 'Privacy and Cookie Policy' inside the footer
    And I should see 'Advanced Search' inside the footer
    And I should see 'Orders and Returns' inside the footer
    And The cart option should be visible
    And The copyright text should be "We know you have an assignment to complete. If this site is not functioning as expected, drop us an email. Copyright © 2013-present Magento, Inc. All rights reserved."

    Examples:
      |  |
      |  |
