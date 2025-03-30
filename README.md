# 🚀 Project Overview ✨

This project is an automated testing framework built using **Playwright** and **TypeScript**. It is designed to perform end-to-end testing across multiple browsers, including **Chrome**, **Firefox**, and **WebKit** (simulating Safari). The framework is structured following the **Page Object Model (POM)**, which enhances the maintainability and scalability of test cases.

Key features of the project include:

- **Multi-Browser Testing:** Ensures cross-browser compatibility by running tests on various browsers.
- **Responsive Design Testing:** Supports execution on different screen resolutions, including mobile devices.
- **Parameterized Test Flows:** Accommodates different scenarios such as **Happy Path** and **Alternate Flow**.
- **Robust Reporting and Logging:** Generates detailed reports and logs for effective debugging and continuous improvement.
- **Dynamic Content Management:** Implements strategies for handling delayed content rendering and **shadow DOM** elements using techniques like the **`evaluate`** method.

This project leverages modern web technologies and best practices in test automation to ensure high quality and reliability of web applications.

## Table of Contents

- [🚀 Project Overview ✨](#-project-overview-)
- [Getting Started With The Project](#getting-started-with-the-project)
- [Available Scripts](#available-scripts)
- [Available Parameters](#available-parameters)
- [The project directory structure](#the-project-directory-structure)
- [Test Plan](#test-plan)
  - [Scope](#scope)
  - [Test Cases](#test-cases)
    - [Preconditions](#preconditions)
    - [Test Steps (Happy Path)](#test-steps-happy-path)
    - [Postconditions](#postconditions)
    - [Technical Aspects](#technical-aspects)
  - [Challenges and Learnings](#challenges-and-learnings)
    - [Bot Detection](#bot-detection)
    - [Rendering of Posts in the Subreddit](#rendering-of-posts-in-the-subreddit)
    - [Shadowroots Management](#shadowroots-management)
  - [Next Steps and Improvements](#next-steps-and-improvements)


## Getting Started With The Project

This section outlines the initial setup process to clone, configure, and run the project. Follow the steps below to get started quickly:

1. **Clone the Project**
   ```bash
   git clone https://github.com/athan3350/playwright-typescript.git
   ```

2. **Enter the Project Folder**
   ```bash
   cd playwright-typescript
   ```

3. **Install the Dependencies**
   ```bash
   npm install
   ```

4. **Run the Tests**
   Refer to the [Available Scripts](#available-scripts) section for more details.

## Available Scripts

These scripts allow you to run different configurations of tests using Playwright. Depending on your needs, you can choose the browser and mode (headless or headed), run tests in parallel, or generate a detailed report.

| Command                           | Description                                                                                       |
|-----------------------------------|---------------------------------------------------------------------------------------------------|
| `npm run test:chrome:headed`      | Runs tests in Chrome in headed mode.                                                              |
| `npm run test:chrome:debug`       | Runs tests in Chrome in debug mode (headed with debug enabled).                                  |
| `npm run test:chrome:headless`    | Runs tests in Chrome in headless mode.                                                            |
| `npm run test:firefox:headed`     | Runs tests in Firefox in headed mode.                                                            |
| `npm run test:firefox:headless`   | Runs tests in Firefox in headless mode.                                                          |
| `npm run test:webkit:headed`      | Runs tests in WebKit in headed mode.                                                             |
| `npm run test:webkit:headless`    | Runs tests in WebKit in headless mode.                                                           |
| `npm run test:parallel:headed`    | Runs tests in headed mode with 75% of available workers.                                         |
| `npm run test:parallel:headless`  | Runs tests in headless mode with 75% of available workers.                                       |
| `npm run report`                  | Opens the Playwright test report.                                                                |

## Available Parameters

These parameters allow you to control the test data used during test execution. You can choose `HAPPY_PATH` for a successful scenario, where a specific word is expected to be found in Reddit posts, or `NOT_FOUND` for an alternate flow when the word does not exist in the post listing.

| Parameter   | Description                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------|
| `HAPPY_PATH`| Test data for the successful scenario (e.g., search for a specific word in the Reddit posts).         |
| `NOT_FOUND` | Test data for the alternate flow when the specific word does not exist in the list of posts.         |

## **The project directory structure**

The project is built using **TypeScript** and follows the standard directory structure with a clear separation of concerns:

```Gherkin
/ (Project Root)
+ node_modules/             | Automatically generated when dependencies are installed.
+ playwright-report/        | Automatically generated when tests are run; contains test reports.
+ test-results/             | Automatically generated when tests are executed; contains test result files.
+ test/                     | Contains all test-related files and folders.
  + fixtures/               | Data files used for test cases.
  + pages/                  | Page Object Model (POM) files; each file represents a specific view or component.
  + support/                | Hooks and additional support files used during test execution.
  + utils/                  | Utility files with reusable functions and helpers.
  + login.spec.ts           | Main test file containing test cases for login functionality.
+ .env                      | Environment configuration file (e.g., credentials for logging into reddit.com).
+ package.json              | Project configuration file with scripts, dependencies, and metadata.
+ playwright.config.ts      | Configuration file for Playwright; sets up test options, browser configurations, etc.
+ tsconfig.json             | TypeScript compiler configuration file.
+ .gitignore                | Specifies files and directories to ignore in version control.
```
This structure helps separate concerns, enabling easier maintenance, scalability, and clearer organization of test artifacts and configuration settings.

## Test Plan

This section outlines the test plan for the project, detailing the scope, objectives, and best practices that ensure comprehensive testing coverage. The test plan includes testing across multiple browsers and different test flows.

### Scope

- **Multi-Browser Testing:**  
  Tests are executed on multiple browsers to ensure cross-browser compatibility:
  - **Chrome**
  - **Firefox**
  - **WebKit** (simulates Safari)

- **Test Flows:**  
  - **Happy Path:** Validates the expected behavior when valid test data is provided.
  - **Alternate Flow:** Checks system response when an error scenario occurs (e.g., when searching for a non-existent word in Reddit posts).

### Test Cases

This subsection outlines the detailed test cases following best practices.

#### Preconditions
- A user must be registered on the reddit.com platform.

#### Test Steps (Happy Path)
1. Open the browser.
2. Enter the username and password.
3. Search for the subreddit **r/Aww**.
4. Upvote posts that contain the specified keyword.
5. Validate that upvotes were correctly applied to posts matching the keyword.

#### Postconditions
- Remove the upvote to clean up the data in the system.

#### Technical Aspects
- **Execution History:**  
  Create a separate folder for each test execution to maintain historical records.
- **Screenshots:**  
  Save a screenshot of the posts that received an upvote.
- **Console Logging:**  
  Print all posts found in the subreddit to the console.
- **File Logging:**  
  Save the list of posts that received an upvote in a `.log` file within the created folder.

> **Note for Alternate Flow:**  
> The behavior of the alternate flow is the same as the happy path, except that no screenshots should be taken nor should any data be saved in the `.log` file. Additionally, verify that no upvote has been applied to any post.

### Challenges and Learnings

#### Bot Detection

Reddit uses a security filter to detect if a bot is running, which creates challenges in automating authentication and interactions.

- **Bot Detection by reddit.com:** ❌  
  When attempting login using username and password, the platform detected automation and flagged the credentials as invalid.

- **Background Authentication via Local Storage and Cookies:** ❌  
  An attempt was made to leverage background authentication using local storage and cookies, relying on Google auto-login when an existing session is detected. However, this approach failed because the platform identified that the authentication was manually set.

- **Using a Chrome Profile via Terminal with Google Cache:** ❌  
  An approach was attempted to use a Chrome profile via the terminal, utilizing Google's cache on the machine. This did not work because the platform recognized that the authentication was pre-set.

- **Debug Mode Execution:** ✅  
  Running the browser in debug mode enabled the automation flows to execute without being detected and blocked as a bot.

#### Rendering of Posts in the Subreddit

Reddit, to improve performance, **initially preloads only 3 posts and later loads an additional 25 posts after a delay**. This makes it challenging to access more than these 3 posts. The strategy used was to force scrolling to trigger the rendering of all posts.

Additionally, test performance is impacted when locating elements for these 28 posts, so the range of posts to search is parameterized. The default is set to 10 posts, but it can be increased as needed.

#### Shadowroots Management

**Shadowroots** refer to the encapsulated DOM subtrees created using **Shadow DOM**, which isolates a component's internal structure from the main document. In **Playwright with TypeScript**, handling elements within shadow DOMs can be challenging due to this encapsulation. The solution often involves using the **`evaluate`** method to access and manipulate elements inside the **shadowroot**.


### Next Steps and Improvements

This section outlines the next steps and planned enhancements to expand test coverage and optimize the execution framework.

- **Mobile Device Execution:**  
  Expand the scope to include testing on mobile devices by simulating various resolutions and configurations. This ensures that the application displays and functions correctly on different screen sizes and mobile platforms.

- **Additional E2E Flows:**  
  Incorporate more end-to-end (E2E) test flows to increase coverage, addressing additional use cases and user scenarios.

---
> Authors:  
> **Sebastian Suarez**
> That's it, I hope you like it  🐶🤘