Feature: Search functionality
  As a user
  I want to search the 18F app
  So I can get information about existing drugs

  Scenario: Search known data
    Given I want to search for known data
    When I enter "test" into the search
    Then I get 10 results for "test"
