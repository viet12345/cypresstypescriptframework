import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import fs from 'fs';

export default defineConfig({
  projectId: 'h848ba',
  
  e2e: {
    screenshotsFolder: "cypress/reports/screenshots",
    videosFolder: "cypress/reports/videos",
    setupNodeEvents(on, config) {
      //Setup the saved Allure reporter folder.
      allureCypress(on, config, {
        resultsDir: "cypress/reports/allure-results",
      });

      //Biến môi trường không public ra ngoài
      //SaleCRM
      config.env.fileList = fs.readdirSync('cypress/fixtures/DataTestingFiles');

      //GQT
      config.env.username = 'GQTProject';
      config.env.password = 'QAT2024_lh0sXpVyy0yq';

      
      return config;
    },
    specPattern: ['cypress/tests/**/*.{js,jsx,ts,tsx}', 'cypress/e2e/**/*.{js,jsx,ts,tsx}'],
    baseUrl: 'https://sales-crm-dev.adamo.tech/',
    env: {
      apiUrl: 'http://localhost:3001/'
    },
    viewportWidth: 1440, // Đặt chiều rộng mặc định
    viewportHeight: 1080,  // Đặt chiều cao mặc định
    defaultCommandTimeout: 20000
  },  
});
