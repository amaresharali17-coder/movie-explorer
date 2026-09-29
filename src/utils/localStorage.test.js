import { getItem, setItem, removeItem, STORAGE_KEYS } from './localStorage';

describe('localStorage utility', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('correctly sets and gets items from localStorage', () => {
    const mockFavorites = [{ id: 101, title: 'Inception' }];
    setItem(STORAGE_KEYS.FAVORITES, mockFavorites);

    const retrieved = getItem(STORAGE_KEYS.FAVORITES);
    expect(retrieved).toEqual(mockFavorites);
  });

  test('returns default value when item does not exist', () => {
    const retrieved = getItem('nonExistentKey', 'defaultValue');
    expect(retrieved).toBe('defaultValue');
  });

  test('removes item from localStorage', () => {
    setItem(STORAGE_KEYS.LAST_SEARCHED, 'Interstellar');
    expect(getItem(STORAGE_KEYS.LAST_SEARCHED)).toBe('Interstellar');

    removeItem(STORAGE_KEYS.LAST_SEARCHED);
    expect(getItem(STORAGE_KEYS.LAST_SEARCHED, null)).toBeNull();
  });
});
