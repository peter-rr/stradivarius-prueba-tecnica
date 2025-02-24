# stradivarius-prueba-tecnica

## Test Cases Challenge

See the answers to the questions [here](/docs/challenge-casos-de-prueba.md).

## UI Automation Framework

This project is a high-level design for a test automation framework built with [Cypress](https://www.cypress.io/) and JavaScript, created to provide a robust, modular, and scalable testing solution.

The framework has been developed as part of a technical assessment to test the functionalities within the "Chat" tab of the [EdgeTier demo environment](http://demo.edgetier.com/), and demonstrate my envision of the framework's structure focusing on simplify automated testing processes with reusable components, straightforward configuration, and easy maintenance.

## Why this solution?

In order to implement this solution, I have chosen Cypress framework and also making use of the Page Object design pattern. Here are the key reasons to take those decisions:

### Cypress framework

- **Faster scripting (less code):** Hides all all unnecessary noise and stuff that coder does not need to see. So you need to write a less number of lines of code to automate certain scenario, and as a result you'll have a faster scripting of your scenarios and easier maintenance of them.
- **Intuitive Assertions and Chainable Commands:** Simple syntax for assertions and supports chaining commands, which can make tests more readable and reduce boilerplate code.
- **Better "auto-wait" mechanism:** Cypress automatically waits for elements to appear in the DOM, for animations to complete, and for AJAX requests to finish, making tests less prone to timing. This auto-waiting helps reduce the need for explicit waits and retries, making tests generally more stable.
- **Ease of setup and use:** Known for its quick setup, it automatically installs a browser (Chromium) and doesn’t require extensive configuration, making it easier for new users to get started.
- **Better test runner:** Cypress includes a graphical test runner that provides real-time feedback, showing tests, assertions, and a time-travel feature that lets you go back to previous steps in the test. This interactive GUI can make it easier to understand test flow and debug issues.

### Page Object design pattern

- **More readable tests:** There is a clean separation between the test code and page-specific code, making the end-to-end scenarios easier to understand.
- **Reusability:** Tests are parametrized so you can use different test data in the future and won’t need to write a new method from scratch. Also you can reuse this methods for new end-to-end workflows, avoiding code duplication.
- **Ease of maintenance:** The tests use the methods of any page object class whenever they need to interact with the UI of that page. The benefit is that if the UI changes for the page, the tests themselves don’t need to change, only the code within the page object needs to change. Therefore, all changes to support that new UI are located just in one place.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)
- [Next Iterations](#next-iterations)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Reusable Test Components**: Designed for modularity and reusability across multiple test cases.
- **Custom Commands:** Simplifies common actions and enhances readability.
- **Environment Configuration:** Easily switch environments by configuring settings.
- **Cross-Browser Testing**: Supports multiple browsers for comprehensive testing.
- **CI/CD Ready:** [[For Next Iterations]](#next-iterations) Designed to integrate with CI tools like Jenkins, GitHub Actions, etc.
- **Parallel Execution:** Supports parallel test execution to speed up testing.
- **Detailed Reports:** [[For Next Iterations]](#next-iterations) Generates comprehensive test reports for tracking and analytics.

## Prerequisites

To use this project, ensure you have the following installed:

- **Node.js** (v18.x or above)
- **npm** (v10.x or above)  
- **Cypress** (v13.x or above)

## Installation

To set up this framework locally, clone the repository and install dependencies:

```bash
git clone https://github.com/peter-rr/edgetier-test-automation-framework.git
cd edgetier-test-automation-framework
npm install
```

## Project structure

```bash
|-- cypress/
    |-- e2e/              # Test files organized by feature
    |-- fixtures/         # Test data for reusable cases (JSON format)
    |-- plugins/          # Custom Cypress plugins
    |-- support/
        |-- page_objects/ # Contains class files for every page object
        |-- commands.js   # Custom commands for complex actions
        |-- e2e.js        # Support file configuration
|-- cypress.config.js     # Cypress configuration file
|-- package.json          # Project dependencies and scripts
|-- README.md             # Project documentation
```

## Configuration

### Cypress Configuration

The configuration is handled via `cypress.config.js`. Here are the key configurations:

- **baseUrl:** The base URL of the application under test.
- **env:** Custom environment variables.
- **viewportWidth / viewportHeight:** Default browser window size for responsive testing.

```js
module.exports = {
  baseUrl: "https://demo.edgetier.com/main/",
  env: {
    apiUrl: "https://api.demo.edgetier.com"
  },
  viewportHeight: 1080,
  viewportWidth: 1920
};
```

### Environment Configurations

The project supports multiple environments. Set up environment-specific variables in `cypress.config.js` or via `.env` files for custom configurations.

Example:

```js
{
  "env": {
    "baseUrl": "https://your-staging-url.com",
    "apiEndpoint": "/api/v1/"
  }
}
```

## Usage

The package exposes two different test files located in `cypress/e2e/` folder:

- `testsForNavigationPage.js`: contains scenarios to verify the navigation across the different pages of the application. See code: [cypress/e2e/testsForNavigationPage.js](cypress/e2e/testsForNavigationPage.js)

- `testsForChatPage.js`: contains the scenarios to test the functionalities I've considered as most important on the Chat page. More scenarios may be added to give full test coverage. See code: [cypress/e2e/testsForChatPage.js](cypress/e2e/testsForChatPage.js)

If you want to go deeper into the interactions with web elements and the methods belonging to any page object, you'll find all the code related under `cypress/support/page_objects/` folder, where all the different page objects are located. See the code for the page object file implemented for the Chat page: [cypress/support/page_objects/chatPage.js](cypress/support/page_objects/chatPage.js)

## Running tests

### Running All Tests

To execute all tests in the project:

```bash
npx cypress run
```

To run the tests in a specific browser (e.g., Chrome):

```bash
npx cypress run --browser chrome
```

By default, we will launch the browser selected in headless mode during `cypress run`. To run Chrome headed, you can pass the `--headed` argument to `cypress run`.

### Running Tests in Interactive Mode

Launch Cypress in interactive mode for local testing and debugging:

```bash
npx cypress open
```

### Running Tests by Tag (Optional)

To run tests based on specific tags or conditions, modify the command in `package.json` or use tags in test files for filtering. For instance:

```bash
describe("Smoke Test", { tags: "@smoke" }, () => {
  it("should load the homepage", () => {
    // Test code here
  });
});
```

Then run tagged tests with:

```bash
npx cypress run --env grepTags="@smoke"
```

## Best practices

### Unnecessary Waiting

Do not wait for arbitrary time periods using `cy.wait(Number)`. On the example below, adding the wait only adds 5 seconds after the `cy.request()` has already resolved:

```js
cy.request('http://localhost:8080/db/seed')
cy.wait(5000) // <--- this is unnecessary
```

To avoid that anti-pattern is recommended to use route aliases or assertions to guard Cypress from proceeding until an explicit condition is met:

```js
cy.intercept('GET', '/users', [{ name: 'Maggy' }, { name: 'Joan' }]).as(
  'getUsers'
)
cy.get('[data-testid="fetch-users"]').click()
cy.wait('@getUsers') // <--- wait explicitly for this route to finish
cy.get('table tr').should('have.length', 2)
```

### Timeouts

In Cypress assertions are automatically retried. This retry mechanism will work by default up to 4 secs. You can override this timeout setting in Cypress config - the `defaultCommandTimeout` setting.

For example, to set the default command timeout to 10 seconds via the command line:

```bash
cypress run --config defaultCommandTimeout=10000
```

It's not very recommended to change the command timeout globally. Instead, pass the individual command's `{ timeout: ms }` option to retry for a different period of time. For example:

```js
cy.get('[data-testid="mobile-nav"]', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home')
```

See [Cypress Documentation](https://docs.cypress.io/app/get-started/why-cypress) for further details.

## Next Iterations

Areas to take into consideration as improvements for potential next iterations of the framework:

- **Test coverage:** Adding more test cases or scenarios.

- **Integration with CI/CD pipelines:** Implementing the logic to integrate the framework with CI tools like Jenkins or GitHub Actions.

- **Reporting and analytics:** Describing how to generate and access reports to provide insight into test outcomes.

- **Dockerization:** To provide a clear and reproducible environment, reducing setup time, easing collaboration, and improving consistency across the development lifecycle.

## Contributing

If you'd like to contribute, please fork the repository, create a feature branch, and submit a pull request. For significant changes, please open an issue first to discuss your ideas.

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

