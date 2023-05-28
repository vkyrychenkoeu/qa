## QA position assessment

# Cypress Tests

This repository contains Cypress tests for Task 2: Cypress Automation.

## Installation

To install the project and run the tests on your local machine, follow these steps:

1. Make sure you have Node.js installed. If not, go to the official Node.js website: [https://nodejs.org](https://nodejs.org) and download the appropriate installer for your operating system. Follow the installation instructions.

2. Clone this repository to your local machine using one of the following methods:

   - **Method 1: Command Line**
   
     Open a terminal or command prompt and run the following command to clone the repository:
   
     ```
     git clone https://github.com/vkyrychenkoeu/qa.git
     ```
   
   - **Method 2: GitHub Desktop**
   
     If you prefer using a graphical interface, you can use GitHub Desktop to clone the repository. Visit the following link to download GitHub Desktop: [https://desktop.github.com](https://desktop.github.com). Once installed, open GitHub Desktop, click "File" in the menu, select "Clone Repository," and choose this repository from the list.

3. Navigate to the cloned repository:

cd qa

4. Install the project dependencies:

npm install

## Running Tests

To run the tests on your local machine, follow these steps:

1. Make sure you are in the project root directory (`qa`).

2. Open the Cypress Test Runner by running the following command:

npx cypress open

This will launch the Cypress Test Runner.

3. In the Cypress Test Runner, click on a test file located in the `cypress/integration` directory to run the tests in that file.

Alternatively, you can click the "Run all specs" button to run all the tests.

4. If you prefer running the tests in headless mode without the Cypress Test Runner, you can use the following command:

npx cypress run --browser chrome

This will execute the tests in the Chrome browser in headless mode, and you'll see the test results in the terminal or command prompt.

