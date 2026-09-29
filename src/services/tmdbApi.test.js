import { getImageUrl, getBackdropUrl, getPosterPlaceholder, TMDB_IMAGE_BASE_URL } from './tmdbApi';

describe('tmdbApi helper functions', () => {
  test('getImageUrl returns valid image URL with custom size', () => {
    const path = '/test-poster.jpg';
    const url = getImageUrl(path, 'w500');
    expect(url).toBe(`${TMDB_IMAGE_BASE_URL}/w500/test-poster.jpg`);
  });

  test('getImageUrl returns null if path is falsy', () => {
    expect(getImageUrl(null)).toBeNull();
    expect(getImageUrl('')).toBeNull();
  });

  test('getBackdropUrl returns original size URL', () => {
    const path = '/backdrop.jpg';
    const url = getBackdropUrl(path, 'original');
    expect(url).toBe(`${TMDB_IMAGE_BASE_URL}/original/backdrop.jpg`);
  });

  test('getPosterPlaceholder returns SVG data uri containing movie title', () => {
    const placeholder = getPosterPlaceholder('The Dark Knight');
    expect(placeholder).toContain('data:image/svg+xml;utf8');
    expect(placeholder).toContain('The%20Dark%20Knight');
  });

  test('searchMovies returns empty result structure when query is empty or whitespace', async () => {
    const { searchMovies } = await import('./tmdbApi');
    const result = await searchMovies('   ');
    expect(result).toEqual({ results: [], total_pages: 0, total_results: 0, page: 1 });
  });
});
