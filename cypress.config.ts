import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: ['cypress/tests/**/*.{js,jsx,ts,tsx}', 'cypress/e2e/**/*.{js,jsx,ts,tsx}'],
    excludeSpecPattern: ['cypress/e2e/1-getting-started/*.js', 'cypress/e2e/2-advanced-examples/*.js'],
  },  
});
