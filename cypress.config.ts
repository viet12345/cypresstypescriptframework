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

      //Add the custom task to get file names in a folder.
      on('task', {
        listFiles(folderPath) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
              if (err) {
                return reject(err);
              }
              // Trả về danh sách file (chỉ tên file, không có đường dẫn đầy đủ)
              resolve(files);
            });
          });
        }
      });
      
      return config;
    },
    specPattern: ['cypress/tests/**/*.{js,jsx,ts,tsx}', 'cypress/e2e/**/*.{js,jsx,ts,tsx}'],
    baseUrl: 'https://sales-crm-dev.adamo.tech/',
    env: {
      apiUrl: 'http://localhost:3001/'
    },
    viewportWidth: 1440, // Đặt chiều rộng mặc định
    viewportHeight: 1080  // Đặt chiều cao mặc định

  },  
});
