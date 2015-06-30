Feature: Search functionality
  As a drug user
  I want to know top adverse effects
  So that I know what to expect

  Scenario: Search for drugs
    Given I want to search for known data
    When I enter "hero" into the search
    Then I should get results for "hero"

  Scenario: Get information for drug
    Given I want to search for known data
    When I enter "hero" into the search
    Then I should get results for "hero"
    And I click on "Hero"
    Then I should get the results page for "Hero"
