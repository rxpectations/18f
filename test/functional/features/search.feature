Feature: Search functionality
  As a drug user
  I want to know top adverse effects
  So that I know what to expect

  Scenario: Search known data
    Given I want to search for known data
    When I enter "test" into the search
    Then I should get 10 results for "test"
