Feature: test feature for google
As a user
I want to search google for funny cats
So I can get results for funny cats

Scenario: search google
  Given I want to search google
  When I search for "funny cats"
  Then I get 10 results for funny cats
