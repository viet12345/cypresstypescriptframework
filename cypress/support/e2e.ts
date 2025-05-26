/// <reference path="./commands.d.ts" />

// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// https://github.com/allure-framework/allure-js/blob/main/packages/allure-cypress/README.md
import "allure-cypress";

// Import path from utils:
import * as pathUtils from './utils/path';

(globalThis as any).joinPaths = pathUtils.joinPaths;
(globalThis as any).buildUrl = pathUtils.buildUrl;
(globalThis as any).normalizePath = pathUtils.normalizePath;

// Import setup.ts file
// import './setup';