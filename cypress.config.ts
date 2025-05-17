import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  projectId: 'h848ba',
  
  e2e: {
    screenshotsFolder: "cypress/reports/screenshots",
    videosFolder: "cypress/reports/videos",
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "cypress/reports/allure-results",
      });
      return config;
    },
    specPattern: ['cypress/tests/**/*.{js,jsx,ts,tsx}', 'cypress/e2e/**/*.{js,jsx,ts,tsx}'],
    baseUrl: 'http://localhost:3000/',
    env: {
      apiUrl: 'http://localhost:3001/'
    }
  },  
});
