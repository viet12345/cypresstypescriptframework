/**
 * Safely joins two parts of a path or URL.
 * Ensures no double slashes and consistent formatting.
 *
 * @param part1 - The first part of the path (e.g., 'something/')
 * @param part2 - The second part of the path (e.g., '/suffix')
 * @returns Joined path (e.g., 'something/suffix')
 */
export function joinPaths(part1: string, part2: string): string {
    return `${part1.replace(/\/$/, '')}/${part2.replace(/^\//, '')}`;
  }
  
  /**
   * Normalize a path to remove redundant slashes at start or end.
   *
   * @param path - The path to normalize
   * @returns Normalized path
   */
  export function normalizePath(path: string): string {
    return path.replace(/\/\/+/g, '/').replace(/^\/|\/$/g, '');
  }
  
  /**
   * Build a full URL by joining baseUrl and relative path safely.
   *
   * @param baseUrl - The base URL (e.g., 'https://example.com/')
   * @param relativePath - The relative path (e.g., '/dashboard')
   * @returns Full URL (e.g., 'https://example.com/dashboard')
   */
  export function buildUrl(baseUrl: string, relativePath: string): string {
    return joinPaths(baseUrl, relativePath);
  }
  