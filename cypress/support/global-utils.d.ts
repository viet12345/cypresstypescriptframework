/// <reference types="cypress" />

declare global {
    function joinPaths(part1: string, part2: string): string;
    function buildUrl(baseUrl: string, relativePath: string): string;
    function normalizePath(path: string): string;
  }
  
  export {};
  