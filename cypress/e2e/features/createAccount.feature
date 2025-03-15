Feature: As a user i want to creat an account on LUMA snd sign up

Background:
    Given User is on the LUMA Home page

  Scenario: Successful Create account with valid details
    Given User clicks on create account
    Then User enters input field 'First Name' with <First Name>
    Then User enters input field 'Last Name' with <Last Name>
    Then User enters input field 'Email' with <Email>
    Then User enters input field 'Password' with <Password>
    Then User enters input field 'Confirm Password' with <Confirm Password>
    Then User clicks on 'Create an account'
    Then User should be logged in and see the success message

    Examples:
    | First Name | Last Name | Email                | Password      | Confirm Password |
    | sahil0987       | mehta0987       | sahil0987@example.com  | Qwerty@0987 | Qwerty@0987    |