Feature: Search functionality
  As a drug user
  I want to know top adverse effects
  So that I know what to expect

  Scenario: Search known data
    Given I want to search for known data
    When I enter "hero" into the search
    Then I should get results for "hero"
