import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "cypress/reports/allure-results",
      });
      return config;
    },
    specPattern: ['cypress/tests/**/*.{js,jsx,ts,tsx}', 'cypress/e2e/**/*.{js,jsx,ts,tsx}'],
    excludeSpecPattern: ['cypress/e2e/1-getting-started/*.js', 'cypress/e2e/2-advanced-examples/*.js'],
  },  
});
